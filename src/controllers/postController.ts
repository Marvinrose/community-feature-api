import { Request, Response } from "express";
import prisma from "../client";
// import {
//   createPostService,
//   editPostService,
//   deletePostService,
//   getPostsService,
// } from "../services/postService";

export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, content, imageUrl, categoryName } = req.body;

    if (!req.user?.id) {
      throw new Error("User not authenticated");
    }

    const category = await prisma.category.findUnique({
      where: { name: categoryName },
    });

    if (!category) {
      return res.status(400).json({ error: "Invalid category" });
    }

    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        imageUrl,
        categoryId: category.id,
        userId: req.user.id,
      },
    });

    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error creating post:", error);
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
