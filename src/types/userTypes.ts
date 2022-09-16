import { Users } from "@prisma/client";

export type INewUser = Omit<Users, "id"> &{confirmPassword:string}
export type INewUserData = Omit<Users, "id">
