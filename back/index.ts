import db from "./db"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import express, { Request, Response, NextFunction } from "express"
import morgan from "morgan"
import nunjucks from "nunjucks"
import userRouter from "./routes/user"
import postRouter from "./routes/post"
import session from "express-session"

dotenv.config()

db.sequelize?.sync()
const app = express()
app.use(morgan("dev")) // 로그 찍어줌

app.set("port", process.env.PORT || 6245)
app.set("view engine", "html")
nunjucks.configure("views", {
  express: app,
  watch: true,
})

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
)
app.use(express.urlencoded({ extended: true })) // true면 qs 모듈
app.use(express.json()) // 알아서 json 파일 파싱해줌
app.use(cookieParser("password"))
const ss: string = process.env.SESSION_SECRET ? process.env.SESSION_SECRET : ""
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: ss,
    cookie: {
      secure: "auto",
      httpOnly: true,
    },
  })
)

app.use("/api/user", userRouter)
app.use("/api/post", postRouter)

app.use((req, res, next) => {
  res.status(404).send("404 not Found!")
})

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.locals.message = err.message
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {}
  res.status(err.status || 500)
  res.render("error")
})

app.listen(app.get("port"), () => {
  console.log(`실행됨 : http://localhost:${app.get("port")}`)
})

export default app
