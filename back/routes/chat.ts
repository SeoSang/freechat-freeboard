import express from "express"
import {
  addRoom,
  deleteRoom,
  deleteRooms,
  isPasswordCorrect,
  loadRoom,
  loadRooms,
  sendChat,
} from "../controllers/chat"
import isLoggedIn from "../middlewares/isLoggedIn"
import isAdmin from "../middlewares/isadmin"
import multer from "multer"
import fs from "fs"
import path from "path"

const router = express.Router()

try {
  fs.readdirSync("uploads")
} catch (err) {
  console.error("uploads 폴더가 없어 uploads 폴더를 생성합니다.")
  fs.mkdirSync("uploads")
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, "uploads/")
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname)
      done(null, path.basename(file.originalname, ext) + Date.now() + ext)
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
})

// 채팅방 관련
router
  .route("/room/all")
  .get(loadRooms)
  .delete(isLoggedIn, isAdmin, deleteRooms)
router
  .route("/room/:id")
  .get(isLoggedIn, loadRoom)
  .delete(isLoggedIn, deleteRoom)

router.route("/room").get(isLoggedIn, loadRoom).post(isLoggedIn, addRoom)
router.route("/room/check").post(isPasswordCorrect)

// 채팅관련
router.route("/:id").post(isLoggedIn, sendChat)

export default router
