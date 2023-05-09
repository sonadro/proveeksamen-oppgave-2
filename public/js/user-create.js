const createUserForm = document.querySelector('.createUserForm');

const createUser = async user => {
    const res = await fetch('http://localhost/user-create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user
        })
    });
    
    const result = await(res.json());
    
    console.log(result);
};

createUserForm.addEventListener('submit', e => {
    e.preventDefault();
});