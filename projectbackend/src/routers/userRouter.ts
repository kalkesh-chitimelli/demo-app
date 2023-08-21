import { Router } from "express";
import {
  registerUserController,
  loginUserController,
  userByEmailController,
} from "../controller/userController";
import { authenticate } from "../middleware/authentication/authentication";
const router = Router();

router.post("/register", registerUserController);

router.post("/login", loginUserController);

router.get("/login/userProfile", authenticate, userByEmailController);

export default router;
