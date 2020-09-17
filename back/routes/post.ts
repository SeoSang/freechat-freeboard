import express from "express"
import { addPost, getPost } from "../controllers/post"
import isLoggedIn from "../middlewares/authToken"

const router = express.Router()

router.route("/:id").post(isLoggedIn, addPost).get(isLoggedIn, getPost)

export default router
