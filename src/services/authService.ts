import * as userService from "../services/userService";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Users } from "@prisma/client";
import { INewUser } from "../types/userTypes";

export async function signUp(email: string, password: string) {
  const passwordCrypt = bcrypt.hashSync(password, 10);
  const user = { email, password: passwordCrypt };

  await userService.userIsAlreadyRegistered(email);
  await userService.insertNewUser(user);

  return;
}

export async function signIn(email: string, password: string) {
  const user = await userService.findUserByEmail(email);
  await checkPassword(user, password);

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string);
  return token;
}

export async function checkPassword(user: Users, password: string) {
  const checkPassword = bcrypt.compareSync(password, user.password);

  if (!checkPassword) {
    throw {
      status: 401,
      message: "Unauthorized!",
    };
  }

  return;
}
