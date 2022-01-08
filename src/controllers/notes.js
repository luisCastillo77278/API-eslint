const { request, response } = require('express');
const Notes = require('../models/Note');
const Users = require('../models/User');


const notesController = {
  getAll: async(req, res = response) => {
    const notes = await Notes.find().populate('user',{
      notes: 0
    });
    res.status(200).json(notes);
  },
  getByID: async (req = request, res = response, next) => {
    const { id } = req.params;
    try{
      const note = await Notes.findById(id);
      res.status(200).json(note);
    }catch( err ){
      next(err);
    }
  },
  delete: async(req = request, res, next) => {
    const { id } = req.params;
    try{
      const note = await Notes.findByIdAndRemove(id);
      res.status(204).json( note );
    }catch(err){
      next(err);
    }
  },
  update: async (req = request, res = response, next)=>{
    const { id } = req.params;
    const {content, important} = req.body;
    try{
      const note = await Notes.findByIdAndUpdate(id, { content, important}, {new: true});
      res.status(200).json( note );
    }catch(err){
      next(err);
    }
  },
  create: async(req = request, res = response) => {
    const { id } = req;
    const { 
      content,
      important=false
    } = req.body;

    const user = await Users.findById( id );
    const note = new Notes({
      content,
      date: new Date(),
      important,
      user: user._id
    });

    const noteNew = await note.save();
    user.notes = user.notes.concat( noteNew._id );
    await user.save();
    res.status(200).json( noteNew );
    
  },
};

module.exports = notesController;
