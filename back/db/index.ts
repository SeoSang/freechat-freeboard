import { userInit } from "./models/user"
import { Sequelize, ModelDefined, DataTypes } from "sequelize"
const env = process.env.NODE_ENV || "development"
const config = require("../config/config.js")[env]

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
)

const User = userInit(sequelize)

const db = {
  User,
  sequelize,
}

export default db
