import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Pour Render : cherche les fichiers statiques dans le bon répertoire
const PUBLIC_DIR = join(__dirname, "public");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(join(__dirname, "../public")));

// Routes
app.get("/", (req, res) => {
    res.sendFile(join(__dirname, "../public/index.html"));
});

// Route API de test
app.get("/api/health", (req, res) => {
    res.json({ status: "✅ Serveur MDB actif", timestamp: new Date() });
});

// Gestion des erreurs 404
app.use((req, res) => {
    res.status(404).json({ error: "Route non trouvée" });
});

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`🚀 Serveur MDB lancé sur http://localhost:${PORT}`);
    console.log(`📦 Mode: ${process.env.NODE_ENV || "development"}`);
});