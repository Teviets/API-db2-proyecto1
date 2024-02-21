const Reservation = require('../models/Reservation');

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
        id_restaurante: id_restaurante,
        fecha: {
            $gte: date
        }
    })
    .sort({fecha: 1})
    .then((data) => res.json(data))
    .catch((error) => res.json(error));
}

const DeleteReservation = async (req, res) => {
    const { id } = req.query;
    await Reservation.findOneAndDelete({ id: id })
        .then((data) => res.json(data))
        .catch((error) => res.json(error));
}

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
    DeleteReservation
}