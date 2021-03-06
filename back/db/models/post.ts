import {
  Sequelize,
  Model,
  DataTypes,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyHasAssociationMixin,
  Association,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  Optional,
} from "sequelize"
import { Comment, CommentAttributes } from "./comment"
import { UserAttributes } from "./user"

export interface PostAttributes {
  id?: number
  title: string
  text: string
}

// Some attributes are optional in `User.build` and `User.create` calls
interface PostCreationAttributes extends Optional<PostAttributes, "id"> {
  WrittersId: number
  CategoryId: number
}

export class Post
  extends Model<PostAttributes, PostCreationAttributes>
  implements PostAttributes {
  public id?: number
  public title!: string
  public text!: string

  // association
  public Comments?: CommentAttributes

  // timestamps!
  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  public getComments!: HasManyGetAssociationsMixin<Comment> // Note the null assertions!
  public addComment!: HasManyAddAssociationMixin<Comment, number>
  public hasComment!: HasManyHasAssociationMixin<Comment, number>
  public countComments!: HasManyCountAssociationsMixin
  public createComment!: HasManyCreateAssociationMixin<Comment>

  public static associations: {
    comments: Association<Post, Comment>
  }
}

export const postInit = (sequelize: Sequelize) => {
  Post.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: new DataTypes.STRING(255),
        allowNull: false,
      },
      text: {
        type: new DataTypes.STRING(14000),
        allowNull: false,
      },
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci", // 한글이 저장돼요
      tableName: "posts",
      sequelize, // passing the `sequelize` instance is required
      modelName: "Post", // We need to choose the model email
    }
  )
  return Post
}
