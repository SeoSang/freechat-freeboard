import db from "./db"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import express, { Request, Response, NextFunction } from "express"
import morgan from "morgan"
import nunjucks from "nunjucks"
import userRouter from "./routes/user"
import postRouter from "./routes/post"
import postsRouter from "./routes/posts"
import commentRouter from "./routes/comment"
import categoryRouter from "./routes/category"
import chatRouter from "./routes/chat"
import session from "express-session"
import webSocket from "./socket"

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
app.use(cookieParser())
const ss: string = process.env.SESSION_SECRET ? process.env.SESSION_SECRET : ""
export const sessionMiddleWare = session({
  resave: false,
  saveUninitialized: false,
  secret: ss,
  cookie: {
    secure: "auto",
    httpOnly: true,
  },
})
app.use(sessionMiddleWare)

app.use("/api/user", userRouter)
app.use("/api/post", postRouter)
app.use("/api/posts", postsRouter)
app.use("/api/comment", commentRouter)
app.use("/api/category", categoryRouter)
app.use("/api/chat", chatRouter)

app.use((req, res, next) => {
  res.status(404).send("404 not Found!")
})

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.locals.message = err.message
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {}
  res.status(err.status || 500)
  res.render("error")
})

const server = app.listen(app.get("port"), () => {
  console.log(`실행됨 : http://localhost:${app.get("port")}`)
})

webSocket(server, app, sessionMiddleWare)
export default app
