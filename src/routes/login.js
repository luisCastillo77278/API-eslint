const { Router } = require('express');
const router = Router();
const autenticationController = require('../controllers/autentication');

router.post('/', autenticationController.login);

module.exports = router;
