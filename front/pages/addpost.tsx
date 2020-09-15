import dynamic from "next/dynamic" // (if using Next.js or use own dynamic loader)
import React, { useState } from "react"
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
  MenuItem,
  Select,
} from "@material-ui/core"
import { ClassSharp } from "@material-ui/icons"
import axios from "axios"
import { BACKEND_URL } from "../util/util"
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
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
)

const addPost = () => {
  const classes = useStyle()
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const [category, setCategory] = useState<any>(10)

  const onEditorStateChange = (es: EditorState) => {
    setEditorState(es)
  }
  const onCategoryChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    setCategory(e.target.value)
  }
  const onClickUpload = async () => {
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/post`,
        convertToRaw(editorState.getCurrentContent()),
        { withCredentials: true }
      )
      console.log(res)
    } catch (e) {}
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
            <MenuItem value={10}>음악</MenuItem>
            <MenuItem value={20}>취미</MenuItem>
            <MenuItem value={30}>동물/반려견</MenuItem>
          </Select>
        </FormControl>
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

export default addPost
