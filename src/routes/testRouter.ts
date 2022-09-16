import { Router } from "express";
import { middleware } from "../middlewares/schemasValidationMiddleware";
import * as authController from "../controllers/testController";
import { newTestSchema } from "../schemas/testSchema";
import { tokenValidationMiddleware } from "../middlewares/authValidationMiddleware";

const router = Router();

router.post(
  "/tests",
  tokenValidationMiddleware,
  middleware(newTestSchema),
  authController.newTest
);

export default router;
