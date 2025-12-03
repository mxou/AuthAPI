//==========================
// Requires des dependances
//==========================
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Crée l'app express
const app = express();
// Permet a express de comprendre les datas json des req POST
app.use(express.json());

let users = [];

//==========================
// Register endpoint
//==========================

app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  // Vérifie si le user existe déja
  if (users.find((u) => u.email === email)) {
    return res.status(400).json({ error: "Email déja utilisé !" });
  }

  // Hash du password (await = attends la fin du hashage avant de continuer)
  const hashed = await bcrypt.hash(password, 10);

  const user = { id: Date.now(), email, password: hashed };
  users.push(user);

  req.json({ message: "Utilisateur crée" });
});
