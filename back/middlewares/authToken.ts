import createError from "http-errors"
import { NextFunction, Request, RequestHandler, Response } from "express"
import jwt from "jsonwebtoken"
import asyncHandler from "./async"

const isLoggedIn: RequestHandler = asyncHandler(
  (req: Request, res: Response, next: NextFunction) => {
    // Gather the jwt access token from the request header
    const token = req.cookies.token
    if (!token) {
      return next(createError(401, "Not authorized to access this route"))
    }

    jwt.verify(
      token,
      process.env.TOKEN_SECRET as string,
      (err: any, user: any) => {
        if (err) {
          return res.sendStatus(403)
        }
        ;(req as any).user = user
        next() // pass the execution off to whatever request the client intended
      }
    )
  }
)

export default isLoggedIn
