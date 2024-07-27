import { User } from "../types/user";
import { Request, Response, NextFunction } from "express";

const mockUserMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Mock user data
  const mockUser: User = {
    id: 1,
    name: "Test User",
    email: "test@example.com",
    // include any other fields that are part of your User model
  };

  // Assign mock user to req.user
  req.user = mockUser;

  next();
};

export default mockUserMiddleware;
