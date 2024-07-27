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
  try {
    const postId = parseInt(req.params.postId); // Ensure postId is an integer
    const { title, content, imageUrl, categoryName } = req.body;

    if (!req.user?.id) {
      throw new Error("User not authenticated");
    }

    // Validate the postId
    if (isNaN(postId)) {
      return res.status(400).json({ error: "Invalid post ID" });
    }

    // Find the post to update
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Find the category
    const category = await prisma.category.findUnique({
      where: { name: categoryName },
    });

    if (!category) {
      return res.status(400).json({ error: "Invalid category" });
    }

    // Update the post
    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: {
        title,
        content,
        imageUrl,
        categoryId: category.id,
      },
    });

    res.status(200).json(updatedPost);
  } catch (error) {
    console.error("Error editing post:", error);
    res.status(500).json({ error: "Failed to edit post" });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  // Logic for deleting a post
};

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        user: { select: { name: true, imageUrl: true } }, // Assuming `imageUrl` exists in `User` model
        comments: true,
      },
      orderBy: { createdAt: "desc" }, // Optional: Order by creation date, newest first
    });

    res.status(200).json(posts);
  } catch (error) {
    console.error("Error retrieving posts:", error);
    res.status(500).json({ error: "Failed to retrieve posts" });
  }
};

