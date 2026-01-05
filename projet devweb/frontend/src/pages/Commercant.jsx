import React, { useState, useEffect } from "react";
import "../assets/css.css";

export default function Commercant() {
  const [fournitures, setFournitures] = useState([]);
  const [commandes, setCommandes] = useState([]);
  const [sectionActive, setSectionActive] = useState("fournitures");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchFournitures();
    fetchCommandes();
  }, []);

  //  FOURNITURES 
  const fetchFournitures = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/produits", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setFournitures(data);
    } catch (err) {
      console.error("Erreur fournitures:", err);
    }
  };

  const ajouterProduit = async (produit) => {
    try {
      const res = await fetch("http://localhost:5000/api/produits/ajouter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(produit),
      });
      const data = await res.json();
      
      setFournitures([...fournitures, { ...produit, id: data.produitId }]);
    } catch (err) {
      console.error("Erreur ajout produit:", err);
    }
  };

  const supprimerProduit = async (id) => {
    if (!window.confirm("Supprimer ce produit ?")) return;

    try {
      await fetch(`http://localhost:5000/api/produits/supprimer/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setFournitures(fournitures.filter((f) => f.id !== id));
    } catch (err) {
      console.error("Erreur suppression:", err);
    }
  };

  const modifierProduit = async (produit) => {
    const nom = prompt("Nom :", produit.nom);
    const prix = prompt("Prix :", produit.prix);
    const stock = prompt("Stock :", produit.stock);

    if (!nom || !prix || !stock) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/produits/modifier/${produit.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            nom,
            prix: Number(prix),
            stock: Number(stock),
          }),
        }
      );
      await res.json();
      // Mise à jour locale
      setFournitures(
        fournitures.map((f) =>
          f.id === produit.id ? { ...f, nom, prix: Number(prix), stock: Number(stock) } : f
        )
      );
    } catch (err) {
      console.error("Erreur modification:", err);
    }
  };

  //  COMMANDES 
  const fetchCommandes = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/commandes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setCommandes(data);
    } catch (err) {
      console.error("Erreur commandes:", err);
    }
  };

  const changerStatutCommande = async (commandeId, statut) => {
    try {
      await fetch(
        `http://localhost:5000/api/commandes/${commandeId}/statut`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ statut }),
        }
      );
      fetchCommandes();
    } catch (err) {
      console.error(err);
    }
  };

  //  DECONNEXION 
  const deconnexion = () => {
    localStorage.removeItem("token");
    window.location.href = "/connexion";
  };

  return (
    <>
      <header>
        <nav className="navbar">
          <h1>📚 FournituresMarket - Espace Vendeur</h1>
          <ul>
            <li onClick={() => setSectionActive("fournitures")}>Mes fournitures</li>
            <li onClick={() => setSectionActive("commandes")}>Commandes</li>
            <li onClick={() => setSectionActive("ajouterproduit")}>Ajouter produit</li>
            <li>
              <button onClick={deconnexion} className="btn-deconnexion">
                Déconnexion
              </button>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        {/* FOURNITURES */}
        {sectionActive === "fournitures" && (
          <section className="produits">
            <h2>Mes fournitures</h2>
            <div className="produits-grid">
              {fournitures.map((f, index) => (
                <div className="card" key={f.id || index}>
                  <img
                    src={`http://localhost:5000/uploads/produits/${f.image}`}
                    alt={f.nom}
                  />
                  <h4>{f.nom}</h4>
                  <p>{f.description}</p>
                  <p>Prix : {f.prix} FCFA</p>
                  <p>Stock : {f.stock}</p>
                  <div className="produit-actions">
                    <button
                      className="btn-primary"
                      onClick={() => modifierProduit(f)}
                    >
                      ✏️ Modifier
                    </button>
                    <button
                      className="btn-supprimer"
                      onClick={() => supprimerProduit(f.id)}
                    >
                      🗑 Supprimer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* COMMANDES  */}
        {sectionActive === "commandes" && (
          <section>
            <h2>Commandes reçues</h2>
            {commandes.length > 0 ? (
              commandes.map((c, index) => (
                <div className="commande-card" key={c.id || index}>
                  <p>Commande #{c.id}</p>
                  <p>Total : {c.total} FCFA</p>
                  <p>Statut : {c.statut}</p>
                  <button
                    className="btn-primary"
                    onClick={() => changerStatutCommande(c.id, "acceptée")}
                  >
                    Accepter
                  </button>
                  <button
                    className="btn-supprimer"
                    onClick={() => changerStatutCommande(c.id, "refusée")}
                  >
                    Refuser
                  </button>
                </div>
              ))
            ) : (
              <p>Aucune commande pour le moment</p>
            )}
          </section>
        )}

        {/* ---------- AJOUT PRODUIT ---------- */}
        {sectionActive === "ajouterproduit" && (
          <section>
            <h2>Ajouter un produit</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                ajouterProduit({
                  nom: e.target.nom.value,
                  description: e.target.description.value,
                  prix: Number(e.target.prix.value),
                  stock: Number(e.target.stock.value),
                  categorie: e.target.categorie.value,
                  image: e.target.image.value,
                });
                e.target.reset();
              }}
            >
              <input name="nom" placeholder="Nom" required />
              <input name="description" placeholder="Description" required />
              <input name="prix" type="number" placeholder="Prix" required />
              <input name="stock" type="number" placeholder="Stock" required />
              <input name="categorie" placeholder="Catégorie" required />
              <input name="image" placeholder="Image (URL)" />
              <button className="btn-primary">Ajouter</button>
            </form>
          </section>
        )}
      </main>
    </>
  );
}
