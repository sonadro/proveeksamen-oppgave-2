// controller
module.exports.home_get = (req, res) => {
    res.render('index', { title: 'Home' });
};

module.exports.login_get = (req, res) => {
    res.render('login', { title: 'Logg inn' });
};

module.exports.createUser_get = (req, res) => {
    res.render('createUser', { title: 'Opprett bruker' });
};

module.exports.userHome_get = (req, res) => {
    const username = req.params.username;
    res.render('userHome', { title: 'Brukerpanel', username });
};