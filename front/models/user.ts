import { observable } from "mobx"

export class UserModel {
  readonly id: number
  @observable public text: string
  @observable public completed: boolean

  constructor(text: string, completed: boolean = false) {
    this.id = UserModel.generateId()
    this.text = text
    this.completed = completed
  }

  static nextId = 1
  static generateId() {
    return this.nextId++
  }
}

export default UserModel
