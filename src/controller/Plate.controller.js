const PlateSchema = require('../models/Plate');
const RestaurantSchema = require('../models/Restaurant');

const CreatePlates = async (req, res) => {
    const plates = req.body;
    const restaurant = await RestaurantSchema
        .findOne({ _id: plates[0].id_restaurante })
        .then((data) => {
            console.log(data);
            return data;
        
        })
        .catch((error) => error);
    let rest = !restaurant 
    let men = !restaurant.menu
    let len = restaurant.menu.length === 12
    if (rest || men || len) {
        res.json({ error: 'El restaurante ya tiene el máximo de platos' });
        return;
    }

    try {
        await PlateSchema.insertMany(plates);

        plates.forEach((plate) => {
            restaurant.menu.push({ nombre: plate.nombre, precio: plate.precio });
            console.log(restaurant.menu);
        });

        /*await RestaurantSchema.findOneAndUpdate({ id: plates[0].id_restaurante }, restaurant)
            .catch((error) => res.json(error));*/

        // update restaurantes collection
        await RestaurantSchema.updateOne({ _id: plates[0].id_restaurante }, { menu: restaurant.menu })
            .then((data) => console.log(data))
            .catch((error) => console.log(error));

        res.json({ message: 'Platos creados exitosamente' });
    } catch (error) {
        res.json({ error: error.message });
    }
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
    GetPlates
}