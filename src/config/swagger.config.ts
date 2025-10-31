import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Carambar",
      version: "1.0.0",
      description: "API Carambar - Projet CDA",
    },
    servers: [
      {
        url: "http://localhost:3310/api",
        description: "Serveur de développement",
      },
    ],
    tags: [
      {
        name: "Blagues",
        description: "Gestion des blagues Carambar",
      },
    ],
  },
  apis: ["./src/routes/*.ts", "./src/models/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
