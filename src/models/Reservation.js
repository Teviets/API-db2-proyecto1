const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
    id_restaurante: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    id_usuario: {
        type: mongoose.Schema.Types.ObjectId,
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