import { NextFunction, Request, Response } from "express"
import asyncHandler from "../middlewares/async"
import db from "../db"
import { LoginedRequest } from "../types"
import sequelize from "sequelize"
import createHttpError from "http-errors"

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
    io.of("/room").emit("newRoom", newRoom)
    res.status(200).json(newRoom)
  }
)

export const getRoom = asyncHandler(
  async (req: LoginedRequest, res: Response, next: NextFunction) => {
    const exRoom = await db.Room.findOne({
      where: {
        id: parseInt(req.params.id),
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
    })

    return res.status(200).json({
      room: exRoom,
      title: exRoom.title,
      chats,
      user: req.user.nickname,
    })
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

export const getRooms = asyncHandler(
  async (req: LoginedRequest, res: Response, next: NextFunction) => {
    const rooms = await db.Room.findAll()
    res.status(200).json(rooms)
  }
)
