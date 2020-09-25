import express from "express"
import { addCategory, getAllCategories } from "../controllers/category"
import isAdmin from "../middlewares/isadmin"
import isLoggedIn from "../middlewares/isLoggedIn"

const router = express.Router()

router
  .route("/")
  .get(isLoggedIn, getAllCategories)
  .post(isLoggedIn, isAdmin, addCategory)

export default router
