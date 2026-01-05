import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import'../assets/css.css'

export default function Accueil() {
    const [produits, setProduits] = useState([]);
    const [stats, setStats] = useState({});

    useEffect(() => {
        fetch("http://localhost:5000/api/public/accueil")
            .then(res => res.json())
            .then(data => {
                setProduits(data.produits || []);
                setStats(data.stats || {});
            });
    }, []);

    return (
        <>
            <header>
                <nav>
                    <h1>📚 FournituresMarket</h1>
                    <ul>
                        <li><Link to="/">Accueil</Link></li>
                        <li><Link to="/connexion">Se connecter</Link></li>
                        <li><Link to="/inscription">S'inscrire</Link></li>
                    </ul>
                </nav>
            </header>

            <main>
                {/* HERO */}
                <section className="hero">
                    <h2>Votre marketplace de fournitures scolaires et de bureau</h2>
                    <p>Achetez et vendez vos fournitures en toute simplicité</p>

                    <div className="cta-buttons">
                        <Link to="/inscription" className="btn-primary">Je veux acheter</Link>
                        <Link to="/inscription" className="btn-secondary">Je veux vendre</Link>
                    </div>
                </section>

                {/* PRODUITS */}
                <section className="produits">
                    <h3>Produits populaires</h3>
                    <div className="produits-grid">
                        {produits.map(p => (
                            <div key={p.id} className="produit-card">
                                 <img src={`http://localhost:5000/uploads/produits/${p.image}`}
                                    alt={p.nom}
                                    width="150"
                                />
                                <h4>{p.nom}</h4>
                                <p>{p.prix} FCFA</p>
                            </div>
                        ))}
                    </div>
                </section>
                <section class="avantages">
            <h3>Pourquoi nous choisir ?</h3>
            
            <div class="avantages-grid">
                <div class="avantage-card">
                    <h4>Pour les acheteurs</h4>
                    <ul>
                        <li>Large choix de fournitures scolaires et de bureau</li>
                        <li>Prix compétitifs</li>
                        <li>Livraison rapide à domicile</li>
                        <li>Produits de qualité vérifiés</li>
                    </ul>
                </div>
                
                <div class="avantage-card">
                    <h4>Pour les vendeurs</h4>
                    <ul>
                        <li>Inscription gratuite</li>
                        <li>Gestion simplifiée de vos stocks</li>
                        <li>Visibilité accrue auprès des étudiants</li>
                        <li>Outils de vente intégrés</li>
                    </ul>
                </div>
            </div>
        </section>

        <section class="categories">
            <h3>Catégories de fournitures</h3>
            
            <div class="categories-grid">
                <div class="categorie">📓 Cahiers & Blocs</div>
                <div class="categorie">✏️ Stylos & Crayons</div>
                <div class="categorie">📐 Matériel de géométrie</div>
                <div class="categorie">🎨 Arts & Loisirs créatifs</div>
                <div class="categorie">📚 Livres scolaires</div>
                <div class="categorie">🎒 Sacs & Cartables</div>
            </div>
        </section>

        <section class="statistiques">
            <h3>Nos chiffres</h3>
            
            <div class="stats-grid">
                <div class="stat">
                    <strong>5,000+</strong>
                    <p>Clients satisfaits</p>
                </div>
                <div class="stat">
                    <strong>200+</strong>
                    <p>Vendeurs de fournitures</p>
                </div>
                <div class="stat">
                    <strong>15,000+</strong>
                    <p>Fournitures disponibles</p>
                </div>
            </div>
        </section>

                {/* STATISTIQUES
                <section className="statistiques">
                    <h3>Nos chiffres</h3>
                    <div className="stats-grid">
                        <div className="stat">
                            <strong>{stats.users || 0}</strong>
                            <p>Utilisateurs</p>
                        </div>
                        <div className="stat">
                            <strong>{stats.produits || 0}</strong>
                            <p>Fournitures</p>
                        </div>
                        <div className="stat">
                            <strong>{stats.commandes || 0}</strong>
                            <p>Commandes</p>
                        </div>
                    </div>
                </section> */}
            </main>
            <footer className="footer">
                <div className="footer-container">

                {/* Colonne 1 : À propos */}
                <div className="footer-col">
                    <h3>📚 FournituresMarket</h3>
                    <p>
                         Plateforme de vente de fournitures scolaires et universitaires.
                        Achetez facilement auprès des commerçants locaux.
                    </p>
                </div>

                {/* Colonne 2 : Liens rapides */}
                <div className="footer-col">
                    <h4>Liens rapides</h4>
                    <ul>
                        <li><a href="/">Accueil</a></li>
                        <li><a href="/produits">Produits</a></li>
                        <li><a href="/inscription">Inscription</a></li>
                        <li><a href="/connexion">Connexion</a></li>
                    </ul>
                </div>

                {/* Colonne 3 : Contact */}
                <div className="footer-col">
                    <h4>Contact</h4>
                    <p>📍 Cameroun</p>
                    <p>📞 +237 679 14 15 98</p>
                    <p>✉️ kamertechsolutions@gmail.com</p>
                </div>

                {/* Colonne 4 : Réseaux sociaux */}
                <div className="footer-col">
                    <h4>Suivez-nous</h4>
                    <div className="social-icons">
                        <a href="#" title="Facebook">📘</a>
                        <a href="#" title="WhatsApp">💬</a>
                        <a href="#" title="Instagram">📸</a>
                    </div>
                </div>

                </div>

                <div className="footer-bottom">
                    <p>
                        © {new Date().getFullYear()} FournituresMarket — Tous droits réservés.
                    </p>
                </div>
    
            </footer>
        </>
    );
}
