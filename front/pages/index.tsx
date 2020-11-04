import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import styled from "styled-components"
import { FlexDiv } from "../styles/div"
import {
  Typography,
  CssBaseline,
  Button,
  Theme,
  createStyles,
  Modal,
  Divider,
} from "@material-ui/core"
import { useMarginStyles, useTypicalStyles } from "../styles/cssStyles"
import IconCopyright from "../components/IconCopyright"
import Backdrop from "@material-ui/core/Backdrop"
import Fade from "@material-ui/core/Fade"
import TakeThisBoard from "../components/TakeThisBoard"
import { useRouter } from "next/dist/client/router"

const IndexH2 = styled(Typography)`
  a {
    color: #0070f3;
    text-decoration: none;
  }
`

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    h1: {
      marginBottom: theme.spacing(4),
      fontWeight: "bolder",
    },
    h2: {
      fontWeight: "bold",
    },
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  })
)

export default function Home() {
  const styles = useStyles()
  const mar = useMarginStyles()
  const typ = useTypicalStyles()

  const router = useRouter()
  const [open, setOpen] = React.useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const onClickChat = () => {
    router.push("/rooms")
  }

  const onClickBoard = () => {
    router.push("/posts")
  }

  return (
    <FlexDiv style={{ position: "relative" }} direction='column' height='100vh'>
      <CssBaseline />
      <FlexDiv>
        <div className={typ.center}>
          <div onClick={onClickChat} className='imgBox'>
            <img className='img' src='chat.png' />
          </div>
          <Typography variant='h5'>비밀채팅방</Typography>
        </div>
        <div className={typ.center}>
          <div onClick={onClickBoard} className='imgBox'>
            <img className='img' src='board.png' />
          </div>
          <Typography variant='h5'>공용게시판</Typography>
        </div>
      </FlexDiv>
      <Button
        className={mar.mar2}
        onClick={handleOpen}
        variant='contained'
        color='primary'>
        이것들도 보고 가세요
      </Button>
      <Divider light />
      <Modal
        className={styles.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}>
        <Fade in={open}>
          <TakeThisBoard></TakeThisBoard>
        </Fade>
      </Modal>
      <IconCopyright />
    </FlexDiv>
  )
}
