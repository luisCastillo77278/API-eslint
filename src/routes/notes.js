const { Router } = require('express');
const notesController = require('../controllers/note');

const router = Router();

router.get('/', notesController.getAll);
router.get('/:id', notesController.getByID);
router.post('/create', notesController.create);
router.put('/update/:id', notesController.update);
router.delete('/delete/:id', notesController.delete);

module.exports = router;