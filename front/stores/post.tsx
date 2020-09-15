import { observable, action, computed, flow } from "mobx"
import { RootStore, useStore } from "."
import axios from "axios"
import { BACKEND_URL } from "../util/util"

export const initialPostState = {
  categories: [],
  getCategoriesError: "",
  addCategoriesError: "",
  posts: [],
}

class PostStore {
  @observable categories = initialPostState.categories
  @observable getCategoriesError = initialPostState.getCategoriesError
  @observable addCategoriesError = initialPostState.addCategoriesError
  @observable posts = initialPostState.posts
  public root

  constructor(root: RootStore) {
    this.root = root
  }

  // hydrate(serializedStore) {}
  getCategories = flow(function* () {
    try {
      const result = yield axios.get(`${BACKEND_URL}/api/category`, {
        withCredentials: true,
      })
      yield console.log("getCategories result => ", result)
      this.categories = result.data
    } catch (e) {
      yield console.log(e)
      this.getCategoriesError = e
    }
  })

  addCategory = flow(function* (category: string) {
    try {
      const reqBody = { name: category }
      const result = yield axios.post(`${BACKEND_URL}/api/category`, reqBody, {
        withCredentials: true,
      })
      yield console.log("addCategory result => ", result)
      this.categories.push(category)
    } catch (e) {
      yield console.log(e)
      this.addCategoriesError = e
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

export default PostStore
