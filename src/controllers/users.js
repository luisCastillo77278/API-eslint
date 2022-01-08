const { request, response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const userController = {
  getUsers: async(req, res = response) => {
    const users = await User.find().populate('notes', {
      user: 0
    });
    res.json(users);
  },
  getUser: async(req = request, res= response) =>{
    const { id } = req.params;
    const user = await User.findById(id);
    res.json(user);
  },
  createUser: async(req = request, res = response)=>{
    const { username, name, password } = req.body;
    const passwordHash = await bcrypt.hash( password, 10);
    const user = new User({
      username, 
      name, 
      passwordHash 
    });
    
    try{
      const newUser = await user.save();
      res.json(newUser);
    }catch(err){
      res.status(400).json(err);
      // todo pasar el next(err)
    }
  }
};

module.exports = userController;