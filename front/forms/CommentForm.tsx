import { Button, TextField } from "@material-ui/core"
import { observer } from "mobx-react"
import React, { useState } from "react"
import { useStore } from "../stores"
import { FlexDiv } from "../styles/div"

const CommentForm = ({ postId }: { postId: number }) => {
  const [helperText, setHelperText] = useState("")
  const [commentText, setCommentText] = useState("")
  const [visible, setVisible] = useState(false)
  const { postStore } = useStore()

  const handleCommentText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentText(e.target.value)
    commentText.length < 2
      ? setHelperText("댓글이 너무 짧습니다")
      : setHelperText("")
  }

  const onClickCancle = () => {
    setVisible(false)
  }

  const onClickSubmit = async () => {
    const result = await postStore.addComment(postId, commentText)
    alert(result)
    window.location.reload()
  }

  return (
    <div style={{ width: "100%", margin: "0.5rem 0" }}>
      <TextField
        id='outlined-full-width'
        label='댓글을 입력하세요'
        placeholder='Placeholder'
        helperText={helperText}
        fullWidth
        multiline
        margin='normal'
        InputLabelProps={{
          shrink: true,
        }}
        variant='outlined'
        value={commentText}
        onChange={handleCommentText}
        onFocus={() => {
          setVisible(true)
        }}
      />
      {visible ? (
        <FlexDiv justify='flex-end'>
          <Button
            style={{ marginRight: "0.5em" }}
            variant='contained'
            color='secondary'
            onClick={onClickCancle}>
            취소
          </Button>
          <Button variant='contained' color='primary' onClick={onClickSubmit}>
            댓글
          </Button>
        </FlexDiv>
      ) : (
        ""
      )}
    </div>
  )
}

export default observer(CommentForm)
