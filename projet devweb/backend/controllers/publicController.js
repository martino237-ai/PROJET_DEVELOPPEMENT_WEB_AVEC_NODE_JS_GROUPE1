const bd = require('../bd');

exports.getAccueilData = (req, res) => {
    const data = {};

    // Produits en vedette (max 6)
    bd.query(
        'SELECT id, nom, prix, image FROM produits LIMIT 6',
        (err, produits) => {
            if (err) {
                return res.status(500).json({ message: 'Erreur serveur' });
            }

            data.produits = produits;

            // Statistiques
            bd.query(
                `
                SELECT
                  (SELECT COUNT(*) FROM users) AS users,
                  (SELECT COUNT(*) FROM produits) AS produits,
                  (SELECT COUNT(*) FROM commandes) AS commandes
                `,
                (err, stats) => {
                    if (err) {
                        return res.status(500).json({ message: 'Erreur serveur' });
                    }

                    data.stats = stats[0];
                    res.json(data);
                }
            );
        }
    );
};
