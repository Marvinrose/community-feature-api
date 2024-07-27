import { User } from "@prisma/client";

declare global {
  namespace Express {
    interface Request {
      user?: User; // Make sure your authentication middleware assigns `user` of type `User`
    }
  }
}
