const { response } = require('express');
const HANDLE_ERROR = {
  TokenExpiredError: (res = response, error)=>{
    res.status(500).json({
      error_type: error.name,
      msg: error.message
    });
  },
  JsonWebToken: (res = response, error)=>{
    res.status(500).json({
      error_type: error.name,
      msg: error.message
    });
  },
  ValidationError: (res = response, error)=>{
    res.status(500).json({
      error_type: error.name,
      msg: error.message
    });
  },
  CastError: (res = response, error)=>{
    res.status(500).json({
      error_type: error.name,
      msg: error.message
    });
  },
  TypeError: (res = response, error)=>{
    res.status(500).json({
      error_type: error.name,
      msg: error.message
    });
  },
  DefaultError: (res = response, error)=>{
    res.status(500).json({
      error_type: error.name,
      msg: error.message
    });
  }
};

const handlingError = (error, req, res, next) =>{

  const handle = HANDLE_ERROR[error.name] || HANDLE_ERROR.DefaultError;
  handle(res, error);
  next();
};

module.exports = {
  handlingError
};