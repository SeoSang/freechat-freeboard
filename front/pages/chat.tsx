import {
  Button,
  IconButton,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core"
import React, { useEffect, useState } from "react"
import ChatMessage from "../components/ChatMessage"
import { FlexDiv } from "../styles/div"
import moment from "moment"
import { PhotoCamera } from "@material-ui/icons"

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
  chatContainer: {
    margin: theme.spacing(0, 1),
  },
  input: {
    display: "none",
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
      <FlexDiv>
        <input
          accept='image/*'
          className={st.input}
          id='contained-button-file'
          multiple
          type='file'
        />
        <label htmlFor='contained-button-file'>
          <IconButton
            color='primary'
            aria-label='upload picture'
            component='span'>
            <PhotoCamera />
          </IconButton>
        </label>
        <TextField
          className={st.chatContainer}
          variant='outlined'
          label='채팅을 입력하세요'
          multiline={true}
        />
        <Button color='primary' variant='contained'>
          전송
        </Button>
      </FlexDiv>
    </FlexDiv>
  )
}

export default chat
