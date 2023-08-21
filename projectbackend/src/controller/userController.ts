import { Request, Response } from "express";
import {
  registerUserService,
  loginUserService,
  userByEmailService,
} from "../service/userService";

const registerUserController = async (req: Request, res: Response) => {
  const registerUser = await registerUserService(req.body);
  res.send(registerUser);
};

const loginUserController = async (req: Request, res: Response) => {
  const loginUser = await loginUserService(req.body);
  res.send(loginUser);
};

const userByEmailController = async (req: any, res: Response) => {
  const userByEmail = await userByEmailService(req.token);
  res.send(userByEmail);
};

export { registerUserController, loginUserController, userByEmailController };
