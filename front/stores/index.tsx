import React, { FC } from "react"
import { action, observable } from "mobx"
import { useLocalStore, useStaticRendering } from "mobx-react"
// Stores
import MeStore, { initialMeState } from "./me"
import PostStore from "./post"
import { MainUserData } from "../types/user"
import ChatStore from "./chat"

const isServer = typeof window === "undefined"
let store: RootStore | null = null
useStaticRendering(isServer)

export const initialRootState = {
  meState: initialMeState,
}

export class RootStore {
  constructor(meData: MainUserData | null = null) {
    this.meStore = new MeStore(this, meData)
    this.postStore = new PostStore(this)
    this.chatStore = new ChatStore(this)
  }
  @observable meStore: MeStore
  @observable postStore: PostStore
  @observable chatStore: ChatStore

  @action init() {
    this.meStore = new MeStore(this, null)
    this.postStore = new PostStore(this)
    this.chatStore = new ChatStore(this)
  }
}

export default function initializeStore(meData: MainUserData | null = null) {
  if (isServer) {
    return new RootStore(meData)
  }
  if (store === null || meData) {
    store = new RootStore(meData)
  }

  return store
}

const storeContext = React.createContext<RootStore | null>(initializeStore())

// export const StoreProvider = ({ children }: any) => {
//   const rootStore = initializeStore()
//   return (
//     <storeContext.Provider value={rootStore}>{children}</storeContext.Provider>
//   )
// }

export const useStore = () => {
  const store = React.useContext(storeContext)
  if (!store) {
    // this is especially useful in TypeScript so you don't need to be checking for null all the time
    throw new Error("useStore must be used within a StoreProvider.")
  }
  return store
}
