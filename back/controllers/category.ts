import { NextFunction, Request, Response } from "express"
import asyncHandler from "../middlewares/async"
import db from "../db"

const categorys = db.Category

export const addCategory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const name = req.body.name
    const newCategory = await categorys.create({
      name,
    })
    res.status(200).json("카테고리 추가 성공!")
  }
)

export const getAllCategories = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const allCategories = await categorys.findAll()
    res.status(201).json(allCategories)
  }
)
