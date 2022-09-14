import * as userRepository from "../repositories/userRepository";
import { INewUser } from "../types/userTypes";

export async function insertNewUser(user: INewUser) {
  await userRepository.insertNewUser(user);

  return;
}

export async function userIsAlreadyRegistered(email: string) {
  const user = await userRepository.findUserByEmail(email);

  if (user) {
    throw { status: 409, message: "This user is already registered!" };
  }

  return;
}

export async function findUserByEmail(email: string) {
  const user = await userRepository.findUserByEmail(email);

  if (!user) {
    throw { status: 404, message: "This user isn't registered!" };
  }

  return user;
}

export async function findUserById(id: number) {
  const user = await userRepository.findUserById(id);

  if (!user) {
    throw { status: 404, message: "This user isn't registered!" };
  }

  return user;
}
