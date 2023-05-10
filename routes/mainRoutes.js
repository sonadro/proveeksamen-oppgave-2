// imports
const { Router } = require('express');
const mainController = require('../controllers/mainController');
const { loggedInCheck, userHomeCheck } = require('../middleware/auth');

const router = Router();

// routes
router.get('/', loggedInCheck, mainController.home_get);
router.get('/login', loggedInCheck, mainController.login_get);
router.get('/create', loggedInCheck, mainController.createUser_get);
router.get('/home', loggedInCheck, userHomeCheck, mainController.userHome_get);
router.get('/home/:username', loggedInCheck, userHomeCheck, mainController.userHome_get);

module.exports = router;