// packages & imports
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config.json');

// logged in check
const loggedInCheck = (req, res, next) => {
    const token = req.cookies.jwt;

    // sjekk om jwt er gyldig
    if (token) {
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            if (err) {
                // ugyldig token
                console.error(err);
                res.locals.loggedIn = false;
                next();
            } else {
                // logget inn
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

// export functions
module.exports = loggedInCheck;