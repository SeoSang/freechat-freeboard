import { Sequelize, Model, DataTypes } from "sequelize"

export interface CategoryAttributes {
  id?: number
  name: string
}

// Some attributes are optional in `User.build` and `User.create` calls

export class Category
  extends Model<CategoryAttributes>
  implements CategoryAttributes {
  public id?: number
  public name!: string

  // timestamps!
  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  // public static associations: {
  //   users: Association<Post, Category>
  // }
}

export const categoryInit = (sequelize: Sequelize) => {
  Category.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: new DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci", // 한글이 저장돼요
      tableName: "categorys",
      sequelize, // passing the `sequelize` instance is required
      modelName: "Category", // We need to choose the model email
      timestamps: true,
    }
  )
  return Category
}
