import { Request } from "express"

export interface AdminRequest {}

export interface LoginedRequest extends Request {
  user: { id: number; name: string; nickname: string; email: string }
}
