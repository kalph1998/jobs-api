import { Response, Request, NextFunction } from "express";
import Jwt from "jsonwebtoken";
import { UnauthenticatedError } from "../errors/index";

export const authenticationMiddleware = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Authentication Invalid");
  }

  const token = authHeader.split(" ")[1];

  // if (token == "null") {
  //   throw new UnauthenticatedError("Authentication Invalid");
  // }

  try {
    const decoded: any = Jwt.verify(token, process.env.JWT_SECRET as string);
    (req as any).user = { userId: decoded.userId, username: decoded.name };

    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication Invalid");
  }
};
