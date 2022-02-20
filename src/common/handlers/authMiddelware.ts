import { NextFunction, Request, Response } from "express";
import { HttpException } from "./httpException";
import * as dotenv from "dotenv";

dotenv.config();

export const authMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (request.headers?.["x-api-key"] === process.env.X_API_KEY) {
    next();
  } else {
    throw new HttpException(
      401,
      "Unauthorized : Access is denied. Invalid API Key was provided."
    );
  }
};
