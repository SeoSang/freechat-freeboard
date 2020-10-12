export interface RoomData {
  id: number
  title: "string"
  max: number
  userCount: number
  password?: "string"
  owner?: "string"
  createdAt?: Date
}

export interface ChatData {
  user: string
  chat: string
}
