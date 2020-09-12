import React, { useContext } from "react"
import st from "./MainLayout.module.css"
import classNames from "classnames"
import { PageLink } from "../components/PageLink"
import { observer } from "mobx-react"
import MiniProfile from "./MiniProfile"
import { RootStore, useStore } from "../stores"
import axios from "axios"
import { BACKEND_URL } from "../util/util"

const MenuLayout = observer(() => {
  const { meStore } = useStore()
  console.log(meStore)
  const onClickLogout = async () => {
    try {
      await axios.post(`${BACKEND_URL}/api/user/logout`, null, {
        withCredentials: true,
      })
      meStore.logOut()
    } catch (e) {
      console.error(e)
    }
  }
  return (
    <div className={classNames("flex-div", st.menu_bar)}>
      <div className={classNames("flex-div", st.menu_bar__left)}>
        <PageLink href='/'>
          <div className={classNames(st.menu_content, st.menu_logo)}>로고</div>
        </PageLink>
        <div className={(st.menu_content, st.searchbar)}>
          <input placeholder='검색 내용을 입력하세요'></input>
        </div>
        <div className={st.menu_content}>게시판</div>
        <div className={st.menu_content}>커뮤니티</div>
      </div>
      {meStore && meStore.id === -1 ? (
        <div className={classNames("flex-div", st.menu_bar__right)}>
          <PageLink href='/login'>
            <div className={st.menu_content}>로그인</div>
          </PageLink>
          <PageLink href='/register'>
            <div className={st.menu_content}>회원가입</div>
          </PageLink>
          <div className={st.menu_content}>내 정보</div>
        </div>
      ) : (
        <div className={classNames("flex-div", st.menu_bar__right)}>
          <MiniProfile></MiniProfile>
          <div onClick={onClickLogout} className={st.menu_content}>
            로그아웃
          </div>
        </div>
      )}
    </div>
  )
})

export default MenuLayout
