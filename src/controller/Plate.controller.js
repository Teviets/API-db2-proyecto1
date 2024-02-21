const PlateSchema = require('../models/Plate');
const RestaurantSchema = require('../models/Restaurant');

const CreatePlates = async(req, res) => {
    const plates = req.body;
    const restaurant = await RestaurantSchema
        .find({ id: plates[0].id_restaurante })
        .then((data)=> data)
        .catch((error)=> error);

    if (restaurant.menu.length + plates.length > 12) {
        res.json({ error: 'El restaurante ya tiene el máximo de platos' });
        return;
    }

    await PlateSchema.insertMany(plates)
        .then((data)=> res.json(data))
        .catch((error)=> res.json(error));

    plates.forEach(plate => {
        restaurant.menu.push({nombre: plate.nombre, precio: plate.precio});
    });

    await RestaurantSchema
        .findOneAndUpdate({ id: plates[0].id_restaurante }, restaurant)
        .then((data)=> res.json(data))
        .catch((error)=> res.json(error));
}

const CreatePlate = async(req, res) => {
    const plate = new PlateSchema(req.body);

    // get restaurant by id
    const restaurant = await RestaurantSchema
        .find({ id: plate.id_restaurante })
        .then((data)=> data)
        .catch((error)=> error);

    // if restaurant have more than 12 plates throw error
    if (restaurant.menu.length >= 12) {
        res.json({ error: 'El restaurante ya tiene el máximo de platos' });
        return;
    }

    // save plate
    await plate
        .save()
        .then((data)=> res.json(data))
        .catch((error)=> res.json(error));

    // add plate to restaurant
    restaurant.menu.push({nombre: plate.nombre, precio: plate.precio});

    // update restaurant
    await RestaurantSchema
        .findOneAndUpdate({ id: plate.id_restaurante }, restaurant)
        .then((data)=> res.json(data))
        .catch((error)=> res.json(error));
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