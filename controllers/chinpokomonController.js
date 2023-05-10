// imports
const Chinpokomon = require('../models/chinpokomon');

// controller
module.exports.chinpokomon_create = async (req, res) => {
    const chinpokomon = req.body.chinpokomon;

    const document = new Chinpokomon(chinpokomon);

    try {
        document.save();
    } catch(err) {
        console.error(err);
    };
};

module.exports.chinpokomon_read = async (req, res) => {
    const chinpokomon = await Chinpokomon.findOne({ });

    res.status(200).send({
        chinpokomon: JSON.stringify(chinpokomon)
    });
};

module.exports.chinpokomon_landingPage_read = async (req, res) => {
    const chinpokomons = await Chinpokomon.aggregate([
        {
          '$sort': {
            'createdAt': -1
          }
        }, {
          '$limit': 5
        }
      ]);

    res.status(200).send({
        chinpokomons: JSON.stringify(chinpokomons)
    });
};

module.exports.chinpokomon_user_get = async (req, res) => {
    const username = req.body.username;

    const userChinpokomons = await Chinpokomon.aggregate([
      {
        '$match': {
          'authorName':  username
        }
      }, {
        '$sort': {
          'createdAt': -1
        }
      }
    ]);

    if (userChinpokomons.length) {
        res.status(200).send({
            chinpokomons: JSON.stringify(userChinpokomons)
        });
    } else {
        res.status(200).send({
            feedback: 'Denne brukeren har ingen Chinpokomons :('
        });
    };
};