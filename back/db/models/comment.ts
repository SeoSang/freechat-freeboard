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

export interface CommentAttributes {
  id: number
  text: string
}

// Some attributes are optional in `User.build` and `User.create` calls

export class Comment extends Model<CommentAttributes> implements CommentAttributes {
  public id!: number
  public text!: string

  // timestamps!
  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  // public static associations: {
  //   users: Association<Post, Comment>
  // }
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
    },
  )
  return Comment
}
