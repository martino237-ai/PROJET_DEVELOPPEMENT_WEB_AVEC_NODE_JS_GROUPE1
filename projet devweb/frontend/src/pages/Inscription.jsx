import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../assets/css.css";

export default function Inscription() {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [adresse, setAdresse] = useState("");
  const [typeCompte, setTypeCompte] = useState("");
  const [nomEntreprise, setNomEntreprise] = useState("");
  const [siret, setSiret] = useState("");
  const [descriptionActivite, setDescriptionActivite] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    //  Sécurités frontend
    if (!typeCompte) {
      setMessage("Veuillez choisir un type de compte");
      return;
    }

    if (password !== passwordConfirm) {
      setMessage("Les mots de passe ne correspondent pas");
      return;
    }

    // Données envoyées au backend
    const userData = {
      nom,
      prenom,
      email,
      telephone,
      password,
      adresse,
      role: typeCompte,
      ...(typeCompte === "commercant" && {
        nomEntreprise,
        siret,
        descriptionActivite
      })
    };

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
      });

      
      const text = await res.text();
      let data;

      try {
        data = JSON.parse(text);
      } catch (err) {
        console.error("Réponse non JSON du serveur :", text);
        setMessage("Erreur serveur interne");
        return;
      }

      if (res.ok) {
        setMessage("Inscription réussie ! Redirection...");
        setTimeout(() => navigate("/connexion"), 1000);
      } else {
        setMessage(data.message || "Erreur lors de l'inscription");
      }
    } catch (err) {
      console.error("Erreur réseau :", err);
      setMessage("Impossible de contacter le serveur");
    }
  };

  return (
    <>
      <header>
        <nav>
          <h1>📚 FournituresMarket</h1>
          <Link to="/">Retour à l'accueil</Link>
        </nav>
      </header>

      <main>
        <section className="inscription-container">
          <h2>S'inscrire</h2>
          {message && <p className="message">{message}</p>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Type de compte *</label>
              <select
                value={typeCompte}
                onChange={(e) => setTypeCompte(e.target.value)}
                required
              >
                <option value="">Choisissez...</option>
                <option value="client">Client</option>
                <option value="commercant">Commerçant</option>
              </select>
            </div>

            <div className="form-group">
              <label>Nom *</label>
              <input
                type="text"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Prénom *</label>
              <input
                type="text"
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Téléphone *</label>
              <input
                type="tel"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Adresse *</label>
              <textarea
                value={adresse}
                onChange={(e) => setAdresse(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Mot de passe *</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Confirmer mot de passe *</label>
              <input
                type="password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                required
              />
            </div>

            {/* Champs commerçant */}
            {typeCompte === "commercant" && (
              <>
                <div className="form-group">
                  <label>Nom entreprise *</label>
                  <input
                    type="text"
                    value={nomEntreprise}
                    onChange={(e) => setNomEntreprise(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>SIRET *</label>
                  <input
                    type="text"
                    value={siret}
                    onChange={(e) => setSiret(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Description activité *</label>
                  <textarea
                    value={descriptionActivite}
                    onChange={(e) =>
                      setDescriptionActivite(e.target.value)
                    }
                    required
                  />
                </div>
              </>
            )}

            <div className="form-group checkbox-group">
              <input type="checkbox" required />
              <label>J'accepte les conditions générales</label>
            </div>

            <button type="submit" className="btn-primary">
              Créer mon compte
            </button>
          </form>

          <p>
            Vous avez déjà un compte ?{" "}
            <Link to="/connexion">Se connecter</Link>
          </p>
        </section>
      </main>

      <footer>
        <p>© 2025 FournituresMarket. Tous droits réservés.</p>
      </footer>
    </>
  );
}
