// These are all the attributes in the User model
import {
  Sequelize,
  Model,
  ModelDefined,
  DataTypes,
  Association,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  Optional,
  BelongsToGetAssociationMixin,
} from "sequelize"

import { User } from "./user"

export interface DomainAttributes {
  id?: number
  host: string
  type: "admin" | "premium" | "free"
  clientSecret: string
}

// Some attributes are optional in `User.build` and `User.create` calls

export class Domain
  extends Model<DomainAttributes>
  implements DomainAttributes {
  public id?: number
  public host!: string
  public type!: "admin" | "premium" | "free"
  public clientSecret!: string

  // timestamps!
  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  public getUser!: BelongsToGetAssociationMixin<User> // Note the null assertions!

  public readonly user?: User // optional 한거임

  public static associations: {
    // optional 한거임
    user: Association<User, Domain>
  }
}

export const domainInit = (sequelize: Sequelize) => {
  Domain.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      host: {
        type: DataTypes.STRING(80),
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM("free", "premium"),
        allowNull: false,
      },
      clientSecret: {
        type: DataTypes.STRING(36),
        allowNull: false,
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci", // 한글이 저장돼요
      tableName: "domains",
      sequelize, // passing the `sequelize` instance is required
      modelName: "Domain",
      paranoid: true,
    }
  )
  return Domain
}
