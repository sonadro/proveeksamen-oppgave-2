const displayDiv = document.querySelector('.chinpokomons');

const fetchChinpokomons = async () => {
    const res = await fetch('http://localhost/landingpage-read', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            parcel: 'big'
        })
    });
    
    const result = await(res.json());
    
    result.chinpokomons.forEach(chinpokomon => {
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

fetchChinpokomons();