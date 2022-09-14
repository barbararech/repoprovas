import client from "../dbStrategy/database";
import { INewUser } from "../types/userTypes";

export async function findUserByEmail(email: string) {
  return client.users.findFirst({
    where: { email },
  });
}

export async function findUserById(id: number) {
  return client.users.findFirst({
    where: { id },
  });
}

export async function insertNewUser(user: INewUser) {
  return client.users.create({
    data: user,
  });
}
