require("dotenv").config()

module.exports = {
  development: {
    username: "root",
    password: process.env.DB_PASSWORD,
    database: "everything_dev",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  test: {
    username: "root",
    password: process.env.DB_PASSWORD,
    database: "everything_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: process.env.DB_PASSWORD,
    database: "everything_production",
    host: "127.0.0.1",
    dialect: "mysql",
  },
}