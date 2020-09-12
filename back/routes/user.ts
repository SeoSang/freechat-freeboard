import { login, register, logout } from "./../controllers/user"
import express from "express"
const router = express.Router()

router.route("/login").post(login)

router.route("/logout").post(logout)

router.route("/register").post(register)

export default router
