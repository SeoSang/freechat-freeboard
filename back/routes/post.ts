import express from "express"
import { addPost, getPost } from "../controllers/post"
import isLoggedIn from "../middlewares/authToken"

const router = express.Router()

router.route("/").post(isLoggedIn, addPost)
router.route("/:id").get(isLoggedIn, getPost)

export default router
