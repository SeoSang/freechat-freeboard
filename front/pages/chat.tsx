import { makeStyles, Typography } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import ChatMessage from "../components/ChatMessage"
import { FlexDiv } from "../styles/div"
import moment from "moment"

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    width: "80%",
    padding: theme.spacing(2),
    background: "white",
    margin: "10px auto",
    borderRadius: "10px",
  },
  title: {
    fontWeight: 600,
    marginBottom: theme.spacing(1),
  },
}))

const chat = () => {
  const st = useStyles()
  const [startDate, setStartDate] = useState("")
  useEffect(() => {
    setStartDate(moment().format("LLL"))
  })

  return (
    <FlexDiv
      className={st.mainContainer}
      direction='column'
      align='center'
      width='70%'>
      <Typography className={st.title} variant='h5'>
        채팅방5
      </Typography>
      <Typography className={st.title} variant='body1'>
        {startDate}
      </Typography>
      <ChatMessage me={true} txt={"안녕하세용"} />
      <ChatMessage me={false} txt={"하이여😀"} />
      <ChatMessage me={true} txt={"테스트중"} />
      <ChatMessage me={true} txt={"테스트중"} />
      채팅 서비스 제공 예정
    </FlexDiv>
  )
}

export default chat
