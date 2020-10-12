import { NextFunction, Request, Response } from "express"
import asyncHandler from "../middlewares/async"
import db from "../db"
import { LoginedRequest } from "../types"
import { Comment } from "../db/models/comment"
import sequelize from "sequelize"

const posts = db.Post
const users = db.User

export const addPost = asyncHandler(
  async (req: LoginedRequest, res: Response, next: NextFunction) => {
    const title = req.body.title
    const categoryId = req.body.categoryId
    const text = req.body.text
    const newPost = await posts.create({
      title,
      text,
      WrittersId: req.user.id,
      CategoryId: categoryId,
    })
    res.status(200).json("포스팅 성공!")
  }
)

export const getPost = asyncHandler(
  async (req: LoginedRequest, res: Response, next: NextFunction) => {
    const postId = req.params.id
    const post = await posts.findOne({
      where: {
        id: postId,
      },
      include: [
        {
          model: users as any,
          attributes: ["id", "nickname"],
          as: "Writters",
        },
        {
          model: db.Comment as any,
          include: [
            {
              attributes: ["id", "nickname", "name"],
              model: db.User as any,
              as: "Users",
            },
          ],
        },
        {
          model: db.Category as any,
          attributes: ["id", "name"],
        },
      ],
    })
    res.status(200).json(post)
  }
)

export const getPosts = asyncHandler(
  async (req: LoginedRequest, res: Response, next: NextFunction) => {
    const allPost = await posts.findAll({
      attributes: [
        "id",
        "title",
        "createdAt",
        [
          sequelize.literal(
            "(SELECT COUNT(*) FROM Comments WHERE Comments.PostId = Post.id)"
          ),
          "commentCount",
        ],
      ],
      include: [
        {
          model: db.Comment as any,
        },
      ],
    })
    allPost.forEach((post: any) => {
      delete post.dataValues.Comments
    })
    return res.status(200).json(allPost)
  }
)

// export const getPostsByCategory = asyncHandler(
//   async (req: LoginedRequest, res: Response, next: NextFunction) => {
//     const allPost = await posts.findAll({
//       group : ["CategoryId"],
//       attributes: ["id", "title"],
//     })
//     res.status(200).json(allPost)
//   },
// )
