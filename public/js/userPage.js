const displayDiv = document.querySelector('.chinpokomonGrid');

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

    const parsed = JSON.parse(result.chinpokomons);

    parsed.forEach(chinpokomon => {
        const template = `
        <div class="chinpokomonCard">
            <div class="nameGrid"><h3>${chinpokomon.name}</h3></div>
            <div class="imgGrid"><div style="background-image: url(${chinpokomon.picture});"></div></div>
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

getUserChinpokomons();