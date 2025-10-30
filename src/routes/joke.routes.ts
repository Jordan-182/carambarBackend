import { Router } from "express";
import { JokeController } from "../controllers/joke.controller.ts";

const router = Router();

/**
 * @swagger
 * /jokes:
 *   get:
 *     summary: Récupère toutes les blagues
 *     tags: [Jokes]
 *     responses:
 *       200:
 *         description: Liste des blagues
 */
router.get("/", JokeController.getAllJokes);

/**
 * @swagger
 * /jokes/random:
 *   get:
 *     summary: Récupère une blague aléatoire
 *     tags: [Jokes]
 *     responses:
 *       200:
 *         description: Blague aléatoire
 */
router.get("/random", JokeController.getRandomJoke);

/**
 * @swagger
 * /jokes/{id}:
 *   get:
 *     summary: Récupère une blague par ID
 *     tags: [Jokes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Blague trouvée
 *       404:
 *         description: Blague non trouvée
 */
router.get("/:id", JokeController.getJokeById);

/**
 * @swagger
 * /jokes:
 *   post:
 *     summary: Crée une nouvelle blague
 *     tags: [Jokes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *               answer:
 *                 type: string
 *     responses:
 *       201:
 *         description: Blague créée
 */
router.post("/", JokeController.createJoke);

/**
 * @swagger
 * /jokes/{id}:
 *   put:
 *     summary: Met à jour une blague
 *     tags: [Jokes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *               answer:
 *                 type: string
 *     responses:
 *       200:
 *         description: Blague mise à jour
 *       404:
 *         description: Blague non trouvée
 */
router.put("/:id", JokeController.updateJoke);

/**
 * @swagger
 * /jokes/{id}:
 *   delete:
 *     summary: Supprime une blague
 *     tags: [Jokes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Blague supprimée
 *       404:
 *         description: Blague non trouvée
 */
router.delete("/:id", JokeController.deleteJoke);

export default router;
