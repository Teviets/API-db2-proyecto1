const Rating = require("../models/Rating");

const CreateRating = async (req, res) => {
    const rating = new Rating(req.body);
    await rating
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json(error));
};

const GetRating = async (req, res) => {

    const { id_restaurante } = req.query;

    await Rating.find(
            {id_restaurante: id_restaurante}
        )
        .then((data) => res.json(data))
        .catch((error) => res.json(error));
};

const GetThreeBestRatings = async (req, res) => {
    const { id_restaurante } = req.query;

    await Rating.find(
            {id_restaurante: id_restaurante}
        )
        .sort({puntuacion: -1})
        .limit(3)
        .then((data) => res.json(data))
        .catch((error) => res.json(error));
};

module.exports = {
    CreateRating,
    GetRating,
    GetThreeBestRatings
}
