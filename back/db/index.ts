import { domainInit } from "./models/domain"
import { userInit } from "./models/user"
import { Sequelize } from "sequelize"
import { postInit } from "./models/post"
import { commentInit } from "./models/comment"
import { likeCommentInit } from "./models/likeComment"
import { likePostInit } from "./models/likePost"
const env = process.env.NODE_ENV || "development"
const config = require("../config/config.js")[env]

const sequelize = new Sequelize(config.database, config.username, config.password, config)

const User = userInit(sequelize)
const Domain = domainInit(sequelize)
const Post = postInit(sequelize)
const Comment = commentInit(sequelize)
const LikeComment = likeCommentInit(sequelize)
const LikePost = likePostInit(sequelize)

User.hasMany(Domain)
User.hasMany(Post)
Post.hasMany(Comment)
Post.hasMany(LikePost)
Comment.belongsTo(Post)
Domain.belongsTo(User, { targetKey: "id" })
LikeComment.belongsTo(User, { targetKey: "id", foreignKey: "id" })
LikeComment.belongsTo(Comment, { targetKey: "id", foreignKey: "id" })
LikePost.belongsTo(User, { targetKey: "id", foreignKey: "id" })
LikePost.belongsTo(Post, { targetKey: "id", foreignKey: "id" })

const db = {
  users: User,
  domains: Domain,
  comments: Comment,
  posts: Post,
  likeComments: LikeComment,
  likePosts: LikePost,
  sequelize,
}

export default db
