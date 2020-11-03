import { Sequelize, Model, DataTypes, Optional, Association } from "sequelize"
import { User } from "./user"

export interface ChatAttributes {
  id?: number
  chat?: string
  gif?: string
  RoomId?: number
}

interface ChatCreationAttributes extends Optional<ChatAttributes, "id"> {
  UserId: number
  RoomId: number
}

export class Chat
  extends Model<ChatAttributes, ChatCreationAttributes>
  implements ChatAttributes {
  public id?: number
  public room!: string
  public chat?: string
  public gif?: string
  public RoomId?: number
  public UserId?: number

  // timestamps!
  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  public static associations: {
    users: Association<Chat, User>
  }
}

export const chatInit = (sequelize: Sequelize) => {
  Chat.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED ,
        autoIncrement: true,
        primaryKey: true,
      },
      chat: {
        type: new DataTypes.STRING(2047),
        allowNull: true,
      },
      gif: {
        type: new DataTypes.STRING(2047),
        allowNull: true,
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci", // 한글이 저장돼요
      tableName: "chats",
      sequelize, // passing the `sequelize` instance is required
      modelName: "Chat", // We need to choose the model email
    }
  )
  return Chat
}
