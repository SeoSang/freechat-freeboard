import { NextFunction, Request, Response } from "express"
import asyncHandler from "../middlewares/async"
import db from "../db"
import { LoginedRequest } from "../types"

const comments = db.Comment

export const addComment = asyncHandler(
  async (req: LoginedRequest, res: Response, next: NextFunction) => {
    const userId = req.user.id
    const postId = req.body.postId
    const text = req.body.text
    const newComment = await comments.create({
      text,
      UserId: userId,
      PostId: postId,
    })
    res.status(200).json("댓글 추가 성공!")
  }
)

export const getComment = asyncHandler(
  async (req: LoginedRequest, res: Response, next: NextFunction) => {
    const comment = await comments.findOne({
      where: {
        id: req.params.id,
      },
      include: {
        model: db.User as any,
        as: "Users",
      },
    })
    res.status(200).json(comment)
  }
)

export const getComments = asyncHandler(
  async (req: LoginedRequest, res: Response, next: NextFunction) => {
    const allComments = await comments.findAll()
    res.status(200).json(allComments)
  }
)
