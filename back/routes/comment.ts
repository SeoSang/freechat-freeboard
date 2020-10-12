import express from "express"
import isLoggedIn from "../middlewares/isLoggedIn"
import { addComment, getComment, getComments } from "../controllers/comment"
import isAdmin from "../middlewares/isadmin"

const router = express.Router()

router.route("/").post(isLoggedIn, addComment)
router.route("/:id").get(isLoggedIn, isAdmin, getComment)

router.route("/all").get(isLoggedIn, getComments)

export default router
