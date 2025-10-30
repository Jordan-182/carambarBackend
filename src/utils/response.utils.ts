import { Response } from "express";

export interface ApiResponseData<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export class ApiResponse {
  /**
   * Success response (200)
   */
  static success<T>(
    res: Response,
    data: T,
    message: string = "Succès"
  ): Response {
    return res.status(200).json({
      success: true,
      message,
      data,
    });
  }

  /**
   * Created response (201)
   */
  static created<T>(
    res: Response,
    data: T,
    message: string = "Créé avec succès"
  ): Response {
    return res.status(201).json({
      success: true,
      message,
      data,
    });
  }

  /**
   * Bad request response (400)
   */
  static badRequest(
    res: Response,
    message: string = "Requête invalide"
  ): Response {
    return res.status(400).json({
      success: false,
      message,
      error: "BAD_REQUEST",
    });
  }

  /**
   * Not found response (404)
   */
  static notFound(
    res: Response,
    message: string = "Ressource non trouvée"
  ): Response {
    return res.status(404).json({
      success: false,
      message,
      error: "NOT_FOUND",
    });
  }

  /**
   * Server error (500)
   */
  static serverError(
    res: Response,
    message: string = "Erreur interne du serveur"
  ): Response {
    return res.status(500).json({
      success: false,
      message,
      error: "INTERNAL_SERVER_ERROR",
    });
  }
}
