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

const ChattingRoomForm = () => {
  const [modalStyle] = React.useState(getModalStyle)

  const [max, setMax] = React.useState(2)
  const [title, setTitle] = React.useState("")
  const [password, setPassword] = React.useState("")
  const router = useRouter()
  const { chatStore } = useStore()
  const st = useStyles()

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setMax(event.target.value as number)
  }

  useEffect(() => {
    if (chatStore.addRoomError !== "") {
      alert(chatStore.addRoomError.statusText)
    }
  }, [chatStore.addRoomError])

  const onSubmit = async () => {
    if (title === "") return alert("방 제목을 입력해주세요")
    const result: any = await chatStore.addRoom(title, max, password)
    if (result) {
      alert("방 생성이 완료되었습니다!")
      router.push(
        `/room?id=${result.data?.id}&password=${result.data?.password}`
      )
    }
  }

  return (
    <div style={modalStyle} className={st.paper}>
      <FlexDiv direction='column'>
        <Typography className={st.title} variant='h4'>
          방 생성
        </Typography>
        <FlexDiv width='100%' justify='space-around'>
          <Typography className={st.label}>인원 수</Typography>
          <FormControl variant='outlined' className={st.formControl}>
            <InputLabel>인원수</InputLabel>
            <Select value={max} onChange={handleChange} label='인원수'>
              <MenuItem value=''>
                <em>None</em>
              </MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
            </Select>
          </FormControl>
        </FlexDiv>
        <FlexDiv width='100%' justify='space-around'>
          <Typography className={st.label}>방제목</Typography>
          <TextField
            value={title}
            onChange={(e) => {
              setTitle(e.target.value)
            }}
            className={st.input}></TextField>
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
          생성하기
        </Button>
      </FlexDiv>
    </div>
  )
}

export default observer(ChattingRoomForm)
