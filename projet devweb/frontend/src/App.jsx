import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Accueil from './pages/Accueil';
import Client from './pages/Client';
import Commercant from './pages/Commercant';
import Connexion from './pages/Connexion';
import Inscription from './pages/Inscription';

import './assets/css.css';

function App() {
  return (
    <Router>
      {/* <nav>
        <ul>
          <li><Link to="/">Accueil</Link></li>
          <li><Link to="/client">Client</Link></li>
          <li><Link to="/commercant">Commercant</Link></li>
          <li><Link to="/connexion">Connexion</Link></li>
          <li><Link to="/inscription">Inscription</Link></li>
        </ul>
      </nav> */}

      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/client" element={<Client />} />
        <Route path="/commercant" element={<Commercant />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/inscription" element={<Inscription />} />
      </Routes>
    </Router>
  );
}

export default App;
