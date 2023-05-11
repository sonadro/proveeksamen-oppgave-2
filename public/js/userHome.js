const form = document.querySelector('.createGrid');
const feedback = document.querySelector('.feedback');
const dropZone = document.querySelector('#image');
const hideMe = document.querySelector('.hideMe');

// maks filstørrelse (1048576 = 1mb)
const fileSizeLimit = 5 * 1048576;

// bilde brukeren kan laste opp
let img;

dropZone.addEventListener('dragover', e => {
    e.preventDefault();
});

const showFeedback = (status, code) => {
    // user feedback ------------------

    // fjern gamle status classes fra feedback
    const statusClasses = ['userErr', 'serverErr', 'ok'];
    statusClasses.forEach(statusClass => {
        feedback.classList.remove(statusClass);
    });

    // vis status tekst
    feedback.innerText = status;

    // legg til statuskode class & vis feedback
    feedback.classList.add(code);
    feedback.classList.remove('hidden');

    // hvis ok, refresh siden
    if (code === 'ok') {
        // reset form verdier
        form.name.value = null;
        form.ability1.value = null;
        form.ability2.value = null;
        form.ability3.value = null;
        window.location.reload();
    };
}

// hvis brukeren slipper et bilde over dropsonen
dropZone.addEventListener('drop', e => {
    e.preventDefault();

    // fjern forrige bilde når nytt bilde lastes opp
    img = null;

    // hent ut filen
    let file = e.dataTransfer.files[0];

    // sjekk om filen er under maksimal grensen
    if (file.size > fileSizeLimit) {
        // feedback til bruker
        showFeedback('Maksimal filstørrelse er 5mb', 'userErr');
        dropZone.style.backgroundImage = '';

        // slett filen brukeren lastet opp fra variabelen
        file = null;
    } else {
        // les av filen
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.addEventListener('loadend', () => {
            // når filen er ferdig å lese, lagre den i variabelen som blir lastet opp når formen blir submittet
            img = reader.result;
            hideMe.classList.add('hidden');

            // sett bakgrunnsbildet til dropsonen så brukeren kan se bildet de lastet opp
            dropZone.style.backgroundImage = `url('${img}')`;
        });
    };
});

// send chinpokomon til backend
const uploadChinpokomon = async chinpokomon => {
    const res = await fetch('/chinpokomon-create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chinpokomon
        })
    });
    
    const result = await(res.json());

    showFeedback(result.status, result.code);
};

form.addEventListener('submit', e => {
    e.preventDefault();

    // finn brukernavn
    const location = window.location.toString();
    const username = location.slice(location.indexOf('/home/') + 6, location.length);

    const chinpokomon = {
        name: form.name.value,
        ability1: form.ability1.value,
        ability2: form.ability2.value,
        ability3: form.ability3.value,
        picture: img,
        authorName: username,
        createdAt: Date.now()
    };

    uploadChinpokomon(chinpokomon);
});

const urlLocation = location.toString();
const username = urlLocation.slice(urlLocation.indexOf('/home/') + 6, urlLocation.length);
getChinpokomons(username, 0);