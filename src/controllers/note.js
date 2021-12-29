const { request, response } = require('express');
const Notes = require('../models/Note');

const notesController = {
  getAll: (req, res = response) => {
    Notes.find()
      .then((notes) => res.status(200).json(notes))
      .catch(console.log);
  },
  getByID: (req = request, res = response, next) => {
    const { id } = req.params;
    Notes.findById(id)
      .then((note) => res.status(200).json(note))
      .catch(next);
  },
  delete: (req = request, res, next) => {
    const { id } = req.params;
    Notes.findByIdAndRemove(id)
      .then( note => res.status(204).json( note ))
      .catch(next);
    
  },
  update: (req = request, res, next)=>{
    const { id } = req.params;
    const {content, important} = req.body;
    Notes.findByAndUpdate(id, { content, important }, { new: true})
      .then( note => res.status(200).json( note ))
      .catch( err => next(err));
  },
  create: (req = request, res = response) => {
    const { content } = req.body;

    if( !content) return res.status(400).json({ resp: '400'});

    const note = new Notes({
      content,
      date: new Date(),
      important: true,
    });
      
    note.save()
      .then( resp => res.status(200).json( resp ));
  },
};

module.exports = notesController;
