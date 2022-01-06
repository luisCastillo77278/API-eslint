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
  update: (req = request, res)=>{
    const { id } = req.params;
    const {content, important} = req.body;
    Notes.findByIdAndUpdate(id, { content, important}, {new: true})
      .then( note => res.status(200).json( note ))
      .catch( err => console.log(err));
  },
  create: async(req = request, res = response) => {
    const { 
      content,
      important=false,
      userId 
    } = req.body;

    const user = await Users.findById( userId );

    if( !content) return res.status(400).json({ resp: '400'});

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
