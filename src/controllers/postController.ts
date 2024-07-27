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
    const { title, content, imageUrl, category } = req.body;
    console.log("Request body:", req.body); // Log the request body

    if (!req.user?.id) {
      throw new Error("User not authenticated"); // Error if user is not authenticated
    }

    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        imageUrl,
        category,
        userId: req.user.id,
      },
    });

    console.log("New post created:", newPost); // Log the newly created post

    res.status(201).json(newPost);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error creating post:", error.message); // Log the error message
      console.error("Error stack trace:", error.stack); // Log the stack trace
    } else {
      console.error("Unknown error:", error);
    }

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
