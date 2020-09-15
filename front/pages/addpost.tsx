import dynamic from "next/dynamic" // (if using Next.js or use own dynamic loader)
import React, { useEffect, useState } from "react"
// @material-ui/core components
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import InputLabel from "@material-ui/core/InputLabel"
const Editor: any = dynamic(
  () => (import("react-draft-wysiwyg") as any).then((mod: any) => mod.Editor),
  { ssr: false }
)
import { EditorState, convertToRaw } from "draft-js"
import {
  Button,
  FormControl,
  FormHelperText,
  Input,
  MenuItem,
  Select,
} from "@material-ui/core"
import axios from "axios"
import { BACKEND_URL } from "../util/util"
import { observer } from "mobx-react"
import { useStore } from "../stores"
import { FlexDiv } from "../styles/div"
import { useRouter } from "next/dist/client/router"
// core components

// const editorStyle: React.CSSProperties = {
//   minHeight: "60vh",
//   border: "1px solid #eaeaea",
//   padding: "3px 8px",
// }

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    mainContainer: {},
    upperPartContainer: {
      display: "flex",
      marginBottom: theme.spacing(1),
      alignItems: "center",
      border: "1px solid #eaeae1",
      backgroundColor: "white",
      borderRadius: "1px",
    },
    editor: {
      minHeight: "60vh",
      border: "1px solid #eaeaea",
      padding: theme.spacing(1, 2),
      backgroundColor: "white",
    },
    lowerPartContainer: {
      display: "flex",
      margin: theme.spacing(1),
      alignItems: "center",
      justifyContent: "center",
    },
    formControl: {
      margin: theme.spacing(1),
      marginRight: theme.spacing(3),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    titleInput: {
      margin: theme.spacing(0, 2),
    },
  })
)

const addPost = () => {
  const classes = useStyle()
  const { meStore, postStore } = useStore()
  const [title, setTitle] = useState("")
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const [category, setCategory] = useState<any>("")
  const router = useRouter()

  useEffect(() => {
    if (meStore.id < 0) {
      alert("로그인이 필요합니다!")
      router.push("/")
    }
    postStore.getCategories()
  }, [])

  const onEditorStateChange = (es: EditorState) => {
    setEditorState(es)
  }
  const onCategoryChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    setCategory(e.target.value)
  }
  const onClickUpload = async () => {
    if (title.trim() === "") return alert("제목을 입력해주세요")
    if (editorState === EditorState.createEmpty())
      return alert("내용을 입력해주세요")
    if (category === "") return alert("카테고리를 골라주세요")
    try {
      const text = convertToRaw(editorState.getCurrentContent())
      await postStore.addPost(category, title, text)
      alert("포스팅 성공!.")
      router.push("/")
    } catch (e) {
      alert("포스팅이 실패하였습니다. 에러가 지속되면 관리자에게 문의해주세요.")
    }
  }
  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  return (
    <div>
      <div className={classes.upperPartContainer}>
        <FormControl className={classes.formControl}>
          <InputLabel id='demo-simple-select-helper-label'>카테고리</InputLabel>
          <Select
            labelId='demo-simple-select-helper-label'
            id='demo-simple-select-helper'
            value={category}
            onChange={onCategoryChange}>
            <MenuItem value=''>
              <em>None</em>
            </MenuItem>
            {postStore && postStore.categories
              ? postStore.categories.map((obj: any) => (
                  <MenuItem
                    onChange={(e) => {
                      setCategory(obj.id)
                    }}
                    value={obj.id}
                    key={obj.name}>
                    {obj.name}
                  </MenuItem>
                ))
              : ""}
          </Select>
        </FormControl>
        <FlexDiv direction='column'>
          <InputLabel></InputLabel>
          <FlexDiv justify='center'>
            <InputLabel>제목</InputLabel>
            <Input
              className={classes.titleInput}
              value={title}
              onChange={onTitleChange}
              placeholder='제목을 입력하세요.'></Input>
          </FlexDiv>
        </FlexDiv>
      </div>
      <div className={classes.mainContainer}>
        <Editor
          editorState={editorState}
          toolbarClassName='toolbarClassName'
          wrapperClassName='wrapperClassName'
          editorClassName={classes.editor}
          // editorStyle={editorStyle}
          onEditorStateChange={onEditorStateChange}
          hashtag={{
            separator: " ",
            trigger: "#",
          }}
        />
      </div>
      <div className={classes.lowerPartContainer}>
        <Button onClick={onClickUpload} variant='contained' color='primary'>
          게시하기
        </Button>
      </div>
    </div>
  )
}

export default observer(addPost)
