// packages & imports
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config.json');
const User = require('../models/user');

// logged in check
const loggedInCheck = (req, res, next) => {
    const token = req.cookies.jwt;

    // sjekk om jwt er gyldig
    if (token) {
        jwt.verify(token, jwtSecret, async (err, decodedToken) => {
            if (err) {
                // ugyldig token
                console.error(err);
                res.locals.loggedIn = false;
                next();
            } else {
                // logget inn
                const user = await User.findOne({ _id: decodedToken.id });
                console.log(user);
                res.locals.username = user.username;
                res.locals.loggedIn = true;
                next();
            };
        });
    } else {
        // brukeren er ikke logget inn
        res.locals.loggedIn = false;
        next();
    };
};

const userHomeCheck = async (req, res, next) => {
    const username = req.params.username;
    const token = req.cookies.jwt;

    // sjekk om bruker har token
    if (token) {
        jwt.verify(token, jwtSecret, async (err, decodedToken) => {
            if (err) {
                // ugyldig token
                console.error(err);
                res.redirect('/login');
            } else {
                // bruker er logget inn
                const dbUser = await User.findOne({ _id: decodedToken.id });
                if (username === dbUser.username) {
                    next();
                } else {
                    res.redirect(`/home/${dbUser.username}`);
                };
            };
        });
    } else {
        // bruker er ikke logget inn, redirect til logg inn side
        res.redirect('/login');
    };
};

// export functions
module.exports = { loggedInCheck, userHomeCheck };