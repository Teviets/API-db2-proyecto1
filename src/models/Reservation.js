const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
    id_restaurante: {
        type: String,
        required: true
    },
    id_usuario: {
        type: String,
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
    comentarios: {
        type: String
    }
});


module.exports = mongoose.model('Reservation', ReservationSchema, 'Reservation');