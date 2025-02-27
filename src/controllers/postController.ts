import { Request, Response } from "express";
import prisma from "../client";


// Helper function to parse query parameters
const parseQueryParam = (param: string | string[]): string => {
  return Array.isArray(param) ? param[0] : param;
};


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
    const postId = parseInt(req.params.id, 10); // Change to `req.params.id`
    const { title, content, imageUrl, categoryName } = req.body;

    console.log("Request Params:", req.params);
    console.log("Request Body:", req.body);
    console.log("Parsed postId:", postId);

    if (isNaN(postId)) {
      return res.status(400).json({ error: "Invalid post ID" });
    }

    if (!req.user?.id) {
      return res.status(401).json({ error: "User not authenticated" });
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
  try {
    const postId = parseInt(req.params.id, 10);

    if (!req.user?.id) {
      throw new Error("User not authenticated");
    }

    // Find the post to delete
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Check if the user is authorized to delete this post
    if (post.userId !== req.user.id) {
      return res
        .status(403)
        .json({ error: "Not authorized to delete this post" });
    }

    // Delete the post
    await prisma.post.delete({
      where: { id: post.id },
    });

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ error: "Failed to delete post" });
  }
};

export const getPosts = async (req: Request, res: Response) => {
  try {
    const sortBy = (req.query.sortBy as string) || "createdAt";
    const order = (req.query.order as string) === "asc" ? "asc" : "desc";
    const category = req.query.category as string | undefined;
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = parseInt(req.query.offset as string) || 0;

    const whereClause: any = category
      ? { category: { name: { equals: category } } }
      : {};

    const posts = await prisma.post.findMany({
      where: whereClause,
      include: {
        user: { select: { name: true, imageUrl: true } },
        comments: true,
      },
      orderBy: { [sortBy]: order },
      skip: offset,
      take: limit,
    });

    res.status(200).json(posts);
  } catch (error) {
    console.error("Error retrieving posts:", error);
    res.status(500).json({ error: "Failed to retrieve posts" });
  }
};

export const upvotePost = async (req: Request, res: Response) => {
  try {
    const postId = parseInt(req.params.id, 10);

    if (isNaN(postId)) {
      return res.status(400).json({ error: "Invalid post ID" });
    }

    // Check if the post exists
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Increment upvotes
    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: { upvotes: { increment: 1 } },
    });

    res.status(200).json({
      message: "Post upvoted successfully",
      upvotes: updatedPost.upvotes,
    });
  } catch (error) {
    console.error("Error upvoting post:", error);
    res.status(500).json({ error: "Failed to upvote post" });
  }
};

export const downvotePost = async (req: Request, res: Response) => {
  try {
    const postId = parseInt(req.params.id, 10);

    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: {
        downvotes: post.downvotes + 1,
      },
    });

    res.status(200).json({
      message: "Post downvoted successfully",
      downvotes: updatedPost.downvotes,
    });
  } catch (error) {
    console.error("Error downvoting post:", error);
    res.status(500).json({ error: "Failed to downvote post" });
  }
};

export const getFilteredSortedPosts = async (req: Request, res: Response) => {
  try {
    const {
      sortBy = "createdAt",
      order = "desc",
      category,
      limit = 10,
      offset = 0,
    } = req.query;

    const posts = await prisma.post.findMany({
      where: category
        ? { category: { name: { equals: category as string } } }
        : {},
      include: {
        user: { select: { name: true, imageUrl: true } },
        comments: true,
        category: true,
      },
      orderBy: { [sortBy as string]: order as "asc" | "desc" },
      skip: parseInt(offset as string, 10),
      take: parseInt(limit as string, 10),
    });

    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};