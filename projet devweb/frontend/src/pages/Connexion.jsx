import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../assets/css.css";

export default function Connexion() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Tous les champs sont obligatoires");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Identifiants incorrects");
        return;
      }

      // Stockage du token
      localStorage.setItem("token", data.token);
      localStorage.setItem("userRole", data.user.role);
      localStorage.setItem("userName", data.user.nom);

      // Redirection AUTOMATIQUE selon rôle venant du backend
      if (data.user.role === "client") {
        navigate("/client");
      } else if (data.user.role === "commercant") {
        navigate("/commercant");
      } else {
        navigate("/");
      }

    } catch (err) {
      console.error(err);
      setMessage("Erreur serveur");
    }
  };

  return (
    <>
      <header>
        <nav>
          <h1>📚 FournituresMarket</h1>
          <ul>
            <li><Link to="/">Retour à l'accueil</Link></li>
          </ul>
        </nav>
      </header>

      <main>
        <section className="connexion-container">
          <h2>Se connecter</h2>

          {message && <p style={{ color: "red" }}>{message}</p>}

          <form id="form-connexion" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="exemple@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Mot de passe</label>
              <input
                type="password"
                placeholder="Votre mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn-primary">Se connecter</button>
          </form>

          <div className="separateur">
            <p>Vous n'avez pas de compte ?</p>
          </div>

          <Link to="/inscription" className="btn-secondary">S'inscrire</Link>
        </section>
      </main>

      <footer>
        <p>© 2025 FournituresMarket. Tous droits réservés.</p>
      </footer>
    </>
  );
}
