import React, { FC, ReactComponentElement, ReactElement } from "react"
import st from "./MainLayout.module.css"
import MenuLayout from "./MenuLayout"
import Copyright from "../components/Copyright"
import styled from "styled-components"
import { RootStore } from "../stores"

const Footer = styled.footer`
  width: 100%;
  height: 100px;
  border-top: 1px solid #eaeaea;
  display: flex;
  justify-content: center;
  align-items: center;
`

const MainLayout: FC<{
  children: ReactComponentElement<any, any>
}> = ({ children }) => {
  return (
    <div className={st.main_viewport}>
      <MenuLayout />
      <div className={st.content}>{children}</div>
      <Footer>
        <Copyright />
      </Footer>
    </div>
  )
}

export default MainLayout
