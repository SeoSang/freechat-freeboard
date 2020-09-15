import { domainInit } from "./models/domain"
import { userInit } from "./models/user"
import { Sequelize } from "sequelize"
import { postInit } from "./models/post"
import { commentInit } from "./models/comment"
import { likeCommentInit } from "./models/likeComment"
import { likePostInit } from "./models/likePost"
import { categoryInit } from "./models/category"
const env = process.env.NODE_ENV || "development"
const config = require("../config/config.js")[env]

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
)

const User = userInit(sequelize)
const Domain = domainInit(sequelize)
const Post = postInit(sequelize)
const Comment = commentInit(sequelize)
const Category = categoryInit(sequelize)
// const LikeComment = likeCommentInit(sequelize)
// const LikePost = likePostInit(sequelize)

User.hasMany(Domain)
User.hasMany(Post)
User.hasMany(Comment)
Category.hasMany(Post)
Post.hasMany(Comment)
Post.belongsTo(User)
Post.belongsTo(Category)
Post.belongsToMany(User, { through: "likePost" })
Comment.belongsTo(Post)
Comment.belongsToMany(User, { through: "likeComment" })
Domain.belongsTo(User, { targetKey: "id" })
// Post.hasMany(LikePost)
// LikeComment.belongsTo(User, { targetKey: "id", foreignKey: "id" })
// LikeComment.belongsTo(Comment, { targetKey: "id", foreignKey: "id" })
// LikePost.belongsTo(User, { targetKey: "id", foreignKey: "id" })
// LikePost.belongsTo(Post, { targetKey: "id", foreignKey: "id" })

const db = {
  User,
  Domain,
  Comment,
  Post,
  Category,
  sequelize,
}

export default db
