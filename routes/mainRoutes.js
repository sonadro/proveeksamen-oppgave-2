// imports
const { Router } = require('express');
const mainController = require('../controllers/mainController');

const router = Router();

// routes
router.get('/', mainController.home_get);
router.get('/login', mainController.login_get);
router.get('/create', mainController.createUser_get);

module.exports = router;