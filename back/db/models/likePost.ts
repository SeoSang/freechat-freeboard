import { Sequelize, Model, DataTypes } from "sequelize"

export interface LikePostAttributes {
  id: number
}

// Some attributes are optional in `User.build` and `User.create` calls

export class LikePost extends Model<LikePostAttributes> implements LikePostAttributes {
  public id!: number

  // timestamps!
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

export const likePostInit = (sequelize: Sequelize) => {
  LikePost.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
    },
    {
      tableName: "likePosts",
      sequelize, // passing the `sequelize` instance is required
      modelName: "LikePosts", // We need to choose the model email
    },
  )
  return LikePost
}
