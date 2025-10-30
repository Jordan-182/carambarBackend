import "dotenv/config";
import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import sequelize from "../lib/db.ts";
import Joke, { JokeAttributes } from "../models/joke.model.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function seedDatabase() {
  try {
    console.log("🌱 Début du seeding de la base de données...");

    await sequelize.authenticate();
    console.log("✅ Connexion à la base de données réussie");

    // force:true is used to fully drop tables before recreating them, set it to false to avoid this
    await sequelize.sync({ force: true });
    console.log("✅ Tables synchronisées");

    const jokesPath = join(__dirname, "../data/jokes.json");
    const jokesData = readFileSync(jokesPath, "utf-8");
    const jokes: JokeAttributes[] = JSON.parse(jokesData);
    console.log(`📚 ${jokes.length} blagues trouvées dans jokes.json`);

    await Joke.bulkCreate(jokes);
    console.log(`✅ ${jokes.length} blagues ajoutées à la base de données`);

    console.log("🎉 Seeding terminé avec succès!");
  } catch (error) {
    console.error("❌ Erreur lors du seeding :", error);
    process.exit(1);
  } finally {
    await sequelize.close();
    console.log("🔐 Connexion fermée");
  }
}

seedDatabase().catch(console.error);

export default seedDatabase;
