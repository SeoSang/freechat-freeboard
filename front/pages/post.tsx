import { Divider, Typography } from "@material-ui/core"
import { convertFromRaw, Editor, EditorState } from "draft-js"
import { observer } from "mobx-react"
import { useRouter } from "next/dist/client/router"
import React, { useEffect, useMemo } from "react"
import Comment from "../components/Comment"
import CommentForm from "../forms/CommentForm"
import { useStore } from "../stores"
import { FlexDiv } from "../styles/div"

const post = () => {
  const router = useRouter()
  const { id } = router.query as { id: string }
  const { postStore } = useStore()

  useEffect(() => {
    if (id) postStore.getPost(id)
    console.log(postStore.post.text)
  }, [id])

  const text = useMemo(() => {
    const editorState = postStore.post.text
      ? EditorState.createWithContent(
          convertFromRaw(JSON.parse(postStore.post.text))
        )
      : EditorState.createEmpty()
    return editorState
  }, [postStore.post])

  return (
    <FlexDiv direction='column'>
      <FlexDiv width='100%' justify='flex-start'>
        <Typography variant='h6'>
          {postStore.post.User?.nickname} 님의 글
        </Typography>
      </FlexDiv>
      <Typography variant='h5'>{postStore.post.title}</Typography>
      <Editor onChange={() => {}} editorState={text} readOnly={true} />
      <Divider style={{ alignSelf: "stretch" }} variant='middle' />
      <FlexDiv width='100%' justify='flex-start'>
        <Typography variant='h6'>댓글</Typography>
      </FlexDiv>
      <Comment
        comments={
          postStore.post.Comments ? postStore.post.Comments : []
        }></Comment>
      {/* <FlexDiv width='100%' direction='column'>
        {postStore.post.Comments
          ? postStore.post.Comments.map((comment) => <div>comment 테스트</div>)
          : ""}
      </FlexDiv> */}
      <Divider style={{ alignSelf: "stretch" }} variant='middle' />
      <Divider variant='middle' />
      <CommentForm postId={parseInt(id)}></CommentForm>
    </FlexDiv>
  )
}

export default observer(post)
