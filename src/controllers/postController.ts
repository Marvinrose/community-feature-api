import { Request, Response } from "express";
import {
  createPostService,
  editPostService,
  deletePostService,
  getPostsService,
} from "../services/postService";

export const createPost = async (req: Request, res: Response) => {
  // Logic for creating a post
};

export const editPost = async (req: Request, res: Response) => {
  // Logic for editing a post
};

export const deletePost = async (req: Request, res: Response) => {
  // Logic for deleting a post
};

export const getPosts = async (req: Request, res: Response) => {
  // Logic for getting posts
};
