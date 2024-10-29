showAll();
const noResultDiv = document.getElementById('no-result');
function filterByCategory(filterValue) {
    noResultDiv.innerHTML='';
    const searchByCategory = document.getElementById("search-by-category");
    const categoryFilter = searchByCategory.value.toLowerCase()
    filterValue = categoryFilter;
    console.log(filterValue)
    const token = 'fe94b6bc625a6e66c4b4b8749d22724d225dd60c';
        const url = 'https://whispering-ravine-73923-3f19d70e5dc9.herokuapp.com/api/product';
        const init = { 
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                'X-AUTH-TOKEN': token
            }
        }
        fetch(url, init)
        .then(response => {
        return response.json(); // Parse the response body as JSON
        })
    .then(data => {
        datafiltered = data.filter(function(data) {
            return data.category.toLowerCase().includes(filterValue)})
        console.log(datafiltered);
    const tbody = document.getElementById('data-table').querySelector('tbody');
    tbody.innerHTML = ''; // Efface le contenu précédent
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
    noResultDiv.innerHTML='';
    const searchByName = document.getElementById("search-by-name");
    const nameFilter = searchByName.value.toLowerCase()
    filterValue = nameFilter;
    console.log(filterValue)
    const token = 'fe94b6bc625a6e66c4b4b8749d22724d225dd60c';
        const url = 'https://whispering-ravine-73923-3f19d70e5dc9.herokuapp.com/api/product';
        const init = { 
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                'X-AUTH-TOKEN': token
            }
        }
        fetch(url, init)
        .then(response => {
        return response.json(); // Parse the response body as JSON
        })
    .then(data => {
        datafiltered = data.filter(function(data) {
            return data.name.toLowerCase().includes(filterValue)})
        console.log(datafiltered);
    const tbody = document.getElementById('data-table').querySelector('tbody');
    tbody.innerHTML = ''; // Efface le contenu précédent
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


function login() {
    const loginUrl = 'https://whispering-ravine-73923-3f19d70e5dc9.herokuapp.com/api/login';
    const credentials = {
    username: 'lebreton', // Remplace par ton nom d'utilisateur
    password: 'lebreton' // Remplace par ton mot de passe
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
        const token = data.apiToken; // Assure-toi que le token est bien dans la réponse
        // Ensuite, fais ta requête avec le token
        console.log(token);
    })}

    function showAll() {
        const token = 'fe94b6bc625a6e66c4b4b8749d22724d225dd60c';
        const url = 'https://whispering-ravine-73923-3f19d70e5dc9.herokuapp.com/api/product';
        const init = { 
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                'X-AUTH-TOKEN': token
            }
        }
        fetch(url, init)
        .then(response => {
        return response.json(); // Parse the response body as JSON
        })
    .then(data => {console.log(data)

    const tbody = document.getElementById('data-table').querySelector('tbody');
    tbody.innerHTML = ''; // Efface le contenu précédent

    data.forEach(item => {
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

    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
        alert('Une erreur est survenue lors de la récupération des données.');
    });
    }

    function show() {
        const token = 'fe94b6bc625a6e66c4b4b8749d22724d225dd60c';
        let div = document.getElementById("results");
        const id='52';
        const url = 'https://whispering-ravine-73923-3f19d70e5dc9.herokuapp.com/api/product/'+id;
        const init = { 
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                'X-AUTH-TOKEN': token
            }
        }
        fetch(url, init)
        .then(response => {
        return response.json(); // Parse the response body as JSON
        })
    .then(data => {console.log(data)
    let results = document.getElementById("results");
    results.innerHTML=JSON.stringify(data);
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
        alert('Une erreur est survenue lors de la récupération des données.');
    });
    }

    const url = 'https://whispering-ravine-73923-3f19d70e5dc9.herokuapp.com/api/product/';
    const token = 'fe94b6bc625a6e66c4b4b8749d22724d225dd60c';

    function editItem(id, name, quantity, category) {
        currentId = id; // Stocke l'ID de l'élément à modifier
        document.getElementById('edit-nom').value = name;
        document.getElementById('edit-quantity').value = quantity;
        document.getElementById('edit-category').value = category;
        document.getElementById('edit-form').style.display = 'block'; // Affiche le formulaire
    }

    function updateItem() {
        const newName = document.getElementById('edit-nom').value;
        const newQuantity = document.getElementById('edit-quantity').value;
        const newCategory = document.getElementById('edit-category').value;
        fetch(url + currentId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': token
            },
            body: JSON.stringify({ name: newName, quantity: newQuantity, category: newCategory}),
        })
        .then(response => {
            if (!response.ok) throw new Error('Erreur lors de la modification');
            showAll(); // Rafraîchit les données
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

    function addItem() {
    const addName = document.getElementById('add-nom').value;
    const addQuantity = document.getElementById('add-quantity').value;
    const addCategory = document.getElementById('add-category').value;
    const url = 'https://whispering-ravine-73923-3f19d70e5dc9.herokuapp.com/api/product';
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
    showAll(); // Rafraîchit les données
    document.getElementById('add-nom').value = ''; // Réinitialise le champ
    document.getElementById('add-quantity').value = ''; // Réinitialise le champ
    document.getElementById('add-category').value = ''; // Réinitialise le champ
})
.catch(error => console.error('Erreur :', error));
}

function deleteItem(id) {
    const confirmation = confirm("Êtes-vous sûr de vouloir supprimer cet élément ?"); // Confirmation de la suppression
    if (!confirmation) return; // Annule si l'utilisateur refuse
    fetch(url + id, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
            'X-AUTH-TOKEN': token
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erreur lors de la suppression : ${response.status} ${response.statusText}`);
        }
        showAll(); // Rafraîchit les données
    })
    .catch(error => {
        console.error('Erreur :', error);
        alert("Une erreur s'est produite lors de la suppression : " + error.message);
    });
}

