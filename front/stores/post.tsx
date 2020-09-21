import { observable, action, computed, flow } from "mobx"
import { RootStore, useStore } from "."
import axios from "axios"
import { BACKEND_URL } from "../util/util"
import { PostsPost, PostData } from "../types/post"

export const initialPostState = {
  categories: [],
  post: {} as PostData,
  posts: [] as PostsPost[],
  getCategoriesError: "",
  addCategoriesError: "",
  getPostError: "",
  getPostsError: "",
  addPostError: "",
  addPostSuccess: false,
  addCommentSuccess: false,
}

class PostStore {
  @observable categories = initialPostState.categories
  @observable post = initialPostState.post
  @observable posts = initialPostState.posts
  @observable getCategoriesError = initialPostState.getCategoriesError
  @observable addCategoriesError = initialPostState.addCategoriesError
  @observable getPostError = initialPostState.getPostError
  @observable getPostsError = initialPostState.getPostsError
  @observable addPostError = initialPostState.addPostError
  @observable addPostSuccess = initialPostState.addPostSuccess
  @observable addCommentSuccess = initialPostState.addCommentSuccess
  public root

  constructor(root: RootStore) {
    this.root = root
  }

  // 카테고리
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

  // 포스트
  getPosts = flow(function* () {
    try {
      const result = yield axios.get(`${BACKEND_URL}/api/posts`, {
        withCredentials: true,
      })
      yield console.log("getPosts result => ", result)
      this.posts = result.data
    } catch (e) {
      yield console.log(e)
      this.getPostsError = e
    }
  })

  getPost = flow(function* (postId: string) {
    try {
      const result = yield axios.get(`${BACKEND_URL}/api/post/${postId}`, {
        withCredentials: true,
      })
      yield console.log("getPost result => ", result)
      this.post = result.data
    } catch (e) {
      yield console.log(e)
      this.getPostError = e
    }
  })

  addPost = flow(function* (categoryId: number, title: string, text: any) {
    const data = {
      categoryId,
      title,
      text: JSON.stringify(text),
    }
    yield console.log(data)
    const result = yield axios.post(`${BACKEND_URL}/api/post`, data, {
      withCredentials: true,
    })
    yield console.log("addPost result => ", result)
    this.posts.push(result.data)
    this.addPostSuccess = true
  })

  addComment = flow(function* (postId: number, text: string) {
    try {
      const data = {
        postId,
        text,
      }
      yield console.log(data)
      const result = yield axios.post(`${BACKEND_URL}/api/comment`, data, {
        withCredentials: true,
      })
      yield console.log("addComment result => ", result.data)
      this.post.Comments.push(result.data)
      this.addCommentSuccess = true
    } catch (e) {
      console.error(e)
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
