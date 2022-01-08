const jwt = require('jsonwebtoken');

const generateJWT = ( payload = { id: '' } ) =>{
  return new Promise ((resolve, reject)=>{
    jwt.sign(payload, process.env.SECRET_API_KEY, { expiresIn: '4h' }, 
      (err, token)=>{
        if(err){
          console.log('error generando token ', err);
          reject('el token no pudo ser generado');
        }else{
          resolve(token);
        }
      });
  });
};

module.exports = {
  generateJWT
};