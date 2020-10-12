export interface UserAttributes {
  id: number
  email: string
  password: string
  name: string
  nickname: string | null
}

export interface LoginFormValues {
  email: string
  password: string
}

export interface lightUserData {
  id: number
  nickname: string
}

export interface MainUserData {
  id: number
  name: string
  nickname: string
  password: "deleted"
  email: string
}
