import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🌐 CORS : autorise ton backend Render
const allowedOrigins = [
    "https://ia-mdb-server.onrender.com", // ton backend Render
];
app.use(cors({ origin: allowedOrigins }));

// 📦 Servir les fichiers statiques
app.use(express.static(path.join(__dirname, "public")));

// 🧭 Rediriger toutes les routes vers index.html (SPA compatible)
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// 🚀 Lancer le serveur
app.listen(PORT, () => {
    console.log(`✅ Frontend actif sur le port ${PORT}`);
    console.log(`🌍 Accès : http://localhost:${PORT}`);
});
