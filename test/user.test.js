const mongoose = require('mongoose');
const { server } = require('../src/index');
const User = require('../src/models/User');
const bcrypt = require('bcryptjs');

const {
  api,
  getUsers
} = require('./helpers');

beforeEach(async()=>{
  await User.deleteMany({});
  const passwordHash = await bcrypt.hash('123456', 10);
  const user = new User({
    username: 'prueba de test',
    passwordHash
  });
  
  await user.save();
});

test('post create new user', async()=>{
  const usersBefore = await User.find();
  const countUserBefore = usersBefore.map( user => user.toJSON());

  const newUser = {
    username: 'prueba testing',
    name: 'testing',
    password: '123456'
  };

  await api
    .post('/api/users/create')
    .send(newUser)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const usersAfter = await User.find();
  const countUserAfter = usersAfter.map(user => user.toJSON());
  expect(countUserAfter).toHaveLength( countUserBefore.length + 1);

  const usersname = usersAfter.map( user => user.username);
  expect(usersname).toContain(newUser.username);

});

test('get count database users', async()=>{
  const users = await User.find();
  const usersCount = users.map(user => user.toJSON());

  const resp = await api
    .get('/api/users')
    .expect(200)
    .expect('Content-Type', /application\/json/);

  expect(resp.body).toHaveLength(usersCount.length);

});

test('creation fails with proper statuscode and message if username is already taken', async()=>{
  const usersBefore = await getUsers();

  const newUser = {
    username: 'prueba de test',
    name: 'testing',
    password: '123456'
  };

  const result = await api
    .post('/api/users/create')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/);

  
  expect(result.body.errors.username.message).toContain('`username` to be unique');

  const usersAfter = await getUsers();

  expect(usersAfter).toHaveLength(usersBefore.length);

});

afterAll(()=>{
  mongoose.connection.close();
  server.close();
});