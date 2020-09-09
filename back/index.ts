import express from "express"
import dotenv from "dotenv"
import morgan from "morgan"
import cors from "cors"
import cookieParser from "cookie-parser"

dotenv.config()

const app = express()

app.use(morgan("dev")) // 로그 찍어줌
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  }),
)
app.use(express.urlencoded({ extended: true })) // true면 qs 모듈
app.use(express.json()) // 알아서 json 파일 파싱해줌
app.use(cookieParser("password"))

app.get("/", (req, res, next) => {
  req.cookies
  req.signedCookies // 서명된 쿠키
  res.cookie("name", encodeURIComponent(name), {
    expires: new Date(),
    httpOnly: true,
    path: "/",
  })
  res.clearCookie("name", encodeURIComponent(name))
})
