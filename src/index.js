require('dotenv').config();
const path = require('path');
const cors = require('cors');
const express = require('express');

const { handlingError } = require('./middlewares/handlingError');

const connectionDB = require('./config/config');
const indexRouter = require('./routes');

const app = express();
const PORT = process.env.PORT || 3005;
connectionDB();

app.use(cors());
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api', indexRouter);

app.use(handlingError);

const server = app.listen(PORT, () => console.log(`Servidor corriendo en el puerot ${PORT}`));
module.exports = {app, server};
