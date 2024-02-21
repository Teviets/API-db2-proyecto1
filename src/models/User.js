const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true
    },
    contraseña: {
        type: String,
        required: true
    },
    rol: {
        type: Number,
        required: true
    },
    // restaurantes: [toda informacion de restaurantes] pero puede estar vacio el array
    restaurantes: {
        type: Array
    }

});

module.exports = mongoose.model('User', UserSchema, 'User');