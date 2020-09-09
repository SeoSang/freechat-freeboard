import React from "react"
import { FlexDiv } from "../styles/div"
import { Button } from "@material-ui/core"

const LoginForm = () => {
  return (
    <FlexDiv
      style={{ padding: "20px" }}
      direction='column'
      align='flex-start'
      justify='space-between'>
      <h3>아이디</h3>
      <input></input>
      <h3>비밀번호</h3>
      <input></input>
      <Button
        style={{ marginTop: "20px", alignSelf: "center" }}
        variant='contained'>
        로그인
      </Button>
    </FlexDiv>
  )
}

export default LoginForm
