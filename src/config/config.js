require('dotenv').config();
const mongoose = require('mongoose');

const { URL, URL_TEST, NODE_ENV } = process.env;

const connection_url = ( NODE_ENV === 'test')
  ? URL_TEST
  : URL;

const connectionDB = async() =>{
  try {
    await mongoose.connect(connection_url);
    console.log('conexion con db moogose establecida');
  } catch (error) {
    console.log(error);
    throw new Error( error );
  }
  
  process.on('uncaughtException', ()=>{
    mongoose.connection.close();
  });
};


module.exports = connectionDB;



