import express from "express"
import { getPosts } from "../controllers/post"
import isLoggedIn from "../middlewares/isLoggedIn"

const router = express.Router()

router.route("/").get(isLoggedIn, getPosts)

export default router
