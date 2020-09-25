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
import io from "socket.io-client"
import axios from "axios"
import { observer } from "mobx-react"
import { useStore } from "../stores"
import { BACKEND_URL } from "../util/util"
import { ChatData } from "../types/chat"
import { useRouter } from "next/dist/client/router"

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    width: "80%",
    padding: theme.spacing(2),
    background: "white",
    margin: "10px auto",
    borderRadius: "10px",
    maxHeight: "70%",
    overflow: "auto",
    flexWrap: "nowrap",
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

const room = () => {
  const st = useStyles()
  const [startDate, setStartDate] = useState("")
  const [message, setMessage] = useState("")
  const router = useRouter()
  const { id, password } = router.query as { id: string; password: string }
  const { chatStore, meStore } = useStore()

  useEffect(() => {
    console.log("here")
    setStartDate(moment().format("LLL"))
    const socket = io.connect(`${BACKEND_URL}/chat`, {
      path: "/socket.io",
    })
    console.log(socket)

    socket.on("join", function (data: ChatData) {
      chatStore.getChat(data)
    })
    socket.on("exit", function (data: ChatData) {
      chatStore.getChat(data)
    })
    socket.on("chat", function (data: ChatData) {
      console.log("채팅을 받음")
      chatStore.getChat(data)
    })
  }, [chatStore])

  useEffect(() => {
    const loadRoom = async () => {
      if (id) {
        chatStore.loadRoom(parseInt(id), password)
      }
    }
    loadRoom()
  }, [id])

  const sendMessage = (event: React.MouseEvent | React.KeyboardEvent) => {
    event.preventDefault()

    if (message) {
      chatStore.sendChat(message)
    } else {
      return alert("메세지를 입력해주세요")
    }
  }

  return (
    <FlexDiv
      className={st.mainContainer}
      direction='column'
      align='center'
      justify='flex-start'
      width='70%'>
      <Typography className={st.title} variant='h5'>
        {chatStore.room.title}
      </Typography>
      <Typography className={st.title} variant='body1'>
        {moment(chatStore.room.createdAt).format("LLL")}
      </Typography>
      {chatStore.chats.map((chat, i) => (
        <ChatMessage me={meStore.id === chat.UserId} txt={chat.chat} key={i} />
      ))}
      <ChatMessage me={false} txt={"하이여😀"} />
      <ChatMessage me={true} txt={"테스트중"} />
      <ChatMessage me={true} txt={"테스트중"} />
      <FlexDiv>
        <input
          accept='image/*'
          className={st.input}
          id='contained-button-file'
          multiple
          onKeyPress={(event) =>
            event.key === "Enter" ? sendMessage(event) : null
          }
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
          value={message}
          onChange={(e) => {
            setMessage(e.target.value)
          }}
          multiline={true}
          onKeyPress={(event) =>
            event.key === "Enter" ? sendMessage(event) : null
          }
        />
        <Button color='primary' variant='contained' onClick={sendMessage}>
          전송
        </Button>
      </FlexDiv>
    </FlexDiv>
  )
}

export default observer(room)
