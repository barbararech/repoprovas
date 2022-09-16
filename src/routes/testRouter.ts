import { Router } from "express";
import { middleware } from "../middlewares/schemasValidationMiddleware";
import * as testController from "../controllers/testController";
import { newTestSchema } from "../schemas/testSchema";
import { tokenValidationMiddleware } from "../middlewares/authValidationMiddleware";

const router = Router();

router.post(
  "/tests",
  tokenValidationMiddleware,
  middleware(newTestSchema),
  testController.newTest
);

router.get(
  "/tests/disciplines",
  tokenValidationMiddleware,
  testController.getTestsByDiscipline
);

router.get(
  "/tests/teachers",
  tokenValidationMiddleware,
  testController.getTestsByTeacher
);

export default router;
