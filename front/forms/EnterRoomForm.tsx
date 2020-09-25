import {
  Button,
  createStyles,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core"
import { observer } from "mobx-react"
import { useRouter } from "next/dist/client/router"
import React, { useEffect } from "react"
import { useStore } from "../stores"
import { FlexDiv } from "../styles/div"

function getModalStyle() {
  return {
    top: `30%`,
    left: `60%`,
    transform: `translate(-60%, -30%)`,
  }
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    title: {
      fontWeight: 600,
      marginBottom: theme.spacing(2),
    },
    label: {
      width: "30%",
      textAlign: "center",
      padding: theme.spacing(1),
    },
    input: {
      textAlign: "center",
      width: "70%",
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    button: {
      marginTop: theme.spacing(2),
    },
  })
)

const ChattingRoomForm = ({
  roomId,
  max,
  title,
}: {
  roomId: number
  max: number
  title: string
}) => {
  const [modalStyle] = React.useState(getModalStyle)
  const [password, setPassword] = React.useState("")
  const router = useRouter()
  const { chatStore } = useStore()
  const st = useStyles()

  const onSubmit = async () => {
    const result = await chatStore.isPasswordCorrect(password, roomId)
    if (result === "성공") {
      alert("방에 입장합니다!")
      router.push({
        pathname: `/room`,
        query: { id: roomId.toString(), password },
      })
    } else {
      alert(result)
    }
  }

  return (
    <div style={modalStyle} className={st.paper}>
      <FlexDiv direction='column'>
        <Typography className={st.title} variant='h4'>
          비밀번호 입력하세요
        </Typography>
        <FlexDiv width='100%' justify='space-around'>
          <Typography className={st.label}>방제목</Typography>
          <TextField value={title} className={st.input}></TextField>
        </FlexDiv>
        <FlexDiv width='100%' justify='space-around'>
          <Typography className={st.label}>최대인원</Typography>
          <TextField value={max} className={st.input}></TextField>
        </FlexDiv>
        <FlexDiv width='100%' justify='space-around'>
          <Typography className={st.label}>비밀번호</Typography>
          <TextField
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            type='password'
            className={st.input}></TextField>
        </FlexDiv>
        <Button className={st.button} variant='contained' onClick={onSubmit}>
          입장하기
        </Button>
      </FlexDiv>
    </div>
  )
}

export default observer(ChattingRoomForm)
