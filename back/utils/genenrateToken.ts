import dotenv from "dotenv"
import jwt from "jsonwebtoken"
dotenv.config()

const generateAccessToken = (email: string) => {
  // expires after half and hour (1800 seconds = 30 minutes)
  return jwt.sign(email, process.env.TOKEN_SECRET!, { expiresIn: "1800s" })
}

export default generateAccessToken
