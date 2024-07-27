import { Request, Response, NextFunction } from "express";

const errorHandlingMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Error occurred:", err.message); // Log the error message to the console
  console.error("Stack trace:", err.stack); // Log the stack trace for debugging

  res.status(500).json({ error: "Internal Server Error" });
};

export default errorHandlingMiddleware;
