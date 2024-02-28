const Rating = require("../models/Rating");
const Restaurant = require("../models/Restaurant");

const CreateRating = async (req, res) => {
    const { id_restaurante, id_usuario, puntuacion, comentarios } = req.body;
    const fecha = getActualDate();
    const rating = new Rating({
        id_restaurante,
        id_usuario,
        fecha,
        puntuacion,
        comentarios
    });

    // actualiza la media de rating del restaurante

    try {
        let restaurant = await Restaurant.findOne({ _id: id_restaurante });
        let ratings = await Rating.find({ id_restaurante: id_restaurante });
        let sum = 0;
        ratings.forEach((rating) => {
            sum += rating.puntuacion;
        });

        let media = sum / ratings.length;
        restaurant.rating = media;

        await Restaurant
            .updateOne({ _id: id_restaurante }, restaurant)
            .then((data) => console.log("exito ", media))
            .catch((error) => console.log(error));


        await rating
            .save()
            .then((data) => res.json(data))
            .catch((error) => res.json(error));
    }

    catch (error) {
        res.json(error);
        console.log(error);
    }
};

const GetRating = async (req, res) => {

    const { id_restaurante } = req.query;

    await Rating.find(
        { id_restaurante: id_restaurante }
    )
        .then((data) => res.json(data))
        .catch((error) => res.json(error));
};

const GetThreeBestRatings = async (req, res) => {
    const { id_restaurante } = req.query;

    await Rating.find(
        { id_restaurante: id_restaurante }
    )
        .sort({ puntuacion: -1 })
        .limit(3)
        .then((data) => res.json(data))
        .catch((error) => res.json(error));
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
    CreateRating,
    GetRating,
    GetThreeBestRatings
}
