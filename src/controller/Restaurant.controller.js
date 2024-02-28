const Restaurant = require('../models/Restaurant');
const User = require('../models/User');
const Plate = require('../models/Plate');
const CircularJSON = require('circular-json');

const getRestaurants = async (req, res) => {
    try{
        let data = await Restaurant.find();
        
        res.json(data);
    }catch (error){
        console.log(error);
        res.status(500).json({ error: 'Error al obtener restaurantes' });
    }
}

const postRestaurant = async (req, res) => {
    const { nombre, img, descripcion, rating, latitud, longitud, plates, idUser } = req.body;
    
    // verificar el tamaño de plates
    let platesArray = [];
    if(plates.length >= 4 || (plates && plates.length > 4)){
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
            menu: platesArray
        });

        await restaurant
            .save()
            .then((data) => {
                console.log("Exito al guardar");
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

        
        for (let i = 0; i < platesArray.length; i++){
            await Plate.updateOne({nombre: platesArray[i].nombre, precio: platesArray[i].precio}, {id_restaurante: restaurant._id})
                .then((data) => {
                    console.log("Exito de update");
                })
                .catch((error) => {
                    console.log(error);
                });
        }

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
        .findOneAndDelete({ _id: id })
        .then((data) => res.json({message: "Restaurante eliminado"}))
        .catch((error) => res.json(error));
}

const getPlatesMostExpensive = async (req,res) =>{
    try{
        let data = Restaurant.aggregate([
            {
                $unwind: "$menu"
            },
            {
                $group: {
                    _id: "$_id",
                    nombre: {
                        $first: "$nombre"
                    },
                    platoMasCaro: {
                        $max: "$menu.precio"
                    },
                    platoMasBarato: {
                        $min: "$menu.precio"
                    }
                }
            },
            {
                $sort: {
                    platoMasCaro: -1
                }
            },
            {
                $limit: 5
            }
        ])
        .then((data) => {
            res.json(data);
        })
    }catch (error){
        console.log(error);
        res.status(500).json({ error: 'Error al obtener restaurantes' });
    }
}


const top10Restaurants = async(req, res) => {
    await Restaurant.aggregate([
        {
          $sort: {
            rating: -1
          }
        },
        {
          $limit: 10
        },
          {
              $project: {
                  nombre: 1,
                  rating: 1
              }
          }
      ]).then((data) => res.json(data))
        .catch((error) => {
            console.log(error);
            res.json(error);
        });
};

module.exports = {
    getRestaurants,
    postRestaurant,
    deleteRestaurant,
    getPlatesMostExpensive,
    top10Restaurants
}