const mongoose = require('mongoose');

const RatingSchema = new mongoose.Schema({
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
    puntuacion: {
        type: Number,
        required: true
    },
    comentario: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Rating', RatingSchema, 'Rating');