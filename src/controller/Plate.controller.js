const PlateSchema = require('../models/Plate');
const RestaurantSchema = require('../models/Restaurant');

const CreatePlates = async (req, res) => {
    const plates = req.body;
    const restaurant = await RestaurantSchema
        .findOne({ id: plates[0].id_restaurante })
        .then((data) => data)
        .catch((error) => error);

    if (!restaurant || !restaurant.menu || restaurant.menu.length === 12) {
        res.json({ error: 'El restaurante ya tiene el máximo de platos' });
        return;
    }

    try {
        await PlateSchema.insertMany(plates);

        plates.forEach((plate) => {
            restaurant.menu.push({ nombre: plate.nombre, precio: plate.precio });
        });

        await RestaurantSchema.findOneAndUpdate({ id: plates[0].id_restaurante }, restaurant);

        res.json({ message: 'Platos creados exitosamente' });
    } catch (error) {
        res.json({ error: error.message });
    }
};



const CreatePlate = async (req, res) => {
    const plate = new PlateSchema(req.body);

    // get restaurant by id
    const restaurant = await RestaurantSchema
        .findOne({ id: plate.id_restaurante })
        .then((data) => data)
        .catch((error) => error);

    // check if restaurant exists and has a menu property
    if (!restaurant || !restaurant.menu || restaurant.menu.length >= 12) {
        res.json({ error: 'El restaurante ya tiene el máximo de platos' });
        return;
    }

    // add plate to restaurant
    restaurant.menu.push({ nombre: plate.nombre, precio: plate.precio });

    // update restaurant
    await RestaurantSchema
        .findOneAndUpdate({ id: plate.id_restaurante }, restaurant)
        .catch((error) => res.json(error));

    // save plate
    await plate
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json(error));
};


const GetPlates = async(req, res) => {
    const { id_restaurante } = req.query;
    await PlateSchema.find(
            {
                id_restaurante: id_restaurante
            }
        )
        .sort({ _id: -1 })
        .then((data)=> res.json(data))
        .catch((error)=> res.json(error));
}

module.exports = {
    CreatePlates,
    CreatePlate,
    GetPlates
}