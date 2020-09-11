import { domainInit } from "./models/domain"
import { userInit } from "./models/user"
import { Sequelize } from "sequelize"
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

User.hasMany(Domain)
Domain.belongsTo(User, { targetKey: "id" })

const db = {
  users: User,
  domains: Domain,
  sequelize,
}

export default db
