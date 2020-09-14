const { expect } = require("chai")

const {
  sequelize,
  dataTypes,
  checkModelName,
  checkUniqueIndex,
  checkPropertyExists,
} = require("sequelize-test-helpers")

// import { userInit } from "../../db/models/user.ts"
import db from "../../db"

describe("src/models/users", () => {
  const user = db.users

  checkModelName(User)("User")

  context("properties", () => {
    ;["id", "email", "password", "nickname", "name"].forEach(checkPropertyExists(user))
  })

  //   context("associations", () => {
  //     const Company = "some dummy company"

  //     before(() => {
  //       User.associate({ Company })
  //     })

  //     it("defined a belongsTo association with Company", () => {
  //       expect(User.belongsTo).to.have.been.calledWith(Company)
  //     })
  //   })

  //   context("indexes", () => {
  //     ;["email", "token"].forEach(checkUniqueIndex(user))
  //   })
})
