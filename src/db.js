// src/db.js
const mongoose = require('mongoose');
const { dbURL } = require('./config');

mongoose.connect(dbURL);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
  console.log('Conexión exitosa a MongoDB');
});

module.exports = db;
