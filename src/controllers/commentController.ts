// import { PrismaClient } from '@prisma/client';
import { Request, Response } from "express";
import prisma from "../client";

export const addComment = async (req: Request, res: Response) => {
  try {
    console.log("Request Body:", req.body);
    console.log("Request Params:", req.params);
    console.log("Authenticated User ID:", req.user?.id);

    const postId = parseInt(req.params.postId, 10);
    const { content, parentId } = req.body;

    if (!req.user?.id) {
      throw new Error("User not authenticated");
    }

    const newComment = await prisma.comment.create({
      data: {
        content,
        userId: req.user.id,
        postId,
        parentId: parentId ? parseInt(parentId, 10) : undefined,
      },
    });

    console.log("New Comment:", newComment);
    res.status(201).json(newComment);
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ error: "Failed to add comment" });
  }
};



export const getCommentsForPost = async (req: Request, res: Response) => {
  try {
    const postId = parseInt(req.params.postId, 10);

    const comments = await prisma.comment.findMany({
      where: { postId },
      include: {
        user: { select: { name: true, imageUrl: true } },
      },
      orderBy: { createdAt: "asc" },
    });

    res.status(200).json(comments);
  } catch (error) {
    console.error("Error retrieving comments:", error);
    res.status(500).json({ error: "Failed to retrieve comments" });
  }
};


export const replyToComment = async (req: Request, res: Response) => {
  try {
    const { content } = req.body;
    const commentId = parseInt(req.params.commentId, 10);

    if (!req.user?.id) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const parentComment = await prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!parentComment) {
      return res.status(404).json({ error: "Parent comment not found" });
    }

    const newComment = await prisma.comment.create({
      data: {
        content,
        userId: req.user.id,
        postId: parentComment.postId,
        parentId: commentId,
      },
    });

    res.status(201).json(newComment);
  } catch (error) {
    console.error("Error replying to comment:", error);
    res.status(500).json({ error: "Failed to reply to comment" });
  }
};
