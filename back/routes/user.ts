import { login, register, logout, loadMe } from "./../controllers/user"
import express from "express"
import isLoggedIn from "../middlewares/authToken"
const router = express.Router()

router.route("/").get(isLoggedIn, loadMe)

router.route("/login").post(login)

router.route("/logout").post(logout)

router.route("/register").post(register)

export default router
