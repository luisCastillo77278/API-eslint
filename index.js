const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

app.get('/', (req, res)=>{
  res.json({resp: 'hola mundo'})
})

app.get('/notes/:id', (req, res)=>{
  const { id } = req.params
  res.json({id})
})

app.listen(PORT, ()=>console.log(`Servidor corriendo en el puerot ${PORT}`))