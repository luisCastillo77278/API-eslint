const { Schema, model } = require('mongoose');

const NoteSchema = Schema({
  content: {
    type: String
  },
  date: {
    type: Date
  },
  important: {
    type: Boolean
  }
});

// NoteSchema.methods.toJSON = function (){
//   const newObject = {...this.toObject()};
//   newObject.id = newObject._id;
//   delete newObject._id;
//   delete newObject.__v;
//   return newObject;

// };

NoteSchema.set('toJSON', {
  transform: (document, object)=>{
    object.id = object._id;
    delete object._id;
    delete object.__v;
  }
});

module.exports = model('Note', NoteSchema);



