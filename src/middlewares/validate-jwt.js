const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = (req = request, res = response, next) =>{

  const autorization = req.header('Authorization');
  
  if(!autorization) return res.status(500).json({
    error_type: 'TokenUndefined',
    msg: 'token is undefined'
  });

  try{
    const [ authSchema , payload] = autorization.split(' ');
    if( authSchema ){
      console.log(authSchema);
    }
    const { id }  = jwt.verify(payload, process.env.SECRET_API_KEY);
    req.id = id;
    next();
  }catch( err ){
    next(err);
  }

};

module.exports = {
  validateJWT
};