import "dotenv/config";
import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import app from "./app";
import sequelize from "./lib/db.js";
import Joke, { JokeAttributes } from "./models/joke.model.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// En production, Render fournit le port via process.env.PORT
// En développement, on utilise SERVER_PORT du .env
const port = process.env.PORT || process.env.SERVER_PORT || 3000;

async function seedDatabaseIfEmpty() {
  try {
    // Vérifier si la base contient déjà des données
    const jokeCount = await Joke.count();

    if (jokeCount === 0) {
      console.log("🌱 Base de données vide, début du seeding...");

      const jokesPath = join(__dirname, "data/jokes.json");
      const jokesData = readFileSync(jokesPath, "utf-8");
      const jokes: JokeAttributes[] = JSON.parse(jokesData);
      console.log(`📚 ${jokes.length} blagues trouvées dans jokes.json`);

      await Joke.bulkCreate(jokes);
      console.log(`✅ ${jokes.length} blagues ajoutées à la base de données`);
    } else {
      console.log(
        `✅ Base de données déjà alimentée avec ${jokeCount} blagues`
      );
    }
  } catch (error) {
    console.error("❌ Erreur lors du seeding:", error);
    throw error;
  }
}

async function startServer() {
  try {
    // Vérifier la connexion à la base de données
    await sequelize.authenticate();
    console.log("✅ Connexion à la base de données réussie");

    // Synchroniser les modèles (créer les tables si elles n'existent pas)
    await sequelize.sync();
    console.log("✅ Tables synchronisées");

    // Alimenter la base de données si elle est vide
    await seedDatabaseIfEmpty();

    app.listen(port, () => {
      console.log(`🚀 Serveur démarré sur le port ${port}`);
    });
  } catch (error) {
    console.error("❌ Erreur lors du démarrage du serveur:", error);
    process.exit(1);
  }
}

startServer();
