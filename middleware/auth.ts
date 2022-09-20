import { Response, Request, NextFunction } from "express";
import Jwt from "jsonwebtoken";
export const authenticationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  console.log(authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({
      msg: "please provide token",
    });
    return;
  }

  const token = authHeader.split(" ")[1];

  if (token == "null") {
    res.status(401).json({
      msg: "please provide token",
    });
    return;
  }

  try {
    const decoded: any = Jwt.verify(token, process.env.JWT_SECRET as string);

    (req as any).user = { id: decoded.id, username: decoded.username };
    next();
  } catch (error) {}
};
