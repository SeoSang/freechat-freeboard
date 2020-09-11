import { Model, Optional } from "sequelize"

export interface ProjectAttributes {
  id: number
  ownerId: number
  name: string
}

export interface ProjectCreationAttributes
  extends Optional<ProjectAttributes, "id"> {}

export class Project
  extends Model<ProjectAttributes, ProjectCreationAttributes>
  implements ProjectAttributes {
  public id!: number
  public ownerId!: number
  public name!: string

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}
