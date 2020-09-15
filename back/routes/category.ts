import express from "express"
import { addCategory, getAllCategories } from "../controllers/category"
import isAdmin from "../middlewares/isadmin"
import isLoggedIn from "../middlewares/authToken"

const router = express.Router()

router
  .route("/")
  .get(isLoggedIn, isAdmin, getAllCategories)
  .post(isLoggedIn, isAdmin, addCategory)

export default router
