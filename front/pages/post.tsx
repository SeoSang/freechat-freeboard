import { Divider, Typography } from "@material-ui/core"
import { convertFromRaw, Editor, EditorState } from "draft-js"
import { observer } from "mobx-react"
import { useRouter } from "next/dist/client/router"
import React, { useEffect, useMemo, useState } from "react"
import Comment from "../components/Comment"
import CommentForm from "../forms/CommentForm"
import { useStore } from "../stores"
import { FlexDiv } from "../styles/div"

const post = () => {
  const router = useRouter()
  const { id } = router.query as { id: string }
  const { postStore } = useStore()
  const [error, setError] = useState(false)

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
        ? EditorState.createWithContent(
            convertFromRaw(JSON.parse(postStore.post?.text))
          )
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
      <FlexDiv width='100%' justify='flex-start'>
        <Typography variant='h6'>
          {postStore.post?.User?.nickname} 님의 글
        </Typography>
      </FlexDiv>
      <Typography variant='h5'>{postStore.post?.title}</Typography>
      <Editor onChange={() => {}} editorState={text as any} readOnly={true} />
      <Divider style={{ alignSelf: "stretch" }} variant='middle' />
      <FlexDiv width='100%' justify='flex-start'>
        <Typography variant='h6'>댓글</Typography>
      </FlexDiv>
      <Comment
        comments={
          postStore.post?.Comments ? postStore.post.Comments : []
        }></Comment>
      <Divider style={{ alignSelf: "stretch" }} variant='middle' />
      <Divider variant='middle' />
      <CommentForm postId={parseInt(id)}></CommentForm>
    </FlexDiv>
  )
}

export default observer(post)
