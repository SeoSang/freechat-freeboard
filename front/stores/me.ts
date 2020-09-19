import axios from "axios"
import { observable, action, computed, reaction, flow } from "mobx"
import { RootStore, useStore } from "."
import { UserAttributes, LoginFormValues, MainUserData } from "../types/user"
import { BACKEND_URL } from "../util/util"

export const initialMeState = {
  id: -1,
  name: "",
  nickname: "",
  email: "",
  isLogined: false,
  isLogouted: false,
}

class MeStore {
  @observable id = initialMeState.id
  @observable name = initialMeState.name
  @observable nickname = initialMeState.nickname
  @observable email = initialMeState.email
  @observable isLogined = initialMeState.isLogined
  @observable isLogouted = initialMeState.isLogouted
  public root

  constructor(root: RootStore) {
    this.root = root
  }

  @action initialize = () => {
    this.id = initialMeState.id
    this.name = initialMeState.name
    this.nickname = initialMeState.nickname
    this.email = initialMeState.email
    this.isLogined = initialMeState.isLogined
    this.isLogouted = initialMeState.isLogouted
  }

  @action setMe = (user: UserAttributes) => {
    this.id = user.id
    this.name = user.name
    this.nickname = user.nickname ? user.nickname : ""
    this.email = user.email
    this.isLogined = true
  }

  @action loadMe = flow(function*() {
    try {
      const response = yield axios.get(`${BACKEND_URL}/api/user`, { withCredentials: true })
      const me: MainUserData = response.data
      yield this.setMe(me)
    } catch (e) {}
  })

  @action login = flow(function*(data: LoginFormValues) {
    try {
      const response = yield axios.post(`${BACKEND_URL}/api/user/login`, data, {
        withCredentials: true,
      })
      const me: MainUserData = response.data
      if (me) {
        yield alert(`${me.nickname} 님 로그인되었습니다!`)
        yield this.setMe(me)
      }
    } catch (e) {
      const statusCode = e.response.status
      switch (statusCode) {
        case 410:
          alert("존재하지 않는 이메일입니다요~")
          break
        case 403:
          alert("비밀번호가 틀립니다요~")
          break
        default:
          alert("로그인 실패입니다요~")
          break
      }
    }
  })

  @action logOut = flow(function*() {
    yield axios
      .post(`${BACKEND_URL}/api/user/logout`)
      .then((res) => {
        alert("로그아웃 성공!!!")
        this.id = initialMeState.id
        this.name = initialMeState.name
        this.nickname = initialMeState.nickname
        this.email = initialMeState.email
        this.isLogined = false
        this.isLogouted = true
      })
      .catch((err) => {
        alert("로그아웃 실패했어유ㅠ")
      })
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

export default MeStore
