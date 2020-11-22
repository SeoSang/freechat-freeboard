import { createStyles, Divider, Grid, makeStyles, Theme, Typography } from "@material-ui/core"
import { convertFromRaw, Editor, EditorState } from "draft-js"
import { observer } from "mobx-react"
import { useRouter } from "next/dist/client/router"
import React, { useEffect, useMemo, useState } from "react"
import Comment from "../components/Comment"
import CommentForm from "../forms/CommentForm"
import { useStore } from "../stores"
import { useMarginStyles } from "../styles/cssStyles"
import { FlexDiv } from "../styles/div"
import VisibilityIcon from "@material-ui/icons/Visibility"
import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone"
import moment from "moment"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    postContainer: {
      minHeight: "20vh",
      backgroundColor: "white",
      marginTop: theme.spacing(5),
      marginBottom: theme.spacing(5),
      width: "90%",
    },
    textContainer: {
      height: "100%",
      padding: theme.spacing(2),
    },
    authorContainer: {
      padding: theme.spacing(1),
    },
  }),
)

const post = () => {
  const router = useRouter()
  const { id } = router.query as { id: string }
  const { postStore } = useStore()
  const [error, setError] = useState(false)
  const st = useStyles()
  const mar = useMarginStyles()

  useEffect(() => {
    moment.locale("kor")
  }, [])

  useEffect(() => {
    const getPost = async (ID: string) => {
      const result = await postStore.getPost(ID)
      if (result.status != 200) {
        alert(result.text)
        router.push("/")
      }
    }
    getPost(id)
  }, [id])

  const text = useMemo(() => {
    console.log(postStore.post?.text)
    try {
      const editorState = postStore.post?.text
        ? EditorState.createWithContent(convertFromRaw(JSON.parse(postStore.post?.text)))
        : EditorState.createEmpty()
      return editorState
    } catch (e) {
      console.log(e)
      setError(true)
    }
  }, [postStore.post])
  if (error) return <div>에러가 발생하였습니다 ㅠ</div>

  return (
    <FlexDiv direction='column'>
      <div className={st.postContainer}>
        <Typography className={mar.mar2} variant='h6'>
          {postStore.post?.title}
        </Typography>
        <Divider style={{ alignSelf: "stretch" }} variant='middle' />
        <Grid container className={st.authorContainer}>
          <Grid container xs={2} md={1} direction='row' justify='center' alignItems='center'>
            <PhoneIphoneIcon></PhoneIphoneIcon>
          </Grid>
          <Grid container xs={9} md={6}>
            <Typography variant='subtitle1'>{postStore.post?.Writters?.nickname}</Typography>
          </Grid>
          {/* {xs ? <Divider style={{ alignSelf: "stretch" }} variant='middle' /> : ""} */}
          <Grid container xs={8} md={3} justify='center' alignItems='center'>
            {moment(postStore.post?.createdAt).format("MMMM Do / a h:mm")}
          </Grid>
          <Grid container xs={4} md={1}>
            <VisibilityIcon></VisibilityIcon>
            {"12"}
          </Grid>
        </Grid>
        <Divider style={{ alignSelf: "stretch" }} variant='middle' />
        <div className={st.textContainer}>
          <Editor onChange={() => {}} editorState={text as any} readOnly={true} />
        </div>
      </div>
      <Divider style={{ alignSelf: "stretch" }} variant='middle' />
      <Comment comments={postStore.post?.Comments ? postStore.post.Comments : []}></Comment>
      <Divider style={{ alignSelf: "stretch" }} variant='middle' />
      <Divider variant='middle' />
      <CommentForm postId={parseInt(id)}></CommentForm>
    </FlexDiv>
  )
}

export default observer(post)
