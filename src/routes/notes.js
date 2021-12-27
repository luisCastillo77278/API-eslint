const { Router } = require('express');
const notesController = require('../controllers/note');

const router = Router();

router.get('/', notesController.getAll);
router.get('/:id', notesController.getByID);
router.delete('/delete/id:', notesController.delete);
router.post('/create', notesController.create);
router.put('/update/:id');

module.exports = router;