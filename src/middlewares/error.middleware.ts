import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "../utils/response.utils.ts";

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Error:", error);

  // Sequelize errors
  if (error.name === "SequelizeValidationError") {
    return ApiResponse.badRequest(res, "Données invalides");
  }

  if (error.name === "SequelizeUniqueConstraintError") {
    return ApiResponse.badRequest(res, "Cette ressource existe déjà");
  }

  // Default error
  return ApiResponse.serverError(res, "Une erreur inattendue s'est produite");
};
