// imports
const Chinpokomon = require('../models/chinpokomon');

// controller
module.exports.chinpokomon_create = async (req, res) => {
    const chinpokomon = req.body.chinpokomon;

    const document = new Chinpokomon(chinpokomon);

    // sjekk om alle felter eksisterer
    if (document.name.length < 3) {
        res.status(400).send({
            status: 'Navnet til Chinpokomonen må være minst 3 tegn',
            code: 'userErr'
        });
    } else if (document.ability1.length < 2 || document.ability2.length < 2 || document.ability3.length < 2) {
        res.status(400).send({
            status: 'Chinpokomonen må ha 3 egenskaper',
            code: 'userErr'
        });
    } else if (!document.picture) {
        res.status(400).send({
            status: 'Du må laste opp et bilde til Chinpokomonen!',
            code: 'userErr'
        });
    } else {
        try {
            document.save();
            res.status(200).send({
                status: 'Chinpokomonen ble lagret',
                code: 'ok'
            });
        } catch(err) {
            console.error(err);
            res.status(400).send({
                status: 'Det skjedde en feil når Chinpokomonen skulle lagres. Prøv igjen senere',
                code: 'serverErr'
            });
        };
    };
};

module.exports.chinpokomon_read = async (req, res) => {
    let info = req.body;

    let chinpokomons

    if (info.limit === 0) {
        chinpokomons = await Chinpokomon.aggregate([
            {
                '$sort': {
                    'createdAt': -1
                }
            }, {
                '$match': {
                    'authorName': info.username
                }
            }
        ]);
    } else {
        chinpokomons = await Chinpokomon.aggregate([
            {
                '$sort': {
                    'createdAt': -1
                }
            }, {
                '$limit': 10
            }
        ]);
    };

    res.status(200).send({
        chinpokomons: JSON.stringify(chinpokomons)
    });
};