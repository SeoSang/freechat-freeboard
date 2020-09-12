import React from "react"
import { action, observable } from "mobx"
import { useStaticRendering } from "mobx-react"
// Stores
import MeStore, { initialMeState } from "./me"

const isServer = typeof window === "undefined"
let store: any = null
useStaticRendering(isServer)

export const initialRootState = {
  meState: initialMeState,
}

export class RootStore {
  constructor(initialState: typeof initialRootState) {
    this.meStore = new MeStore()
  }
  @observable meStore: MeStore
}

export default function initializeStore(initialState = initialRootState) {
  if (isServer) {
    return new RootStore(initialState)
  }
  if (store === null) {
    store = new RootStore(initialState)
  }

  return store
}

export const useStore = () => {
  const rootStore: RootStore = initializeStore()
  return React.useContext(React.createContext(rootStore))
}
