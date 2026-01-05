const controllersproduits = require('../controllers/produits');
const express = require('express');
const router = express.Router();

router.get('/', controllersproduits.getProduits);
router.post('/ajouter', controllersproduits.ajouterProduit);
router.delete('/supprimer/:id', controllersproduits.supprimerProduit);
router.put('/modifier/:id', controllersproduits.modifierProduit);

module.exports = router;