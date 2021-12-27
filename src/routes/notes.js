const { Router } = require('express');
const notesController = require('../controllers/note');

const router = Router();

router.get('/', notesController.getAll);
router.get('/:id', notesController.getByID);
router.post('/create', notesController.create);

module.exports = router;