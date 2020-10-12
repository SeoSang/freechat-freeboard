import {
  login,
  register,
  logout,
  loadMe,
  getUser,
  getUsers,
} from "./../controllers/user"
import express from "express"
import isLoggedIn from "../middlewares/isLoggedIn"
import isAdmin from "../middlewares/isadmin"
const router = express.Router()

router.route("/").get(isLoggedIn, loadMe)
router.route("/:id").get(isLoggedIn, isAdmin, getUser)
router.route("/all").get(isLoggedIn, isAdmin, getUsers)

router.route("/login").post(login)

router.route("/logout").post(logout)

router.route("/register").post(register)

export default router
