const bd = require('../bd');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET || "cle_temporaire";
const middlewareAuth = require('./authMiddleware');

/* INSCRIPTION UTILISATEUR*/ 
exports.register = (req, res) => {
  const {
    nom,
    prenom,
    email,
    telephone,
    password,
    adresse,
    role,
    nomEntreprise,
    siret,
    descriptionActivite
  } = req.body;

  if (!nom || !email || !telephone || !password || !adresse || !role) {
    return res.status(400).json({ message: "Champs obligatoires manquants" });
  }

  const rolesAutorises = ["client", "commercant"];
  if (!rolesAutorises.includes(role)) {
    return res.status(400).json({ message: "Rôle invalide" });
  }

  if (role === "commercant" && (!nomEntreprise || !siret)) {
    return res.status(400).json({ message: "Infos commerçant obligatoires" });
  }

  bd.query(
    "SELECT id FROM users WHERE email = ?",
    [email],
    async (err, rows) => {
      if (err) {
        console.error("Erreur SELECT :", err);
        return res.status(500).json({ message: "Erreur serveur" });
      }

      if (rows.length > 0) {
        return res.status(409).json({ message: "Email déjà utilisé" });
      }

      try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = {
          nom,
          prenom,
          email,
          telephone,
          password: hashedPassword,
          adresse,
          role,
          nomEntreprise: role === "commercant" ? nomEntreprise : null,
          siret: role === "commercant" ? siret : null,
          descriptionActivite: role === "commercant" ? descriptionActivite : null
        };

        bd.query("INSERT INTO users SET ?", newUser, (err, result) => {
          if (err) {
            console.error("Erreur INSERT :", err);
            return res.status(500).json({ message: "Erreur serveur" });
          }

          res.status(201).json({
            message: "Inscription réussie",
            userId: result.insertId
          });
        });
      } catch (error) {
        console.error("Erreur bcrypt :", error);
        res.status(500).json({ message: "Erreur serveur" });
      }
    }
  );
};

/* CONNEXION UTILISATEUR*/
exports.login = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password)
        return res.status(400).json({ message: "Champs manquants" });

    bd.query("SELECT * FROM users WHERE email = ?", [email], async (err, rows) => {
        if (err) return res.status(500).json({ message: "Erreur serveur" });

        if (rows.length === 0)
            return res.status(401).json({ message: "Email ou mot de passe incorrect" });

        const user = rows[0];

        // Vérification du mot de passe
        const match = await bcrypt.compare(password, user.password);
        if (!match)
            return res.status(401).json({ message: "Email ou mot de passe incorrect" });

        // Génération du token
        const token = jwt.sign(
            { userId: user.id, role: user.role },
            secretKey,
            { expiresIn: "1h" }
        );

        res.status(200).json({
            message: "Connexion réussie",
            token,
            user: {
                id: user.id,
                nom: user.nom,
                email: user.email,
                role: user.role
            }
        });
    });
};

// Récupérer le profil de l'utilisateur connecté
exports.getProfil = (req, res) => {
  const userId = req.user.id;

  bd.query(
    "SELECT id, nom, prenom, email, telephone, adresse, role FROM users WHERE id = ?",
    [userId],
    (err, result) => {
      if (err) {
        console.error("Erreur récupération profil :", err);
        return res.status(500).json({ message: "Erreur serveur" });
      }

      if (result.length === 0)
        return res.status(404).json({ message: "Utilisateur non trouvé" });

      res.json(result[0]);
    }
  );
};