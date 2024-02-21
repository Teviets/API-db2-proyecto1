const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    // ubicacion: {latitud: Number, longitud: Number}
    ubicacion: {
        latitud: {
            type: Number,
            required: true
        },
        longitud: {
            type: Number,
            required: true
        }
    },
    // menu: [{nombre: String, precio: Number}]
    menu: {
        type: Array,
        required: true
    }
});

// Agrega el método toJSON personalizado
/*RestaurantSchema.set('toJSON', {
    transform: function (doc, ret) {
        ret.id = ret._id; // Renombrar _id a id
        delete ret._id; // Eliminar _id
        delete ret.__v; // Eliminar __v

        // Tratar cada elemento del array 'menu'
        if (Array.isArray(ret.menu)) {
            ret.menu = ret.menu.map(menuItem => {
                return {
                    nombre: menuItem.nombre,
                    precio: menuItem.precio,
                    // Agrega más propiedades si es necesario
                };
            });
        }

        return ret;
    }
});*/

module.exports = mongoose.model('Restaurant', RestaurantSchema, 'Restaurant');
        