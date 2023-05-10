// imports
const { Router } = require('express');
const chinpokomonController = require('../controllers/chinpokomonController');

const router = Router();

// routes
router.post('/chinpokomon-create', chinpokomonController.chinpokomon_create);
router.post('/chinpokomon-read', chinpokomonController.chinpokomon_read);

module.exports = router;