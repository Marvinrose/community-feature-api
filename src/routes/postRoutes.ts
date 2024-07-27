import { Router } from "express";
import {
  createPost,
  editPost,
  deletePost,
  getPosts,
} from "../controllers/postController";

const router = Router();

router.post("/", createPost);
router.put("/:id", editPost);
router.delete("/:id", deletePost);
router.get("/", getPosts);

export default router;
