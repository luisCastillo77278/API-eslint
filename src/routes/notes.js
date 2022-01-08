const { Router } = require('express');
const notesController = require('../controllers/notes');

const router = Router();

const { validateJWT } = require('../middlewares/validate-jwt');

router.get('/', notesController.getAll);
router.get('/:id', notesController.getByID);
router.post('/create', validateJWT ,notesController.create);
router.put('/update/:id', notesController.update);
router.delete('/delete/:id', notesController.delete);

module.exports = router;