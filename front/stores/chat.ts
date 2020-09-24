import { observable, action, computed, flow } from "mobx"
import { RootStore, useStore } from "."
import axios from "axios"
import { BACKEND_URL } from "../util/util"

export const initialChatState = {
  rooms: [],
  chats: [],
  soketId: -1,
  getRoomsError: "",
  addRoomError: "",
}

class ChatStore {
  @observable rooms = initialChatState.rooms
  @observable chats = initialChatState.chats
  @observable soketId = initialChatState.soketId
  @observable getRoomsError = initialChatState.getRoomsError
  @observable addRoomError = initialChatState.addRoomError
  public root

  constructor(root: RootStore) {
    this.root = root
  }

  // 카테고리
  @action
  getRooms = flow(function* () {
    this.getRoomsError = ""
    try {
      const result = yield axios.get(`${BACKEND_URL}/api/chat/room`, {
        withCredentials: true,
      })
      yield console.log("getRooms result => ", result)
      this.rooms = result.data
    } catch (e) {
      yield console.log(e)
      this.getRoomsError = e.response
    }
  })

  @action
  addRoom = flow(function* (title: string, max: number, password: string) {
    this.addRoomError = ""
    try {
      const data = {
        title,
        max,
        password,
      }
      const result = yield axios.post(`${BACKEND_URL}/api/chat/room`, data, {
        withCredentials: true,
      })
      yield console.log("addRoom result => ", result)
    } catch (e) {
      yield console.log(e)
      this.addRoomError = e.response
    }
  })

  @computed get info() {
    return {}
  }
}

// export const useMeStore = () => {
//   const { meStore } = useStore()
//   return useObserver(() => {
//     meStore
//   })
// }

export default ChatStore
