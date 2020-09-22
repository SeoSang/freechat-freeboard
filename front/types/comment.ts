export interface CommentData {
  id: number
  text: string
  PostId: number
  UserId: number
  Users?: {
    id: number
    nickname: string
    name: string
  }
  createdAt: Date
  updatedAt: Date
}
