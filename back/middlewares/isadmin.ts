import { NextFunction, Response, Request } from "express"
import createHttpError from "http-errors"

interface AdminRequest extends Request {
  user?: any
}

const isAdmin = (req: AdminRequest, res: Response, next: NextFunction) => {
  if (!req.user) return next(createHttpError(401, "로그인이 필요합니다!."))
  if (req.user.id > 2)
    return next(createHttpError(401, "관리자 권한이 없습니다!."))
  next()
}

export default isAdmin
