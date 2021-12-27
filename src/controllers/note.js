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
      .catch((err) => next(err));
  },
  delete: (req = request, res, next) => {
    const { id } = req.params;
    Notes.findByIdAndRemove(id)
      .then( note => res.status(200).json( note ))
      .catch(err => next(err));
    
  },
  update: (req = request, res, next)=>{
    const { id } = req.params;
    const {content, important} = req.body;
    Notes.findByAndUpdate(id, { content, important }, { new: true})
      .then( note => res.status(200).json( note ))
      .catch( err => next(err));
  }
  ,
  create: async (req = request, res = response) => {
    const { content } = req.body;
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
