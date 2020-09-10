// These are all the attributes in the User model
import {
  Sequelize,
  Model,
  ModelDefined,
  DataTypes,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyHasAssociationMixin,
  Association,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  Optional,
} from "sequelize"
import { Project } from "./project"

export interface UserAttributes {
  id: number
  email: string
  password: string
  name: string
  nickname: string | null
}

// Some attributes are optional in `User.build` and `User.create` calls
interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes {
  public id!: number
  public email!: string
  public name!: string
  public nickname!: string | null
  public password!: string

  // timestamps!
  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  public getProjects!: HasManyGetAssociationsMixin<Project> // Note the null assertions!
  public addProject!: HasManyAddAssociationMixin<Project, number>
  public hasProject!: HasManyHasAssociationMixin<Project, number>
  public countProjects!: HasManyCountAssociationsMixin
  public createProject!: HasManyCreateAssociationMixin<Project>

  public readonly projects?: Project[] // Note this is optional since it's only populated when explicitly requested in code

  public static associations: {
    projects: Association<User, Project>
  }
}

export const userInit = (sequelize: Sequelize) => {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      nickname: {
        type: new DataTypes.STRING(128),
        allowNull: true,
      },
      name: {
        type: new DataTypes.STRING(64),
        allowNull: false,
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci", // 한글이 저장돼요
      tableName: "users",
      sequelize, // passing the `sequelize` instance is required
      modelName: "User", // We need to choose the model email
    }
  )
  return User
}
