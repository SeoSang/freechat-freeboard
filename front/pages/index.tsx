import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import styled from "styled-components"
import { FlexDiv } from "../styles/div"
import { Typography, CssBaseline } from "@material-ui/core"

const IndexH2 = styled(Typography)`
  a {
    color: #0070f3;
    text-decoration: none;
  }
`

const IndexH1 = styled(Typography)``

const useStyles = makeStyles((theme) => ({
  h1: {
    marginBottom: theme.spacing(4),
    fontWeight: "bolder",
  },
  h2: {
    fontWeight: "bold",
  },
}))

export default function Home() {
  const styles = useStyles()
  return (
    <FlexDiv direction='column' height='100%'>
      <CssBaseline />
      <IndexH1 className={styles.h1} variant='h1'>
        안녕하세요!
      </IndexH1>
      <IndexH2 className={styles.h2} variant='h2'>
        <a href='#'>서상혁</a>의 포트폴리오 입니다!
      </IndexH2>
    </FlexDiv>
  )
}
