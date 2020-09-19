import { UserAttributes } from "./../db/models/user"
import db from "../db"
import createError from "http-errors"
import { CookieOptions } from "./../utils/option"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import express, { Response, Request, NextFunction, RequestHandler } from "express"
const router = express.Router({ mergeParams: true })
import asyncHandler from "../middlewares/async"
import bcrypt from "bcrypt"

dotenv.config()

const users = db.User

export const login = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.email || !req.body.password) {
    return next(createError(412, "이메일 혹은 비밀번호를 입력해주세요!"))
  }
  const email = req.body.email
  const potentialUser = {
    where: {
      email,
    },
  }
  const exUser = await users.findOne(potentialUser)
  if (!exUser) {
    return next(createError(410, "존재하지 않는 이메일입니다!"))
  }
  const result = await bcrypt.compare(req.body.password, exUser.password)

  if (!result) return next(createError(403, "비밀번호가 틀립니다!"))

  let token = jwt.sign({ id: exUser.id }, process.env.TOKEN_SECRET!, {
    expiresIn: process.env.TOKEN_EXPIRE,
  })
  const resUser: UserAttributes | any = exUser.toJSON()
  if (resUser.password) {
    resUser.password = "deleted"
  }

  res
    .status(200)
    .cookie("token", token, CookieOptions)
    .json(resUser)
})

export const logout = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  return res
    .status(200)
    .clearCookie("token", CookieOptions)
    .json("logout complete")
})

export const register = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const exUser = await users.findOne({
    where: {
      email: req.body.email,
    },
  })
  if (exUser) return next(createError(409, "이미 사용중인 아이디입니다."))
  const hashedPassword = await bcrypt.hash(req.body.password, parseInt(process.env.BCRYPT_SALT!))
  const newUser = await users.create({
    email: req.body.email,
    name: req.body.name,
    nickname: req.body.nickname,
    password: hashedPassword,
  })
  newUser.password = "deleted"
  return res.status(200).json(newUser)
})
