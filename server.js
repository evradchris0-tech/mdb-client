import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Chemin vers le dossier public (relatif au server.js)
const PUBLIC_DIR = join(__dirname, "public");

console.log(`📁 Chemin public: ${PUBLIC_DIR}`);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(PUBLIC_DIR));

// Route par défaut
app.get("/", (req, res) => {
    res.sendFile(join(PUBLIC_DIR, "index.html"));
});

// Route API de test
app.get("/api/health", (req, res) => {
    res.json({
        status: "✅ Serveur MDB actif",
        timestamp: new Date(),
        environment: process.env.NODE_ENV || "production"
    });
});

// Gestion des erreurs 404
app.use((req, res) => {
    res.status(404).json({ error: "Route non trouvée" });
});

// Démarrage du serveur
const server = app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Serveur MDB lancé sur http://0.0.0.0:${PORT}`);
    console.log(`📦 Mode: ${process.env.NODE_ENV || "production"}`);
    console.log(`✅ Fichiers statiques servis depuis: ${PUBLIC_DIR}`);
});