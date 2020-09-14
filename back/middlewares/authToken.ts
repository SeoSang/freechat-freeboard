import createError from "http-errors"
import { RequestHandler } from "express"
import jwt from "jsonwebtoken"

const authenticateToken: RequestHandler = (req: any, res, next) => {
  // Gather the jwt access token from the request header
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1]
  if (!token) {
    return next(createError(401, "Not authorized to access this route"))
  }

  jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, user: any) => {
    console.log(err)
    if (err) return res.sendStatus(403)
    req.user = user
    next() // pass the execution off to whatever request the client intended
  })
}

export default authenticateToken
