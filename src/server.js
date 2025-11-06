const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// CORS : autoriser ton backend Render à communiquer
const allowedOrigins = ["https://ia-mdb-server.onrender.com"];
app.use(cors({ origin: allowedOrigins }));

// Servir les fichiers statiques (ton index.html et assets)
app.use(express.static(__dirname));

// Rediriger toutes les routes vers index.html
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
    console.log(`🚀 Frontend lancé sur le port ${PORT}`);
});
