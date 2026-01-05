const bd = require('../bd');
const middlewareAuth = require('./authMiddleware');


exports.getCommandes = (req, res) => {
    const sql = `
        SELECT c.id AS commande_id, c.user_id, c.total, c.statut, ci.produit_id, ci.quantite, p.nom, p.prix
        FROM commandes c
        LEFT JOIN commande_items ci ON c.id = ci.commande_id
        LEFT JOIN produits p ON ci.produit_id = p.id
    `;

    bd.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Erreur serveur" });
        }

        const commandes = [];
        results.forEach((row) => {
            let cmd = commandes.find((c) => c.id === row.commande_id);
            if (!cmd) {
                cmd = {
                    id: row.commande_id,
                    user_id: row.user_id,
                    total: row.total,
                    statut: row.statut,
                    produits: [],
                };
                commandes.push(cmd);
            }
            if (row.produit_id) {
                cmd.produits.push({
                    id: row.produit_id,
                    nom: row.nom,
                    prix: row.prix,
                    quantite: row.quantite,
                });
            }
        });

        res.json(commandes); 
    });
};
exports.ajouterCommande = (req, res) => {
    const { userId, produitId, quantite } = req.body;

    if (!userId || !produitId || !quantite) {
        return res.status(400).json({ message: 'Champs manquants' });
    }

    // Récupérer le prix du produit
    bd.query(
        'SELECT prix FROM produits WHERE id = ?',
        [produitId],
        (err, result) => {
            if (err || result.length === 0) {
                return res.status(500).json({ message: 'Produit introuvable' });
            }

            const prixProduit = result[0].prix;
            const total = prixProduit * quantite;

            //  Insérer dans commandes
            bd.query(
                'INSERT INTO commandes (user_id, total) VALUES (?, ?)',
                [userId, total],
                (err, commandeResult) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).json({ message: 'Erreur création commande' });
                    }

                    const commandeId = commandeResult.insertId;

                    // Insérer dans commande_items
                    bd.query(
                        `INSERT INTO commande_items 
                         (commande_id, produit_id, quantite, prix)
                         VALUES (?, ?, ?, ?)`,
                        [commandeId, produitId, quantite, prixProduit],
                        (err) => {
                            if (err) {
                                console.error(err);
                                return res.status(500).json({ message: 'Erreur ajout produit' });
                            }

                            res.status(201).json({
                                message: 'Commande créée avec succès',
                                commandeId
                            });
                        }
                    );
                }
            );
        }
    );
};

// Lister les commandes pour l'utilisateur connecté
// Récupérer les commandes d'un client
exports.getCommandesClient = (req, res) => {
  const userId = req.user.id;

  bd.query(
    `SELECT c.id AS commande_id, c.total, c.statut, ci.produit_id, ci.quantite, p.nom, p.prix
     FROM commandes c
     LEFT JOIN commande_items ci ON c.id = ci.commande_id
     LEFT JOIN produits p ON ci.produit_id = p.id
     WHERE c.user_id = ?`,
    [userId],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Erreur serveur" });
      }

      // Grouper les produits par commande
      const commandes = [];
      results.forEach((row) => {
        let cmd = commandes.find((c) => c.id === row.commande_id);
        if (!cmd) {
          cmd = {
            id: row.commande_id,
            total: row.total,
            statut: row.statut,
            produits: [],
          };
          commandes.push(cmd);
        }
        if (row.produit_id) {
          cmd.produits.push({
            id: row.produit_id,
            nom: row.nom,
            prix: row.prix,
            quantite: row.quantite,
          });
        }
      });

      res.json(commandes);
    }
  );
};


// Modifier le statut d'une commande
exports.changerStatut =  async (req, res) => {
  const { id } = req.params;
  const { statut } = req.body;

  try {
    // Chercher la commande dans la base
    const commande = await Commande.findById(id);
    if (!commande) return res.status(404).json({ message: "Commande non trouvée" });

    // Mettre à jour le statut
    commande.statut = statut;
    await commande.save();

    res.json({ message: "Statut mis à jour", commande });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

