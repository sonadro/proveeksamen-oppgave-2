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