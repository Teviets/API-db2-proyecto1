const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    id_restaurante: {
        type: Number,
        required: true
    },
    id_usuario: {
        type: Number,
        required: true
    },
    fecha: {
        type: Date,
        required: true
    },
    cantidad_personas:{
        type: Number,
        required: true
    },
    personas: {
        type: Number,
        required: true
    },
    comentarios: {
        type: String
    }
});


module.exports = mongoose.model('Reservation', ReservationSchema, 'Reservation');