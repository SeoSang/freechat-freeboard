import dotenv from "dotenv"

dotenv.config()

export const CookieOptions = {
  expires: new Date(Date.now() + parseInt(process.env.JWT_COOKIE_EXPIRE!)),
  httpOnly: true,
  path: "/",
}
