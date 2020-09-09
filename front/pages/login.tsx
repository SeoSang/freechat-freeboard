import React from "react"
import LoginForm from "../forms/LoginForm"
import { FlexDiv } from "../styles/div"
import { Typography } from "@material-ui/core"

const login = () => {
  return (
    <FlexDiv width='100%' height='100%' direction='column'>
      <div>Logo</div>
      <Typography variant='h3'>로그인해주세요</Typography>
      <LoginForm></LoginForm>
    </FlexDiv>
  )
}

export default login
