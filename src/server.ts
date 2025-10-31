import "dotenv/config";
import app from "./app";
import sequelize from "./lib/db.js";
import "./models/joke.model.js"; // Import pour enregistrer le modèle

// En production, Render fournit le port via process.env.PORT
// En développement, on utilise SERVER_PORT du .env
const port = process.env.PORT || process.env.SERVER_PORT || 3000;

async function startServer() {
  try {
    // Vérifier la connexion à la base de données
    await sequelize.authenticate();
    console.log("✅ Connexion à la base de données réussie");

    // Synchroniser les modèles (créer les tables si elles n'existent pas)
    await sequelize.sync();
    console.log("✅ Tables synchronisées");

    app.listen(port, () => {
      console.log(`🚀 Serveur démarré sur le port ${port}`);
    });
  } catch (error) {
    console.error("❌ Erreur lors du démarrage du serveur:", error);
    process.exit(1);
  }
}

startServer();
