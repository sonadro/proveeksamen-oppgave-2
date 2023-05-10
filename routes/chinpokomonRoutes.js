// imports
const { Router } = require('express');
const chinpokomonController = require('../controllers/chinpokomonController');

const router = Router();

// routes
router.post('/chinpokomon-create', chinpokomonController.chinpokomon_create);
router.post('/chinpokomon-read', chinpokomonController.chinpokomon_read);
router.post('/landingpage-read', chinpokomonController.chinpokomon_landingPage_read);
router.post('/get-user-chinpokomons', chinpokomonController.chinpokomon_user_get);

module.exports = router;