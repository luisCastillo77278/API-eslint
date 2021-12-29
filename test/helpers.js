const supertest = require('supertest');
const {app} = require('../src/index');

const api = supertest(app);

const initialNotes = [
  {
    content: 'Prueba testing jest 1',
    important: true,
    date: new Date()
  },
  {
    content: 'Prueba testing jest 2',
    important: true,
    date: new Date()
  }
];

const getAllContentFromNote = async() =>{
  const resp = await api
    .get('/api/notes');

  return {
    content:resp.body.map( note => note.content),
    resp
  };
};

module.exports = {
  initialNotes,
  api,
  getAllContentFromNote
};