const mongoose = require('mongoose');
const { server} = require('../src/index');
const Note = require('../src/models/Note');

const { 
  initialNotes,
  api,
  getAllContentFromNote
} = require('./helpers');

beforeEach( async ()=>{
  await Note.deleteMany();

  // secuencial
  for(const notes of initialNotes){
    const objectNew = new Note(notes);
    await objectNew.save();
  }

});

test('notes are returnd as json', async()=>{
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('there are notes two', async()=>{
  // const resp = await api
  //   .get('/api/notes');
  
  const { resp } = await getAllContentFromNote();

  expect(resp.body).toHaveLength(initialNotes.length);
});

test('content is prueba testing jest 1', async()=>{
  // const resp = await api
  //   .get('/api/notes');

  // const contenido = resp.body.map( note => note.content);
  const { content } = await getAllContentFromNote();
  expect(content).toContain('Prueba testing jest 1');
});

test('post added note', async()=>{
  const newNote = {
    content: 'nueva nota'
  };

  await api
    .post('/api/notes/create')
    .send(newNote)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  // const resp = await  api.get('/api/notes');

  // const content = resp.body.map(note => note.content);

  const { resp, content} = await getAllContentFromNote();
  expect(resp.body).toHaveLength(initialNotes.length + 1);
  expect(content).toContain('nueva nota');

});

test('post content is not added', async()=>{
  const newNote = {};
  await api
    .post('/api/notes/create')
    .send(newNote)
    .expect(400);

  // const resp = await api.get('/api/notes');
  const { resp } = await getAllContentFromNote();
  expect(resp.body).toHaveLength(initialNotes.length);
});

test('anote can be delete', async()=>{
  const { resp: firsResponse } = await getAllContentFromNote();
  const { body: notes } = firsResponse;
  const noteToDelete = notes[0];
  
  await api
    .delete(`/api/notes/delete/${noteToDelete.id}`)
    .expect(204);

  const { resp: secondResponse, content} = await getAllContentFromNote();
  expect(secondResponse.body).toHaveLength(initialNotes.length - 1);
  expect(content).not.toContain(noteToDelete.content);

});

test('anote can be delete fail error', async()=>{
  await api
    .delete('/api/notes/delete/61ccaad7b7097c8dff35e80511')
    .expect(400);

  
  const { resp } = await getAllContentFromNote();
  expect( resp.body).toHaveLength(initialNotes.length);

});

test('get unique note', async()=>{
  await api
    .get('/api/notes/61ccaad7b7097c8dff35e80511')
    .expect(400);
  
  const { resp } = await getAllContentFromNote();
  expect( resp.body ).toHaveLength( initialNotes.length );
});

afterAll(()=>{
  mongoose.connection.close();
  server.close();
});