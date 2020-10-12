import { NextFunction, Request, Response } from "express"
import asyncHandler from "../middlewares/async"
import db from "../db"
import { LoginedRequest } from "../types"
import sequelize from "sequelize"
import createHttpError from "http-errors"

export const loadRoom = asyncHandler(
  async (req: LoginedRequest, res: Response, next: NextFunction) => {
    const exRoom = await db.Room.findOne({
      where: {
        id: parseInt(req.query.id as string),
      },
    })
    if (!exRoom) {
      return next(createHttpError(410, "존재하지 않는 방입니다!"))
    }
    if (exRoom.password && exRoom.password !== req.query.password) {
      return next(createHttpError(409, "비밀번호가 틀렸습니다!"))
    }
    const io = req.app.get("io")
    const { rooms } = io.of("/chat").adapter
    if (
      rooms &&
      rooms[req.params.id] &&
      exRoom.max <= rooms[req.params.id].length
    ) {
      return next(createHttpError(413, "허용인원 초과!"))
    }
    const chats = await db.Chat.findAll({
      where: {
        RoomId: exRoom.id,
      },
      order: [["createdAt", "ASC"]],
    })

    return res.status(200).json({
      room: exRoom,
      chats,
      user: req.user.nickname,
    })
  }
)

export const loadRooms = asyncHandler(
  async (req: LoginedRequest, res: Response, next: NextFunction) => {
    const rooms: any = await db.Room.findAll({
      include: [
        {
          model: db.User as any,
          as: "owner",
        },
      ],
    })
    res.status(200).json(rooms)
  }
)

export const addRoom = asyncHandler(
  async (req: LoginedRequest, res: Response, next: NextFunction) => {
    const newRoom = await db.Room.create({
      title: req.body.title,
      max: req.body.max,
      password: req.body.password,
      UserId: req.user.id,
    })
    const io = req.app.get("io")
    const result = {
      ...newRoom.get(),
      owner: {
        id: req.user.id,
        nickname: req.user.nickname,
      },
    }
    io.of("/room").emit("newRoom", result)
    res.status(200).json(newRoom)
  }
)

export const deleteRoom = asyncHandler(
  async (req: LoginedRequest, res: Response, next: NextFunction) => {
    await db.Room.destroy({ where: { id: req.params.id } })
    await db.Chat.destroy({ where: { RoomId: req.params.id } })
    res.status(200).json("deleteRoom 완료!")
    setTimeout(() => {
      req.app.get("io").of("/room").emit("removeRoom", req.params.id)
    }, 2000)
  }
)

export const deleteRooms = asyncHandler(
  async (req: LoginedRequest, res: Response, next: NextFunction) => {
    await db.Room.destroy({
      where: {},
      // truncate: true,
    })
    res.status(200).json("전체 삭제 완료")
  }
)

export const sendChat = asyncHandler(
  async (req: LoginedRequest, res: Response, next: NextFunction) => {
    const chat = await db.Chat.create({
      RoomId: parseInt(req.params.id),
      UserId: req.user.id,
      chat: req.body.chat,
    })
    req.app.get("io").of("/chat").to(req.params.id).emit("chat", chat)

    res.status(200).json("채팅보내기 완료")
  }
)

export const isPasswordCorrect = asyncHandler(
  async (req: LoginedRequest, res: Response, next: NextFunction) => {
    const exRoom = await db.Room.findOne({
      where: {
        id: req.body.roomId,
      },
    })
    if (!exRoom) {
      return next(createHttpError(410, "없는 방입니다!"))
    }
    if (exRoom.password !== req.body.password) {
      return next(createHttpError(403, "비밀번호가 틀립니다!"))
    }
    res.status(200).json(true)
  }
)
