import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import createError from "http-errors";
import { NextFunction, Request, Response } from "express";

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers["authorization"] as any;
    const tokenExtract = authHeader.split(" ")[1];
    const decodedToken = jwt.verify(
      tokenExtract,
      process.env.SECRET_CODE as Secret
    ) as Secret;
    (req as CustomRequest).token = decodedToken;
    next();
  } catch (error) {
    next(createError(403, new Error("Not Authorized")));
  }
};
