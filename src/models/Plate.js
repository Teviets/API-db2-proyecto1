const mongoose = require('mongoose');

const PlateSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    id_restaurante: {
        type: Number,
        required: true
    }

});

module.exports = mongoose.model('Plate', PlateSchema, 'Plate');