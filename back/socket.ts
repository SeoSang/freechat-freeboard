import { Server } from "http"
import SocketIO, { Socket } from "socket.io"
import { Application } from "express"
import axios from "axios"
import isLoggedIn from "./middlewares/isLoggedIn"
import cookieParser from "cookie-parser"

export default (server: Server, app: Application, middleWare: any) => {
  const io = SocketIO(server)
  app.set("io", io)
  const room = io.of("/room")
  const chat = io.of("/chat")

  // io.use((socket, next) => {
    // middleWare(socket.request, socket.request.res, next)
    // cookieParser()
  // })
  room.on("connection", (socket) => {
    console.log("room 네임스페이스에 접속")
    socket.on("disconnect", () => {
      console.log("room 네임스페이스 접속 해제")
    })
  })

  chat.on("connection", (socket) => {
    console.log("chat 네임스페이스에 접속")
    const req = socket.request
    const roomId = socket.handshake.query.id
    console.log("roomId => ", roomId)
    socket.join(roomId)
    socket.to(roomId).emit("join", {
      user: "system",
      chat: `${req.user?.nickname}님이 입장하셨습니다.`,
    })

    socket.on("disconnect", () => {
      console.log("chat 네임스페이스 접속 해제")
      socket.leave(roomId)
      const currentRoom = socket.adapter.rooms[roomId]
      const userCount = currentRoom ? currentRoom.length : 0
      if (userCount === 0) {
        // 유저가 0명이면 방 삭제
        axios
          .delete(`http://localhost:${app.get("port")}/room/${roomId}`)
          .then(() => {
            console.log("방 제거 요청 성공")
          })
          .catch((error) => {
            console.error(error)
          })
      } else {
        socket.to(roomId).emit("exit", {
          user: "system",
          chat: `${req.user?.nickname}님이 퇴장하셨습니다.`,
        })
      }
    })
    socket.on("chat", (data) => {
      socket.to(data.RoomId).emit(data)
    })
  })
}
