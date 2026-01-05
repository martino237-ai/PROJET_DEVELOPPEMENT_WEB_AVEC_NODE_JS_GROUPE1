const express = require("express");
const router = express.Router();
const auth = require("../controllers/authMiddleware");
const bd = require("../bd");

router.get("/", auth, (req, res) => {
  bd.query(
    "SELECT nom, prenom, email, telephone, adresse, nomEntreprise FROM users WHERE id=?",
    [req.user.id],
    (err, rows) => {
      if (err) return res.status(500).json(err);
      res.json(rows[0]);
    }
  );
});

module.exports = router;
