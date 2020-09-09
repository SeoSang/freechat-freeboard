import React from "react"
import LoginForm from "../forms/LoginForm"
import { FlexDiv } from "../styles/div"

const login = () => {
  return (
    <FlexDiv height='100%' direction='column'>
      <div>Logo</div>
      <div>로그인해주세요</div>
      <LoginForm></LoginForm>
    </FlexDiv>
  )
}

export default login
