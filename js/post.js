const user_title = document.querySelector('#user-title');
const user_detail_info = document.querySelector('#user-details');
let user_details = {};

window.onload = function() 
{
    getUserDetails(getURLParameter('user_id'));
}


async function getUserDetails(id)
{
    await fetch('https://jsonplaceholder.typicode.com/users/' + id)
            .then(response => response.json())
            .then(data => {
                user_details = data;
                showUserDetails();
            })
            .catch(error => console.log(error));
}


function showUserDetails()
{
    user_title.innerHTML = `
        ${user_details.username} (${user_details.id})
    `;

    user_detail_info.innerHTML = `
        <p>Straat: ${user_details.address.street}</p>
        <p>Suite: ${user_details.address.suite}</p>
        <p>Stad: ${user_details.address.city}</p>
        <p>Postcode: ${user_details.address.zipcode}</p>
        <p>Telefoon: ${user_details.phone}</p>
        <hr />
        <p>Website: ${user_details.website}</p>
    `;
}

function getURLParameter(name) 
{
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}

