import { Router } from "express";
import {
  addComment,
  getComments,
  replyToComment,
} from "../controllers/commentController";

const router = Router();

router.post("/", addComment);
router.get("/:postId", getComments);
router.post("/reply", replyToComment);

export default router;
