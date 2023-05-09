const loginForm = document.querySelector('.loginForm');

const login = async user => {
    const res = await fetch('http://localhost/user-login', {
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

loginForm.addEventListener('submit', e => {
    e.preventDefault();

    const user = {
        email: loginForm.email.value,
        username: loginForm.username.value,
        password: loginForm.password.value
    };

    login(user);
});