// imports
const { Router } = require('express');
const userController = require('../controllers/userController');

const router = Router();

// routes
router.post('/user-create', userController.user_create);
router.post('/user-login', userController.user_login);

module.exports = router;