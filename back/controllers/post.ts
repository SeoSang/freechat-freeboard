import { NextFunction, Request, Response } from "express"
import asyncHandler from "../middlewares/async"
import db from "../db"
import { LoginRequest } from "../types"

const posts = db.Post

export const addPost = asyncHandler(
  async (req: LoginRequest, res: Response, next: NextFunction) => {
    const title = req.body.title
    const categoryId = req.body.categoryId
    const text = req.body.text
    const newPost = await posts.create({
      title,
      text,
      UserId: req.user.id,
      CategoryId: categoryId,
    })
    res.status(200).json("포스팅 성공!")
  }
)
