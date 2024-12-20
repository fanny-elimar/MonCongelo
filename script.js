const noResultDiv = document.getElementById('no-result');
congelo_display = document.getElementById('display-congelo');
login_form = document.getElementById('login-form');
categoryButtonsDiv = document.getElementById('category-buttons');
const editForm=document.getElementById('edit-form');
const editName=document.getElementById('edit-nom');
token = "";
const logoutButton = document.querySelector('.logout-button');
const loadMoreButton = document.getElementById('load-more-button');
const tbody = document.getElementById('data-table').querySelector('tbody');
const message_modif = document.getElementById('message_modif')

currentOffset = 0;  // Offset initial (commence à 0)
const limit = 20;  // Nombre de produits par page
const noLimit = 500;
const noOffset = 0;

const url = 'https://whispering-ravine-73923-3f19d70e5dc9.herokuapp.com/api/product';

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const loginUrl = 'https://whispering-ravine-73923-3f19d70e5dc9.herokuapp.com/api/login';
    const credentials = {
    username: username, // Remplace par ton nom d'utilisateur
    password: password // Remplace par ton mot de passe
};
    fetch(loginUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur de connexion : ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        token = data.apiToken; // Assure-toi que le token est bien dans la réponse
        // Ensuite, fais ta requête avec le token
        congelo_display.classList.remove('d-none');
        logoutButton.classList.remove('d-none');
        login_form.classList.add('d-none');
        showAll();
        loadCategories();
        //loadCategoriesButtons();
    })}

    function register() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const passwordVerify = document.getElementById('passwordVerify').value;
        const registerUrl = 'https://whispering-ravine-73923-3f19d70e5dc9.herokuapp.com/api/registration';
        const credentials = {
        username: username,
        password: password,
        passwordVerify: passwordVerify
    };
        fetch(registerUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de la création du compte : ' + response.statusText);
            }
            return response.json();
        })
        .then((data) => {
            window.location.replace('index.html')
        })}

function logout() {
    // Rediriger l'utilisateur vers la page de connexion
   // window.location.href = '/MonCongelo/index.php';  // Ou /home, selon ton besoin
   //window.location.replace('/moncongelo/index.html');
   congelo_display.classList.add('d-none');
   login_form.classList.remove('d-none');
   document.getElementById('username').value="";
   document.getElementById('password').value="";
   token = "";
 initDatas();
 initMessage();
}

function showAll() {
    //initMessage();
    //loadCategories();
    //const url = 'https://whispering-ravine-73923-3f19d70e5dc9.herokuapp.com/api/product';
    const init = { 
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            'X-AUTH-TOKEN': token
        },
    }
    fetch(url+'?limit='+limit+'&offset='+currentOffset, init)
    .then(response => {
        // Vérifier si la réponse est un succès (statut 200) ou si c'est une erreur 404
        if (!response.ok) {
            if (response.status === 404) {
                // Si c'est une erreur 404, cela signifie qu'aucun produit n'a été trouvé
                document.getElementById('no-products-message').style.display = 'block';
                return; // Sortir de la fonction sans traiter les produits
            } else {
                // Pour toute autre erreur (par exemple 500 ou autres)
                throw new Error(`Erreur HTTP: ${response.status}`);
            }
        }
        return response.json(); // Parse the response body as JSON
    })
    .then(data => {
        if (!data || !data.products || data.products.length === 0) {
            // Si les produits sont vides ou inexistants
            document.getElementById('no-products-message').style.display = 'block';
            document.getElementById('button-tout-voir').style.display = 'none';
            document.getElementById('data-table').style.display = 'none';
            document.getElementById('load-more-button').style.display = 'none'
            return; // Sortir de la fonction si aucune donnée à afficher
        }
        console.log(data)
        document.getElementById('no-products-message').style.display = 'none'; 
        document.getElementById('button-tout-voir').removeAttribute('style');
        document.getElementById('data-table').removeAttribute('style');
        document.getElementById('load-more-button').removeAttribute('style');
        data.products.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>${item.category}</td>
                <td>
                    <button onclick="editItem(${item.id}, '${item.name}','${item.quantity}','${item.category}'),editForm.scrollIntoView({ behavior: 'smooth', block: 'center' }),editName.focus()" class="btn btn-primary btn-sm mb-1">📝</button>
                    <button onclick="deleteItem(${item.id})" class="btn btn-primary btn-sm mb-1">❌</button>
                    </td>
            `;
            tbody.appendChild(row);
    
        });
        // Mettre à jour l'offset pour la prochaine requête
        currentOffset += limit;
        console.log(currentOffset);

        // Désactiver le bouton si on a chargé tous les produits
        if (currentOffset >= data.total_count) {
            loadMoreButton.disabled = true;
            loadMoreButton.classList.add('alert', 'alert-danger')
            loadMoreButton.innerText = 'Aucun autre produit';
        }
    
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
        //alert('Une erreur est survenue lors de la récupération des données.');
    });
}

// Gérer le clic sur le bouton "Charger plus"
document.getElementById('load-more-button').addEventListener('click', () => {
    showAll();
  });

function addItem() {
    const addName = document.getElementById('add-nom').value;
    const addQuantity = document.getElementById('add-quantity').value;
    const selectCategoryAdd = document.getElementById('add-category').value;
    const selectCategoryNewAdd = document.getElementById('add-category-new').value;
    if (selectCategoryNewAdd) {
        addCategory = selectCategoryNewAdd;
    } else {
        addCategory = selectCategoryAdd;
    }
    fetch(url, { 
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            'X-AUTH-TOKEN': token
        },
        body: JSON.stringify({ name: addName, quantity: addQuantity, category: addCategory}),
    })
    .then(response => {
        if (!response.ok) throw new Error('Erreur lors de l\'ajout');
        refreshDatas();
        createMessage(`Le produit <span style="font-weight: bold;">${addName} </span> a bien été ajouté :
        <br>Quantité : ${addQuantity}
        <br>Catégorie : ${addCategory} `)
        document.getElementById('add-nom').value = ''; // Réinitialise le champ
        document.getElementById('add-quantity').value = ''; // Réinitialise le champ
        document.getElementById('add-category').value = ''; // Réinitialise le champ
        document.getElementById('add-category-new').value = ''; // Réinitialise le champ
    })
    .catch(error => console.error('Erreur :', error));
}

function deleteItem(id) {
    const confirmation = confirm("Êtes-vous sûr de vouloir supprimer cet élément ?"); // Confirmation de la suppression
    if (!confirmation) return; // Annule si l'utilisateur refuse
    fetch(url +'/' + id, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
            'X-AUTH-TOKEN': token
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erreur lors de la suppression : ${response.status} ${response.statusText}`);
        }
        console.log(response)
        refreshDatas();
        createMessage(`Le produit a bien été supprimé.`)
    })
    .catch(error => {
        console.error('Erreur :', error);
        alert("Une erreur s'est produite lors de la suppression : " + error.message);
    });
}

function show(id) {
    
    const init = { 
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            'X-AUTH-TOKEN': token
        },
    }
    fetch(url +'/' + id, init)
    .then(response => {
        return response.json(); // Parse the response body as JSON
    })
    .then(data => {
        //let results = document.getElementById("results");
        const row2 = document.createElement('tr');
            row2.innerHTML = `
                <td>${data.name}</td>
                <td>${data.quantity}</td>
                <td>${data.category}</td>
                <td>
                    <button onclick="editItem(${data.id}, '${data.name}','${data.quantity}','${data.category}');" class="btn btn-primary btn-sm mb-1">📝</button>
                    <button onclick="deleteItem(${data.id})" class="btn btn-primary btn-sm mb-1">❌</button>
                    </td>
            `;
            tbody.replaceWith(row2);
        //tbody.innerHTML=JSON.stringify(data);
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
        alert('Une erreur est survenue lors de la récupération des données.');
    });
}

function editItem(id, name, quantity, category) {
    currentId = id; // Stocke l'ID de l'élément à modifier
    document.getElementById('edit-nom').value = name;
    document.getElementById('edit-quantity').value = quantity;
    document.getElementById('edit-category').value = category;
    document.getElementById('edit-category-new').value = '';
    document.getElementById('edit-form').style.display = 'block'; // Affiche le formulaire
}

function updateItem() {
    const newName = document.getElementById('edit-nom').value;
    const newQuantity = document.getElementById('edit-quantity').value;
    const selectCategoryEdit = document.getElementById('edit-category').value;
    const selectCategoryNewEdit = document.getElementById('edit-category-new').value;
    if (selectCategoryNewEdit) {
        newCategory = selectCategoryNewEdit;
    } else {
        newCategory = selectCategoryEdit;
    }
    
    fetch(url+'/' + currentId, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-AUTH-TOKEN': token
        },
        body: JSON.stringify({ name: newName, quantity: newQuantity, category: newCategory}),
    })
    .then(response => {
        if (!response.ok) throw new Error('Erreur lors de la modification');
        refreshDatas();
        createMessage(`Le produit <span style="font-weight: bold;">${newName} </span> a bien été modifié :
        <br>quantité : ${newQuantity}
        <br>catégorie : ${newCategory} `)
        cancelEdit(); // Cache le formulaire
    })
    .catch(error => console.error('Erreur :', error));
}

function cancelEdit() {
    document.getElementById('edit-form').style.display = 'none'; // Cache le formulaire
    document.getElementById('edit-quantity').value = '';
    document.getElementById('edit-category').value = '';
    document.getElementById('edit-nom').value = '';
}

function filterByCategory(filterValue) {
    initMessage();
    noResultDiv.innerHTML='';
    const searchByCategory = document.getElementById("search-by-category");
    //const categoryFilter = searchByCategory.value.toLowerCase()
    //filterValue = categoryFilter;
    const init = { 
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            'X-AUTH-TOKEN': token
        }
    }
    fetch(url+'?limit='+noLimit+'&offset='+noOffset, init)
    .then(response => {
        return response.json(); // Parse the response body as JSON
    })
    .then(data => {
        datas = data.products
        datafiltered = datas.filter(function(datas) {
            return datas.category.toLowerCase().includes(filterValue)})
    const tbody = document.getElementById('data-table').querySelector('tbody');
    tbody.innerHTML = ''; // Efface le contenu précédent
    loadMoreButton.disabled=true
    if (datafiltered.length==0) {
        noResultDiv.innerHTML='Aucun produit trouvé';
    } else {
        datafiltered.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>${item.category}</td>
                <td>
                    <button onclick="editItem(${item.id}, '${item.name}','${item.quantity}','${item.category}')" class="btn btn-primary btn-sm mb-1">📝</button>
                    <button onclick="deleteItem(${item.id})" class="btn btn-primary btn-sm mb-1">❌</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
        alert('Une erreur est survenue lors de la récupération des données.');
    });  
}

function filterByName(filterValue) {
    initMessage();
    noResultDiv.innerHTML='';
    const searchByName = document.getElementById("search-by-name");
    const nameFilter = searchByName.value.toLowerCase().trim()
    filterValue = nameFilter;
    const init = { 
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            'X-AUTH-TOKEN': token
        }
    }
    fetch(url+'?limit='+noLimit+'&offset='+noOffset, init)
    .then(response => {
        return response.json(); // Parse the response body as JSON
    })
    .then(data => {
        datas = data.products
        datafiltered = datas.filter(function(datas) {
            return datas.name.toLowerCase().includes(filterValue)
        })
        const tbody = document.getElementById('data-table').querySelector('tbody');
        tbody.innerHTML = ''; // Efface le contenu précédent
        loadMoreButton.disabled=true
        if (datafiltered.length==0) {
            noResultDiv.innerHTML='Aucun produit trouvé';
            noResultDiv.classList.add('alert', 'alert-warning')
        } else {
            datafiltered.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${item.name}</td>
                    <td>${item.quantity}</td>
                    <td>${item.category}</td>
                    <td>
                        <button onclick="editItem(${item.id}, '${item.name}','${item.quantity}','${item.category}')" class="btn btn-primary btn-sm mb-1">📝</button>
                        <button onclick="deleteItem(${item.id})" class="btn btn-primary btn-sm mb-1">❌</button>
                    </td>
                `;
                tbody.appendChild(row);
            });
        }
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
        alert('Une erreur est survenue lors de la récupération des données.');
    });
}    

function loadCategories() {
    const init = { 
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            'X-AUTH-TOKEN': token
        }
    }
    fetch(url+'?limit='+noLimit+'&offset='+noOffset, init)
    .then(response => {
        // Vérifier si la réponse est un succès (statut 200) ou si c'est une erreur 404
        if (!response.ok) {
            if (response.status === 404) {
                // Si c'est une erreur 404, cela signifie qu'aucun produit n'a été trouvé
                return; // Sortir de la fonction sans traiter les produits
            } else {
                // Pour toute autre erreur (par exemple 500 ou autres)
                throw new Error(`Erreur HTTP: ${response.status}`);
            }
        }
        return response.json(); // Parse the response body as JSON
    })
    .then(datas => {
        if (!datas || !datas.products || datas.products.length === 0) {
            // Si les produits sont vides ou inexistants
            return; // Sortir de la fonction si aucune donnée à afficher
        }
        categories = []
        datas.products.forEach(data => {
            categories.push(data.category)})
            uniq_cat = [...new Set(categories)]
            console.log(uniq_cat)
        categorieSelects = document.querySelectorAll('.category');
        categorieSelects.forEach(categorieSelect => {
            categorieSelect.innerHTML = '<option value="">-- Choisir une catégorie --</option>';
        // Ajouter chaque catégorie comme option dans le select
        uniq_cat.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categorieSelect.appendChild(option);
        });
        })
        uniq_cat.forEach(category => {
        const button = document.createElement('button');
        button.value = category;
        button.textContent = category;
        button.classList.add("btn-light","btn","btn-sm")
        button.addEventListener('click', function() {filterByCategory(category) });
        categoryButtonsDiv.appendChild(button);
        // Vider le select avant d'ajouter les nouvelles options
        })
    })
    .catch(error => {
        console.error('Erreur lors du chargement des catégories :', error);
    });
}

/*function loadCategoriesButtons() {
    const init = { 
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            'X-AUTH-TOKEN': token
        }
    }
    fetch(url+'?limit='+noLimit+'&offset='+noOffset, init)
    .then(response => response.json())
    .then(datas => {
        categories = []
        datas.products.forEach(data => {
            categories.push(data.category)})
            uniq_cat = [...new Set(categories)]
            console.log(uniq_cat)
            uniq_cat.forEach(category => {
            const button = document.createElement('button');
            button.value = category;
            button.textContent = category;
            button.classList.add("btn-light","btn","btn-sm")
            button.addEventListener('click', function() {filterByCategory(category) });
            categoryButtonsDiv.appendChild(button);
        });

        
        // Vider le select avant d'ajouter les nouvelles options
        
    })
    .catch(error => {
        console.error('Erreur lors du chargement des catégories :', error);
    });
}*/

function initMessage() {
    message_modif.classList.add('d-none')
    message_modif.innerHTML=""
}

function initDatas() {
    tbody.innerHTML = ''; // Efface le contenu précédent
    categoryButtonsDiv.innerHTML=''
currentOffset = 0
loadMoreButton.disabled=false
loadMoreButton.innerText = 'Voir +';
}

function createMessage(message) {
    message_modif.classList.remove('d-none')
    message_modif.innerHTML=message
}

function refreshDatas() {
    initMessage();
    initDatas();
    showAll();
    loadCategories();
}
