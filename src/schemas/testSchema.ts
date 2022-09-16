import joi from "joi";
import { INewTest } from "../types/testTypes";

export const newTestSchema = joi.object<INewTest>({
  name: joi.string().required(),
  pdfUrl: joi.string().uri().required(),
  categoryId: joi.number().required().strict(),
  disciplineId: joi.number().required().strict(),
  teacherId: joi.number().required().strict(),
});
