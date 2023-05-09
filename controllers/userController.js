// imports
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const { jwtSecret } = require('../config.json');

// jwt
const maxAge = 60 * 60 * 24 * 3;
const createToken = id => {
    return jwt.sign({ id }, jwtSecret), {
        expiresIn: maxAge
    };
};

// controller
module.exports.user_create = async (req, res) => {
    let user = req.body.user;

    // sjekk at brukeren har fylt ut alle feltene
    if (user.email.length < 3) {
        res.status(400).send({
            status: 'Emailen din må være minst 3 tegn',
            code: 'userErr'
        });
    } else if (user.username.length < 3) {
        res.status(400).send({
            status: 'Brukernavnet ditt må være minst 3 tegn',
            code: 'userErr'
        });
    } else if (user.password.length < 3) {
        res.status(400).send({
            status: 'Passordet ditt må være minst 3 tegn',
            code: 'userErr'
        });
    } else {
        // sjekk om brukeren eksisterer
        const emailExists = await User.findOne({ email: user.email });
        const usernameExists = await User.findOne({ username: user.username });

        if (emailExists) {
            console.log(emailExists);
            res.status(400).send({
                status: `Emailen "${user.email}" er allerede i bruk!`,
                code: 'userErr'
            });
        } else if (usernameExists) {
            console.log(usernameExists);
            res.status(400).send({
                status: `Brukernavnet "${user.username}" er allerede i bruk!`,
                code: 'userErr'
            });
        } else {
            // hash passord
            const salt = await bcrypt.genSalt();
            user.password = await bcrypt.hash(user.password, salt);

            try {
                // lagre dokumentet
                const document = new User(user);
                document.save();

                // logg brukeren inn
                const token = createToken(document._id);

                res.cookie('jwt', token, {
                    sameSite: 'strict',
                    httpOnly: true,
                    expiresIn: maxAge * 1000
                });

                res.status(200).send({
                    status: 'Brukeren din ble laget!',
                    code: 'ok'
                });
            } catch(err) {
                console.error(err);
                res.status(400).send({
                    status: 'Kunne ikke lagre brukeren, prøv igjen senere',
                    code: 'serverErr',
                    err
                });
            };
        };
    };
};