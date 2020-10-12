import React from "react"
import { FlexDiv } from "../styles/div"
import { Button, Typography, Input } from "@material-ui/core"

const LoginForm = () => {
  return (
    <FlexDiv
      style={{ padding: "20px" }}
      direction='column'
      height='100%'
      align='flex-start'
      justify='space-between'>
      <Typography variant='h5'>아이디</Typography>
      <Input></Input>
      <Typography variant='h5' component='span'>
        비밀번호
      </Typography>
      <Input></Input>
      <div style={{ marginTop: "20px", alignSelf: "center" }}>
        <Button variant='contained'>로그인</Button>
        <Button variant='contained'>회원가입</Button>
      </div>
    </FlexDiv>
  )
}

export default LoginForm
