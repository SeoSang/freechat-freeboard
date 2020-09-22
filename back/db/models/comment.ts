import { Sequelize, Model, DataTypes, Optional, Association } from "sequelize"
import { User } from "./user"

export interface CommentAttributes {
  id?: number
  text: string
  UserId?: number
  PostId?: number
}

interface CommentCreationAttributes extends Optional<CommentAttributes, "id"> {
  UserId: number
  PostId: number
}

export class Comment
  extends Model<CommentAttributes, CommentCreationAttributes>
  implements CommentAttributes {
  public id?: number
  public text!: string

  // timestamps!
  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  public static associations: {
    users: Association<Comment, User>
  }
}

export const commentInit = (sequelize: Sequelize) => {
  Comment.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      text: {
        type: new DataTypes.STRING(2047),
        allowNull: false,
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci", // 한글이 저장돼요
      tableName: "comments",
      sequelize, // passing the `sequelize` instance is required
      modelName: "Comment", // We need to choose the model email
    }
  )
  return Comment
}
