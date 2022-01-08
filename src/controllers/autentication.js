require('dotenv').config();
const { request, response } = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const { generateJWT } = require('../helpers/generate-jwt');

const autenticationController = {
  login: async( req = request, res = response )=>{
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    
    // mala practica ya que damos indicio de que el usuario puede o no existir a un atacante
    // if (!user) return res.status(401).json({ 
    //   error: 'no user found' 
    // });
  
    const correctPass = user === null
      ? false 
      : await bcrypt.compare(password, user.passwordHash);
  
    if (!(user && correctPass))
      return res.status(401).json({ 
        error: 'invalid user or password' 
      });

    
    const token = await generateJWT( { id: user._id } );
    
    res.status(200).json({ 
      name: user.name,
      username: user.username,
      token
    });
  }
};

module.exports = autenticationController;
