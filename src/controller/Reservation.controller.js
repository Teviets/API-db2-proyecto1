const Reservation = require('../models/Reservation');
const mongoose = require('mongoose');


const CreateReservation = async (req, res) => {
    
    const reservation = new Reservation(req.body);
    await reservation
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json(error));
};

const GetReservation = async (req, res) => {
    const { id_restaurante } = req.query;

    let date = getActualDate();

    await Reservation.find({
        id_restaurante: //object id del restaurante
            id_restaurante
    })
    //.sort({fecha: -1})
    .then((data) => res.json(data))
    .catch((error) => res.json(error));
}

const DeleteReservation = async (req, res) => {
    const { id } = req.query;
    await Reservation.findOneAndDelete({ _id: id })
        .then((data) => res.json(data))
        .catch((error) => res.json(error));
}

const getUserReservationCountPerRestaurant = async (req, res) => {
    const { id } = req.query;

    console.log(id);
    //const idu = mongoose.Types.ObjectId(id)

    //console.log(idu);

    await Reservation.aggregate([
        {
            $match: {
              id_usuario: "65dd70971edafc0b78b6096d"
            }
        },
        {
          $lookup: {
            from: "User",
            localField: "id_usuario",
            foreignField: "_id",
            as: "usuario"
          }
        },
        {
          $lookup: {
            from: "Restaurant",
            localField: "id_restaurante",
            foreignField: "_id",
            as: "restaurante"
          }
        },
        {
          $project: {
            cantidad_personas: 1,
            fecha: 1,
            usuario: { $arrayElemAt: ["$usuario", 0] },
            restaurante: { $arrayElemAt: ["$restaurante", 0] }
          }
        },
        {
          $group: {
            _id: "$restaurante._id",
            nombre: {
              $first: "$restaurante.nombre"
            },
            reservaciones: {
              $sum: 1
            }
          }
        }
    ]).then((data) => {
            console.log(data);
            res.json(data)
        })
    .catch((error) => {
          console.log(error);
          res.json(error);
      });
}


const top10RestaurantsFrecuently = async(req, res) => {
    await Reservation.aggregate([
        {
            $group: {
                _id: "$id_restaurante",
                reservas: {
                    $sum: 1
                }
            }
        },
        {
            $lookup: {
                from: "Restaurant",
                localField: "_id",
                foreignField: "_id",
                as: "restaurante"
            }
        },
        {
            $project: {
                nombre: {
                    $arrayElemAt: ["$restaurante.nombre", 0]
                },
                reservas: 1
            }
    
        },
        {
            $sort: {
                reservas: -1
            }
        },
        {
            $limit: 10
        }
    ]).then((data) => res.json(data))
        .catch((error) => {
            console.log(error);
            res.json(error);
        });
};
      
      

function getActualDate() {
    let date = new Date();
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let actualDate = `${year}-${month}-${day} ${hours}:${minutes}`;
    return actualDate;
}

module.exports = {
    CreateReservation,
    GetReservation,
    DeleteReservation,
    getUserReservationCountPerRestaurant,
    top10RestaurantsFrecuently
}