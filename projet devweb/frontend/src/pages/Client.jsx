import React, { useState, useEffect } from "react";
import "../assets/STY.css";

export default function Client() {
  const [sectionActive, setSectionActive] = useState("produits");
  const [produits, setProduits] = useState([]);
  const [panier, setPanier] = useState([]);
  const [commandes, setCommandes] = useState([]);
  const [profil, setProfil] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchProduits();
    fetchProfil();
    fetchCommandes();
  }, []);

  //  Récupérer les produits 
  const fetchProduits = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/produits");
      const data = await res.json();
      setProduits(data || []);
    } catch (err) {
      console.error("Erreur récupération produits:", err);
    }
  };

  // --- Récupérer le profil ---
  const fetchProfil = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setProfil(data || null);
    } catch (err) {
      console.error("Erreur récupération profil:", err);
      setProfil(null);
    }
  };

  // Récupérer les commandes
  const fetchCommandes = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/commandes/mes-commandes",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();
      // Assurer que commandes est toujours un tableau
      setCommandes(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Erreur récupération commandes:", err);
      setCommandes([]);
    }
  };

  //  Gestion du panier 
  const ajouterAuPanier = (produit) => {
    setPanier((prev) => {
      const exist = prev.find((p) => p.id === produit.id);
      if (exist) {
        return prev.map((p) =>
          p.id === produit.id ? { ...p, quantite: p.quantite + 1 } : p
        );
      }
      return [...prev, { ...produit, quantite: 1 }];
    });
  };

  const retirerDuPanier = (id) => {
    setPanier(panier.filter((p) => p.id !== id));
  };

  const montantTotal = panier.reduce(
    (acc, p) => acc + p.prix * p.quantite,
    0
  );

  //  Fonction de déconnexion 
const deconnexion = () => {
  localStorage.removeItem("token");
  window.location.href = "/connexion"; // redirige vers la page de connexion
};


  // Passer commande 
  const passerCommande = async () => {
    if (!panier.length) return alert("Le panier est vide !");
    if (!profil) return alert("Profil non chargé");

    try {
      for (let produit of panier) {
        const res = await fetch(
          "http://localhost:5000/api/commandes/ajouter",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              userId: profil.id,
              produitId: produit.id,
              quantite: produit.quantite,
            }),
          }
        );

        const data = await res.json();

        if (!res.ok) {
          console.error("Erreur commande:", data.message);
          alert(
            `Erreur lors de la commande pour ${produit.nom} : ${data.message}`
          );
          return;
        }
      }

      alert("Commande passée avec succès !");
      setPanier([]);
      fetchCommandes();
      setSectionActive("commandes");
    } catch (err) {
      console.error("Erreur lors de la commande:", err);
      alert("Erreur serveur lors de la commande");
    }
  };

  return (
    <>
      <header>
        <nav>
          <h1>📚 FournituresMarket - Espace Client</h1>
          <ul>
            <li onClick={() => setSectionActive("produits")}>Produits</li>
            <li onClick={() => setSectionActive("panier")}>🛒 {panier.length}</li>
            <li onClick={() => setSectionActive("commandes")}>Mes commandes</li>
            <li onClick={() => setSectionActive("profil")}>Profil</li>
             {token && (
            <li>
              <button onClick={deconnexion} className="btn-deconnexion">
              Déconnexion
              </button>
            </li>
      )}
          </ul>
        </nav>
      </header>

      <main>
        {/*  Produits  */}
        {sectionActive === "produits" && (
          <section>
            <h2>Produits disponibles</h2>
            <div className="produits-grid">
              {produits.map((p) => (
                <div key={p.id} className="produit-card">
                  <img src={`http://localhost:5000/uploads/produits/${p.image}`}
                                    alt={p.nom}
                                    width="150"
                                />
                  <h4>{p.nom}</h4>
                  <p>{p.description}</p>
                  <p>Prix : {p.prix} FCFA</p>
                  <button onClick={() => ajouterAuPanier(p)}>
                    Ajouter au panier
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/*  Panier  */}
        {sectionActive === "panier" && (
          <section>
            <h2>Mon panier</h2>
            {panier.length === 0 ? (
              <p>Panier vide</p>
            ) : (
              <div>
                {panier.map((p) => (
                  <div key={p.id} className="panier-item">
                    <p>
                      {p.nom} — {p.quantite} × {p.prix} = {p.quantite * p.prix} FCFA
                    </p>
                    <button onClick={() => retirerDuPanier(p.id)}>Supprimer</button>
                  </div>
                ))}
                <p>
                  <strong>Total :</strong> {montantTotal} FCFA
                </p>
                {profil ? (
                  <button onClick={passerCommande}>Passer commande</button>
                ) : (
                  <p>Chargement profil...</p>
                )}
              </div>
            )}
          </section>
        )}
        {/* Commandes  */}
{sectionActive === "commandes" && (
  <section>
    <h2>Mes commandes</h2>
    {Array.isArray(commandes) && commandes.length > 0 ? (
      <div className="commandes-grid">
        {commandes.map((c) => (
          <div className="commande-card" key={c.id}>
            <div className="commande-header">
              <p className="commande-numero">Commande #{c.id}</p>
              <span className={`statut ${
                c.statut === "Nouvelle" ? "statut-nouvelle" :
                c.statut === "En cours" ? "statut-en-cours" :
                c.statut === "Acceptée" ? "statut-acceptee" : ""
              }`}>{c.statut}</span>
            </div>
            <p><strong>Total :</strong> {c.total} FCFA</p>
            <ul className="commande-produits">
              {c.produits.map((p) => (
                <li key={p.id}>
                  {p.nom} x {p.quantite} — {p.prix} FCFA
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    ) : (
      <p className="aucune-commande">Aucune commande pour le moment</p>
    )}
  </section>
)}

{/*  Profil  */}
{sectionActive === "profil" && (
  <section>
    <h2>Mon profil</h2>
    {profil ? (
      <div className="profil-card">
        <p><strong>Nom :</strong> {profil.nom}</p>
        <p><strong>Email :</strong> {profil.email}</p>
        <p><strong>Téléphone :</strong> {profil.telephone}</p>
        <p><strong>Adresse :</strong> {profil.adresse}</p>
      </div>
    ) : (
      <p>Chargement...</p>
    )}
  </section>
)}

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
