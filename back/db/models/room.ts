import { Sequelize, Model, DataTypes, Optional, Association } from "sequelize"
import { User } from "./user"

export interface RoomAttributes {
  id: number
  title: string
  max: number
  password?: string
}

interface RoomCreationAttributes extends Optional<RoomAttributes, "id"> {
  UserId: number
}

export class Room
  extends Model<RoomAttributes, RoomCreationAttributes>
  implements RoomAttributes {
  public id!: number
  public title!: string
  public max!: number
  public password?: string

  public UserId?: number

  // timestamps!
  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  public static associations: {
    users: Association<Room, User>
  }
}

export const roomInit = (sequelize: Sequelize) => {
  Room.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: new DataTypes.STRING(1027),
        allowNull: false,
      },
      max: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      password: {
        type: new DataTypes.STRING(511),
        allowNull: true,
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci", // 한글이 저장돼요
      tableName: "rooms",
      sequelize, // passing the `sequelize` instance is required
      modelName: "Room", // We need to choose the model email
    }
  )
  return Room
}
