import { Router } from "express";
import {
  createPost,
  editPost,
  deletePost,
  getPosts,
  upvotePost,
  downvotePost,
  getFilteredSortedPosts,
} from "../controllers/postController";

const router = Router();

router.post("/", createPost);
router.put("/:id", editPost);
router.delete("/:id", deletePost);
router.get("/", getPosts);
router.post("/:id/upvote", upvotePost);
router.post("/:id/downvote", downvotePost);
router.get("/posts", getFilteredSortedPosts);

export default router;
