import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import * as AuthTypes from "../types/authTypes";

export async function tokenValidationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authorization = req.headers.authorization;
  const token = authorization?.replace("Bearer ", "").trim();

  if (!token) {
    throw {
      status: 401,
      message: "Unauthorized!",
    };
  }

  const { id } = jwt.verify(
    token,
    process.env.JWT_SECRET as string
  ) as AuthTypes.JwtPayload;

  res.locals.id = id;
  next();
}
