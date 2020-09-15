import { Sequelize, Model, DataTypes } from "sequelize"

export interface LikeCommentAttributes {
  id?: number
}

// Some attributes are optional in `User.build` and `User.create` calls

export class LikeComment
  extends Model<LikeCommentAttributes>
  implements LikeCommentAttributes {
  public id?: number

  // timestamps!
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

export const likeCommentInit = (sequelize: Sequelize) => {
  LikeComment.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
    },
    {
      tableName: "likeComments",
      sequelize, // passing the `sequelize` instance is required
      modelName: "LikeComments", // We need to choose the model email
    }
  )
  return LikeComment
}
