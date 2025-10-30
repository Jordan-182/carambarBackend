import { NextFunction, Request, Response } from "express";
import { JokeService } from "../services/joke.service.ts";
import { ApiResponse } from "../utils/response.utils.ts";

export class JokeController {
  /**
   * GET /jokes - Get all the jokes
   */
  static async getAllJokes(req: Request, res: Response, next: NextFunction) {
    try {
      const jokes = await JokeService.getAllJokes();
      return ApiResponse.success(res, jokes, "Blagues récupérées avec succès");
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /jokes/:id - Get one joke by its ID
   */
  static async getJokeById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        return ApiResponse.badRequest(res, "ID invalide");
      }

      const joke = await JokeService.getJokeById(id);

      if (!joke) {
        return ApiResponse.notFound(res, "Blague non trouvée");
      }

      return ApiResponse.success(res, joke, "Blague récupérée avec succès");
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /jokes/random - Get a random joke
   */
  static async getRandomJoke(req: Request, res: Response, next: NextFunction) {
    try {
      const joke = await JokeService.getRandomJoke();

      if (!joke) {
        return ApiResponse.notFound(res, "Aucune blague disponible");
      }

      return ApiResponse.success(res, joke, "Blague aléatoire récupérée");
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /jokes - Create a new joke
   */
  static async createJoke(req: Request, res: Response, next: NextFunction) {
    try {
      const { question, answer } = req.body;

      if (!question || !answer) {
        return ApiResponse.badRequest(res, "Question et réponse sont requises");
      }

      const joke = await JokeService.createJoke(question, answer);
      return ApiResponse.created(res, joke, "Blague créée avec succès");
    } catch (error) {
      next(error);
    }
  }

  /**
   * PUT /jokes/:id - Update a joke
   */
  static async updateJoke(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const { question, answer } = req.body;

      if (isNaN(id)) {
        return ApiResponse.badRequest(res, "ID invalide");
      }

      if (!question || !answer) {
        return ApiResponse.badRequest(res, "Question et réponse sont requises");
      }

      const joke = await JokeService.updateJoke(id, question, answer);

      if (!joke) {
        return ApiResponse.notFound(res, "Blague non trouvée");
      }

      return ApiResponse.success(res, joke, "Blague mise à jour avec succès");
    } catch (error) {
      next(error);
    }
  }

  /**
   * DELETE /jokes/:id - Delete a joke
   */
  static async deleteJoke(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        return ApiResponse.badRequest(res, "ID invalide");
      }

      const deleted = await JokeService.deleteJoke(id);

      if (!deleted) {
        return ApiResponse.notFound(res, "Blague non trouvée");
      }

      return ApiResponse.success(res, null, "Blague supprimée avec succès");
    } catch (error) {
      next(error);
    }
  }
}
