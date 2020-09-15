import { Button, Input, Typography } from "@material-ui/core"
import { observer } from "mobx-react"
import { useRouter } from "next/dist/client/router"
import React, { useEffect, useState } from "react"
import { useStore } from "../stores"
import { FlexDiv } from "../styles/div"

const admin = () => {
  const [category, setCategory] = useState("")
  const { meStore, postStore } = useStore()
  const router = useRouter()

  useEffect(() => {
    if (meStore.id >= 3 || meStore.id <= 0) {
      alert("권한이 없습니다!")
      router.push("/")
    }
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

export default observer(admin)
