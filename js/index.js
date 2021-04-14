const tbody = document.querySelector('#user-list');
let users = [];

// Alle users binnenhalen via een API call voordat een gebruiker iets met de pagina kan doen
window.onload = () => {
    fetchUsers();
}

// Async om aan te geven dat een API call asynchroon loopt t.o.v. mijn applicatie
async function fetchUsers()
{
    // API call, await vertellen we dat de browser/javascript engine moet wachten op 
    // een response van de API
    await fetch('https://jsonplaceholder.typicode.com/users')
            // Onderstaande then wordt pas uitgevoerd wanneer de API een response naar mijn
            // applicatie terugstuurt
            .then(response => {
                return response.json();     // De data die we hier ontvangen is niet voor ons geschikt,
                                            // Met deze instructie zetten we de ontvangen data om naar
                                            // een geschikte formaat
            })
            // Wordt na de eerste then uitgevoerd
            .then(data => {
                users = data;               // Nu hebben we data van de users in een geschikt formaat
                                            // binnen en slaan deze op in de variabele users
                addUsersToTable();
            })
            .catch(error => console.log(error));    // Als het fout gaat in de communicatie met de API
                                                    // Wordt de fout hier opgevangen.
}

// Na het binnenhalen injecteer ik de data in de tabel

function addUsersToTable()
{
    users.forEach( user => {
        let table_row = `
            <tr>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td><a class="waves-effect waves-light btn" href="http://127.0.0.1:5500/post.html?user_id=${user.id}">Details</a></td>
            </tr>
        `;

        tbody.innerHTML += table_row;
    });
}