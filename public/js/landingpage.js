const displayDiv = document.querySelector('.chinpokomonGrid');

const fetchChinpokomons = async () => {
    const res = await fetch('/landingpage-read', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            parcel: 'big'
        })
    });
    
    const result = await(res.json());

    const parsed = JSON.parse(result.chinpokomons);
    
    parsed.forEach(chinpokomon => {
        const template = `
            <div class="chinpokomonCard" id="${chinpokomon._id}">
                <div class="nameGrid"><h3>${chinpokomon.name}</h3></div>
                <div class="imgGrid"><div class="chinpokomonImg" style="background-image: url('${chinpokomon.picture}')"></div></div>
                <div class="abilityGrid">
                    <h2>Abilities:</h2>
                    <ul>
                        <li>1 - ${chinpokomon.ability1}</li>
                        <li>2 - ${chinpokomon.ability2}</li>
                        <li>3 - ${chinpokomon.ability3}</li>
                    </ul>
                </div>
                <p class="authorName">${chinpokomon.authorName}</p>
            </div>
        `;

        displayDiv.innerHTML += template;
    });
};

fetchChinpokomons();