// imports
const { Router } = require('express');
const mainController = require('../controllers/mainController');
const loggedInCheck = require('../middleware/auth');

const router = Router();

// routes
router.get('/', loggedInCheck, mainController.home_get);
router.get('/login', loggedInCheck, mainController.login_get);
router.get('/create', loggedInCheck, mainController.createUser_get);

module.exports = router;