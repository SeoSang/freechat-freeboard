import { Request } from "express"

export interface AdminRequest {}

export interface LoginRequest extends Request {
  user: { id: number }
}
