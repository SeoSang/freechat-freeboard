import { observable, action, computed, flow } from "mobx"
import { RootStore, useStore } from "."
import axios from "axios"
import { BACKEND_URL } from "../util/util"

export const initialChatState = {
  rooms: [],
  chats: [],
  soketId: -1,
  getRoomsError: "",
}

class ChatStore {
  @observable rooms = initialChatState.rooms
  @observable chats = initialChatState.chats
  @observable soketId = initialChatState.soketId
  public root

  constructor(root: RootStore) {
    this.root = root
  }

  // 카테고리
  getRooms = flow(function* () {
    this.getRoomsError = ""
    try {
      const result = yield axios.get(`${BACKEND_URL}/api/rooms`, {
        withCredentials: true,
      })
      yield console.log("getRooms result => ", result)
      this.rooms = result.data
    } catch (e) {
      yield console.log(e)
      this.getRoomsError = e.response
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
