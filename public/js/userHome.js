const dropZone = document.querySelector('#image');
const form = document.querySelector('.createChinpokomon');

// file size limit (1048576 = 1mb)
const fileSizeLimit = 5 * 1048576;

// image
let img;

dropZone.addEventListener('dragover', e => {
    e.preventDefault();
});

dropZone.addEventListener('drop', e => {
    e.preventDefault();

    // clear previous image
    img = null;

    // check file limit
    let file = e.dataTransfer.files[0];
    console.log(file);
    if (file.size > fileSizeLimit) {
        console.log('your file is too big');
        file = null;
    } else {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.addEventListener('loadend', () => {
            img = reader.result;

            console.log(img);

            dropZone.style.backgroundImage = `url('${img}')`;
        });
        console.log('thank you for saving our servers');
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
    
    console.log(result);
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

const getChinpokomon = async () => {
    const res = await fetch('/chinpokomon-read', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            parcel: 'give me chinpokomon'
        })
    });
    
    const result = await(res.json());
    
    const parsed = JSON.parse(result.chinpokomon);

    console.log(parsed.picture);
    dropZone.style.backgroundImage = `url(${parsed.picture})`;
};

getChinpokomon();