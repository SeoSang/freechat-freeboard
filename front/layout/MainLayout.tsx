import React, { FC, ReactComponentElement, ReactElement } from "react"
import st from "./MainLayout.module.css"
import classNames from "classnames"
import Link from "next/link"
import { FlexDiv } from "../styles/div"

export const PageLink = ({
  href,
  children,
}: {
  href: string
  children: ReactElement
}) => {
  return (
    <Link href={href}>
      <a>{children}</a>
    </Link>
  )
}

const MainLayout: FC<{ children: ReactComponentElement<any, any> }> = ({
  children,
}) => {
  return (
    <div className={st.main_viewport}>
      <div className={classNames("flex-div", st.menu_bar)}>
        <div className={classNames("flex-div", st.menu_bar__left)}>
          <PageLink href='/'>
            <div className={classNames(st.menu_content, st.menu_logo)}>
              로고
            </div>
          </PageLink>
          <div className={(st.menu_content, st.searchbar)}>
            <input placeholder='검색 내용을 입력하세요'></input>
          </div>
          <div className={st.menu_content}>게시판</div>
          <div className={st.menu_content}>커뮤니티</div>
        </div>
        <div className={classNames("flex-div", st.menu_bar__right)}>
          <PageLink href='/login'>
            <div className={st.menu_content}>로그인</div>
          </PageLink>
          <div className={st.menu_content}>회원가입</div>
          <div className={st.menu_content}>로고</div>
        </div>
      </div>
      <div style={{ padding: "10%" }} className={st.content}>
        {children}
      </div>
    </div>
  )
}

export default MainLayout
