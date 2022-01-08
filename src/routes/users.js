const { Router  } = require('express');
const route = Router();

const userController  = require('../controllers/users');

route.get('/', userController.getUsers);
route.get('/:id', userController.getUser);
route.post('/create', userController.createUser);


module.exports = route;