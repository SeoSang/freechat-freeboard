import express from "express"
import { addPost } from "../controllers/post"
import isLoggedIn from "../middlewares/authToken"

const router = express.Router()

router.route("/").post(isLoggedIn, addPost)

export default router
