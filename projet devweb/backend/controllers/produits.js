const bd = require('../bd'); 

// GET tous les produits
exports.getProduits = (req, res) => {
    bd.query('SELECT * FROM produits', (err, rows) => {
        if (err) {
            console.error('Erreur lors de la récupération :', err);
            return res.status(500).json({ message: 'Erreur serveur' });
        }
        res.status(200).json(rows);
    });
};

// POST ajouter un produit
exports.ajouterProduit = (req, res) => {
    const { nom, description, prix, stock, categorie, image } = req.body;

    // Vérifier champs obligatoires
    if (!nom || !prix || stock === undefined) {
        return res.status(400).json({ message: 'Nom, prix et stock sont obligatoires' });
    }

    const nouveauProduit = {
        nom,
        description: description || null,
        prix,
        stock,
        categorie: categorie || null,
        image: image || null
    };

    bd.query('INSERT INTO produits SET ?', nouveauProduit, (err, result) => {
        if (err) {
            console.error('Erreur lors de l\'ajout :', err);
            return res.status(500).json({ message: 'Erreur serveur' });
        }
        res.status(201).json({ 
            message: 'Produit ajouté',
            produitId: result.insertId 
        });
    });
};

// DELETE supprimer un produit
exports.supprimerProduit = (req, res) => {
    const { id } = req.params;

    bd.query('DELETE FROM produits WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error('Erreur suppression :', err);
            return res.status(500).json({ message: 'Erreur serveur' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Produit non trouvé' });
        }
        res.status(200).json({ message: 'Produit supprimé' });
    });
};

// PUT modifier un produit
exports.modifierProduit = (req, res) => {
    const { id } = req.params;
    const { nom, description, prix, stock, categorie, image } = req.body;

    // Vérifier champs obligatoires
    if (!nom || !prix || stock === undefined) {
        return res.status(400).json({ message: 'Nom, prix et stock sont obligatoires' });
    }

    const produitModifie = {
        nom,
        description: description || null,
        prix,
        stock,
        categorie: categorie || null,
        image: image || null
    };

    bd.query('UPDATE produits SET ? WHERE id = ?', [produitModifie, id], (err, result) => {
        if (err) {
            console.error('Erreur modification :', err);
            return res.status(500).json({ message: 'Erreur serveur' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Produit non trouvé' });
        }

        res.status(200).json({ message: 'Produit modifié avec succès' });
    });
};
