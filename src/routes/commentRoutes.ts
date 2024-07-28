import { Router } from "express";
import {
  addComment,
  getCommentsForPost,
    replyToComment,
} from "../controllers/commentController";

const router = Router();

router.post("/:postId/comments", addComment);
router.get("/:postId/comments", getCommentsForPost);
router.post("/:commentId/reply", replyToComment);

export default router;
