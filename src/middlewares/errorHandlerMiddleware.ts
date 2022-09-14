import { NextFunction, Request, Response } from "express";
import * as ErrorTypes from "../types/errorTypes";

export default async function errorHandler(
  error: ErrorTypes.Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  return res
    .status(error.status || 500)
    .send(error.message || "Internal server error");
}
