import { login, register } from "./../controllers/user"
import express from "express"
const { Router } = require("express")
const router = express.Router()

router.route("/login").post(login)

router.route("/register").post(register)

export default router
