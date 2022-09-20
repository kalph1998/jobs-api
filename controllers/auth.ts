import { Response, Request, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnauthenticatedError } from "../errors/index";

import User from "../models/user";

export const register = async (req: Request, res: Response) => {
  let user = await User.create(req.body);

  res
    .status(StatusCodes.CREATED)
    .json({ user: { name: user.name }, token: (user as any).createJWT() });
};
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please enter email and password");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new UnauthenticatedError("User not found");
  }

  //compare password
  const isPasswordCorrect = await (user as any).comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("incorrect username or password");
  }

  const token = (user as any).createJWT();

  res.status(StatusCodes.OK).json({
    user: {
      name: user.name,
    },
    token,
  });
};
