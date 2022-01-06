const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = Schema({
  username: {
    type: String,
    unique: true
  },
  name: {
    type: String
  },
  passwordHash: {
    type: String
  },
  notes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Note'
    }
  ]
});

UserSchema.plugin(uniqueValidator);

UserSchema.set('toJSON', {
  transform: (document, object)=>{
    object.id = object._id;
    delete object._id;
    delete object.__v;
    delete object.passwordHash;
  }
});

module.exports = model('User', UserSchema);