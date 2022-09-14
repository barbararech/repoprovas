import { Users } from "@prisma/client";

export type INewUser = Omit<Users, "id"> 
