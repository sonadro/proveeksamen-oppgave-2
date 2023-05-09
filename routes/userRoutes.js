// imports
const { Router } = require('express');
const userController = require('../controllers/userController');

const router = Router();

// routes
router.post('/user-create', userController.user_create);

module.exports = router;