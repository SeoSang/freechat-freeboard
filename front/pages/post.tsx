import { Typography } from "@material-ui/core"
import { convertFromRaw, Editor, EditorState } from "draft-js"
import { observer } from "mobx-react"
import { useRouter } from "next/dist/client/router"
import React, { useEffect, useMemo } from "react"
import { useStore } from "../stores"
import { FlexDiv } from "../styles/div"

const post = () => {
  const router = useRouter()
  const { id } = router.query as { id: string }
  const { postStore } = useStore()

  console.log(postStore.post)

  useEffect(() => {
    if (id) postStore.getPost(id)
    console.log(postStore.post.text)
  }, [id])

  const text = useMemo(() => {
    const editorState = postStore.post.text
      ? EditorState.createWithContent(convertFromRaw(JSON.parse(postStore.post.text)))
      : EditorState.createEmpty()
    return editorState
  }, [postStore.post])

  return (
    <FlexDiv direction='column'>
      <Typography variant='h5'>{postStore.post.title}</Typography>
      <Editor onChange={() => {}} editorState={text} readOnly={true} />
    </FlexDiv>
  )
}

export default observer(post)
