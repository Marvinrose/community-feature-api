import { Request, Response } from "express";
import prisma from "../client";
// import {
//   createPostService,
//   editPostService,
//   deletePostService,
//   getPostsService,
// } from "../services/postService";

export const createPost = async (req: Request, res: Response) => {
  // Logic for creating a post
  try {
    const { title, content, imageUrl, category } = req.body;
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        imageUrl,
        category,
        userId: req.user.id, // Assuming the user ID is stored in req.user
      },
    });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: "Failed to create post" });
  }
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
