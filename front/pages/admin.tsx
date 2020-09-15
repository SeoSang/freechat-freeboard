import { Button, Input, Typography } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { useStore } from "../stores"
import { FlexDiv } from "../styles/div"

const admin = () => {
  const [category, setCategory] = useState("")
  const { postStore } = useStore()

  useEffect(() => {
    postStore.getCategories()
  }, [])

  const onChangeCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value)
  }

  const onSubmitCategory = () => {
    postStore.addCategory(category)
  }

  return (
    <FlexDiv justify='flex-start'>
      <div>
        <Typography>카테고리</Typography>
        <Input value={category} onChange={onChangeCategory}></Input>
        <Button variant='contained' onClick={onSubmitCategory}>
          추가하기
        </Button>
      </div>
    </FlexDiv>
  )
}

export default admin
