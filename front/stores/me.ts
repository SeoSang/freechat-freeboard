import { observable, action, computed, reaction } from "mobx"
import { RootStore, useStore } from "."
import { UserAttributes } from "../types/user"

export const initialMeState = {
  id: -1,
  name: "",
  nickname: "",
  email: "",
}

class MeStore {
  @observable id = initialMeState.id
  @observable name = initialMeState.name
  @observable nickname = initialMeState.nickname
  @observable email = initialMeState.email
  public root

  constructor(root: RootStore) {
    this.root = root
  }

  // hydrate(serializedStore) {}

  @action setMe = (user: UserAttributes) => {
    this.id = user.id
    this.name = user.name
    this.nickname = user.nickname ? user.nickname : ""
    this.email = user.email
  }

  @action logOut = () => {
    this.id = initialMeState.id
    this.name = initialMeState.name
    this.nickname = initialMeState.nickname
    this.email = initialMeState.email
  }

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

export default MeStore
