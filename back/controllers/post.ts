import { NextFunction, Request, Response } from "express"
import asyncHandler from "../middlewares/async"
import db from "../db"

const posts = db.Post

export const addPost = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const title = req.body.title
    const category = req.body.title
    const text = JSON.stringify(req.body.text)
    // const newPost = posts.create({
    //   title:
    // })
    res.status(200).json("포스팅 성공!")
  }
)
