require('dotenv').config();
const mongoose = require('mongoose');

const connectionDB = async() =>{
  try {
    await mongoose.connect(process.env.URL);
    console.log('conexion con db moogose establecida');
  } catch (error) {
    console.log(error);
    throw new Error( error );
  }
  
};

process.on('uncaughtException', ()=>{
  mongoose.connection.disconnect();
});

module.exports = connectionDB;



