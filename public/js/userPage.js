const displayDiv = document.querySelector('.chinpokomons');

const getUserChinpokomons = async () => {
    const location = window.location.toString();
    const username = location.slice(location.indexOf('/user/') + 6, location.length);

    const res = await fetch('/get-user-chinpokomons', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username
        })
    });
    
    const result = await(res.json());

    result.userChinpokomons.forEach(chinpokomon => {
        const template = `
            <div id="${chinpokomon._id}">
                <h3>${chinpokomon.name}</h3>
                <p>${chinpokomon.ability1}</p>
                <p>${chinpokomon.ability2}</p>
                <p>${chinpokomon.ability3}</p>
                <p>${chinpokomon.authorName}</p>
            </div>
        `;

        displayDiv.innerHTML += template;
    });
};

getUserChinpokomons();