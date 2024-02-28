const mongoose = require('mongoose');

const RatingSchema = new mongoose.Schema({
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
    puntuacion: {
        type: Number,
        required: true
    },
    comentarios: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Rating', RatingSchema, 'Ratings');