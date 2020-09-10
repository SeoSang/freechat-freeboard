import express, { Response, Request, NextFunction } from "express"
const router = express.Router({ mergeParams: true })
import asyncHandler from "../middlewares/async"
import ErrorResponse from "../utils/error"

export const login = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(204).json()
  },
)

export const register = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(204).json()
  },
)
