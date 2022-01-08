const mongoose = require('mongoose');
const { server } = require('../src/index');
const { api } = require('./helpers');
const bcrypt = require('bcryptjs');
const User = require('../src/models/User');

beforeEach(async()=>{
  await User.deleteMany({});
  const passwordHash = await bcrypt.hash('123456', 10);
  const user = new User({
    username: 'prueba de test',
    name: 'prueba',
    passwordHash
  });
  
  await user.save();
});

test('enviando credencial usuario invalida', async()=>{
  const userTest = {
    username: 'prueba',
    password: '123456'
  };

  const resp = await api
    .post('/api/login')
    .send(userTest)
    .expect(401)
    .expect('Content-Type', /application\/json/);
  
  expect(resp.body.error).toBe('invalid user or password');

});

test('enviando credencial password invalida', async()=>{
  const userTest = {
    username: 'prueba de test',
    password: '12345678'
  };
  
  const resp = await api
    .post('/api/login')
    .send(userTest)
    .expect(401)
    .expect('Content-Type', /application\/json/);

  expect(resp.body.error).toBe('invalid user or password');
  
});

test('enviando credenciales validas', async()=>{
  const user = await User.find();
  const users = user.map( user => user.toJSON());
  const userTest = {
    username: 'prueba de test',
    password: '123456'
  };

  const userFind = users.find( user => user.username === userTest.username);

  const resp = await api
    .post('/api/login')
    .send(userTest)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  expect(userFind.username).toContain( resp.body.username );

});

afterAll(()=>{
  mongoose.connection.close();
  server.close();
});
