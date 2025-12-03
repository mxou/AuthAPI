//==========================
// Requires des dependances
//==========================
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Clé temporaire
const KEY = "2212429391";

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

//==========================
// Login endpoint
//==========================

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u.email === email);
  if (!user) return res.status(400).json({ error: "Utilisateur non trouvé" });

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return res.status(400).json({ error: "Mot de passe incorrect" });

  const token = jwt.sign({ id: user.id, email: user.email }, KEY, {
    expiresIn: "1h",
  });

  res.json({ token });
});

//==========================
// Middleware
//==========================

function auth(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ error: "Token manquant" });

  // Pour récuperer uniquement le token
  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, KEY);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: "Token invalide" });
  }
}
