import { lightUserData } from "./user"

export interface PostData {
  id: number
  title: string
  text: string
  Comments?: any
  CategoryId: number
  Category: { id: number; name: string }
  Writters: lightUserData
  createdAt: Date
  updatedAt: Date
}
export interface PostsPost {
  id: number
  title: string
  commentCount: number
  createdAt: Date
  updatedAt?: Date
}
