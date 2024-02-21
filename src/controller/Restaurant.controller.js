const Restaurant = require('../models/Restaurant');
const User = require('../models/User');
const Plate = require('../models/Plate');
const CircularJSON = require('circular-json');

const getRestaurants = async (req, res) => {
    try{
        let data = await Restaurant.find();
        console.log(data);
        res.json(data);
    }catch (error){
        console.log(error);
        res.status(500).json({ error: 'Error al obtener restaurantes' });
    }
}

const postRestaurant = async (req, res) => {
    const { nombre, img, descripcion, rating, latitud, longitud, menu, plates, idUser } = req.body;
    
    // verificar el tamaño de plates
    let platesArray = [];
    if(plates.length > 4){
        for(let i = 0; i < plates.length; i++){
            const plate = new Plate(plates[i]);
            platesArray.push(plate);
        }
        await Plate.insertMany(platesArray)
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.log(error);
            });

        const restaurant = new Restaurant({
            nombre,
            img,
            descripcion,
            rating,
            ubicacion: {
                latitud,
                longitud
            },
            menu,
            plates: platesArray
        });

        await restaurant
            .save()
            .then((data) => {
                console.log(data);
                User.findOneAndUpdate({ id: idUser }, { $push: { restaurantes: data } })
                    .then((data) => {
                        console.log(data);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            })
            .catch((error) => {
                console.log(error);
            });

        await User.updateOne({ id: idUser }, { $push: { restaurantes: restaurant } })

        res.json(restaurant);
    }else {
        // error al no poder tener 4 platos

        res.json({message: "No se pueden tener menos de 4 platos"});

    }
}

const deleteRestaurant = async (req, res) => {
    const { id } = req.query;
    await Restaurant
        .findOneAndDelete({ id })
        .then((data) => res.json(data))
        .catch((error) => res.json(error));
}

module.exports = {
    getRestaurants,
    postRestaurant,
    deleteRestaurant
}