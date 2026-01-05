const publicRoutes = require('express').Router();
const publicController = require('../controllers/publicController');

publicRoutes.get('/accueil', publicController.getAccueilData);

module.exports = publicRoutes;