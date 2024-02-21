const { Router } = require('express');

const router = Router();

const { CreatePlate, CreatePlates, GetPlates } = require('../controller/Plate.controller');
const { CreateRating, GetRating, GetThreeBestRatings } = require('../controller/Rating.controller');
const { getRestaurants, postRestaurant, deleteRestaurant } = require('../controller/Restaurant.controller');
const { Register, Login, getUserByID } = require('../controller/User.controller');
const { CreateReservation, GetReservation, DeleteReservation  } = require('../controller/Reservation.controller');

// Routes
// posts
router.post('/register', Register);
router.post('/login', Login);
router.post('/restaurant', postRestaurant);
router.post('/plate', CreatePlate);
router.post('/plates', CreatePlates);
router.post('/rating', CreateRating);
router.post('/reservation', CreateReservation);

// gets
router.get('/restaurants', getRestaurants);
router.get('/plates', GetPlates);
router.get('/rating', GetRating);
router.get('/threeBestRatings', GetThreeBestRatings);
router.get('/user', getUserByID);
router.get('/reservation', GetReservation);

// deletes
router.delete('/restaurant', deleteRestaurant);
router.delete('/reservation', DeleteReservation);

module.exports = router;