import { User, Post, Comment } from "./types/user";

declare global {
  namespace Express {
    interface Request {
      user?: User;
      post?: Post;
      comment?: Comment; // Make sure your authentication middleware assigns `user` of type `User`
    }
  }
}
