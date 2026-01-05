const controllerscommandes = require('../controllers/commandes');
const express = require('express');
const middlewareAuth = require('../controllers/authMiddleware');
const router = express.Router();
router.get('/', middlewareAuth, controllerscommandes.getCommandes);
router.post('/ajouter', middlewareAuth, controllerscommandes.ajouterCommande);
router.get('/mes-commandes', middlewareAuth, controllerscommandes.getCommandesClient);
router.put('/:id/statut', middlewareAuth, controllerscommandes.changerStatut);
module.exports = router;

