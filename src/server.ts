import "dotenv/config";
import app from "./app";

// En production, Render fournit le port via process.env.PORT
// En développement, on utilise SERVER_PORT du .env
const port = process.env.PORT || process.env.SERVER_PORT || 3000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
