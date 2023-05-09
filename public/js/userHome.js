console.log(username);

const findUser = async (username) => {
    const res = await fetch('http://localhost/get-userhome-user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username
        })
    });
    
    const result = await(res.json());
    
    console.log(result);
};

findUser(username);