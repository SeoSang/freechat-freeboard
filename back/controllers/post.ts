import { NextFunction, Request, Response } from "express"
import asyncHandler from "../middlewares/async"

export const addPost = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json("포스팅 성공!")
  }
)
