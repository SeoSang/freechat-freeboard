import express from "express"
import { addPost, getPost } from "../controllers/post"
import isLoggedIn from "../middlewares/isLoggedIn"

const router = express.Router()

router.route("/:id").get(isLoggedIn, getPost)
router.route("/").post(isLoggedIn, addPost)

export default router
