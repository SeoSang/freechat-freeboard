import { login, register } from "./../controllers/user"
import express from "express"
const { Router } = require("express")
const router = express.Router()

router.route("/login").get(login)

router.route("/register").get(register)

export default router
