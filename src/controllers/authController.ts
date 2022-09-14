import { Request, Response } from "express";
import * as authService from "../services/authService";

export async function signUp(req: Request, res: Response) {
  const { email, password, confirmPassword }: { email: string; password: string, confirmPassword: string } = req.body;

  await authService.signUp(email, password);
  return res.status(201).send("User registered successfully!");
}

export async function signIn(req: Request, res: Response) {
  const { email, password }: { email: string; password: string } = req.body;

  const token = await authService.signIn(email, password);
  return res.status(200).send({ token });
}
