import cors from "cors";
import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.config.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import jokeRoutes from "./routes/joke.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.get("/", (req, res) => {
  res.json({
    message: "API Carambar - CDA Project",
    version: "1.0.0",
    endpoints: {
      jokes: "/api/jokes",
      randomJoke: "/api/jokes/random",
      swagger: "/api-docs",
    },
  });
});

// Swagger Doc
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customCss: ".swagger-ui .topbar { display: none }",
    customSiteTitle: "🎭 API Carambar - Documentation",
  })
);

// API Routes
app.use("/api/jokes", jokeRoutes);

// Error handling middleware
app.use(errorHandler);

export default app;
