import joi from "joi";
import { INewUser, INewUserData } from "../types/userTypes";

export const signUpSchema = joi.object<INewUser>({
  email: joi.string().email().max(200).required(),
  password: joi.string().min(10).required(),
  confirmPassword: joi.string().required().valid(joi.ref("password")),
});

export const signInSchema = joi.object<INewUserData>({
  email: joi.string().email().max(200).required(),
  password: joi.string().required(),
});
