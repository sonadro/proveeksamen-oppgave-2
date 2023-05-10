const dropZone = document.querySelector('#image');

// file size limit (1048576 = 1mb)
const fileSizeLimit = 5 * 1048576;

dropZone.addEventListener('dragover', e => {
    e.preventDefault();
});

dropZone.addEventListener('drop', e => {
    e.preventDefault();

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
            const img = document.createElement('img');
            img.src = reader.result;

            console.log(img);
            // dropZone.innerHTML = '';
            // dropZone.append(img);

            dropZone.style.backgroundImage = `url('${img.src}')`;
        });
        console.log('thank you for saving our servers');
    };
});