const express = require('express');
const cors = require('cors');
const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // IMPORTANT pour lire req.body JSON

// Connexion BD
const bd = require('./bd');

// Import des routes
const produitsRoutes = require('./routes/produits');
const commandesRoutes = require('./routes/commandes');
const authRoutes = require('./routes/auth');
const publicRoutes = require('./routes/public');
const profilRoutes = require('./routes/profil');
const path=require('path')


// Utilisation des routes
app.use('/api/profil', profilRoutes);
app.use('/api/public', publicRoutes);
app.use('/api/produits', produitsRoutes);
app.use('/api/commandes', commandesRoutes);
app.use('/api/auth', authRoutes);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
