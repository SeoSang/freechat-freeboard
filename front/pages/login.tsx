import axios from "axios"
import React, { useState, useContext, useEffect } from "react"
import { useRouter } from "next/dist/client/router"
import Copyright from "../components/Copyright"
import { useForm } from "react-hook-form"
import { PageLink } from "../components/PageLink"
import { BACKEND_URL } from "../util/util"
import { MainUserData } from "../types/user"
// mobx
import { inject, observer } from "mobx-react"
// Type
import { LoginFormValues } from "../types/user"
// material-ui
import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import CssBaseline from "@material-ui/core/CssBaseline"
import TextField from "@material-ui/core/TextField"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"
import Link from "@material-ui/core/Link"
import Grid from "@material-ui/core/Grid"
import Box from "@material-ui/core/Box"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import { NextPage } from "next"
import { useStore } from "../stores"

const LoginFormValidator = (errors: any) => {
  if (errors.email) {
    return "올바른 이메일 주소가 아닙니다."
  }
  if (errors.password) {
    return "올바른 비밀번호가 아닙니다."
  }
  return ""
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

const Login = () => {
  const classes = useStyles()
  const router = useRouter()
  const { register, handleSubmit, errors } = useForm<LoginFormValues>()
  const [validateText, setValidateText] = useState<string>()
  const { meStore } = useStore()

  useEffect(() => {
    if (meStore.isLogined) {
      alert("로그인이 된 상태이므로 홈화면으로 전환됩니다.")
      router.push("/")
    }
  }, [meStore, meStore.isLogined])

  const onSubmit = async (data: LoginFormValues) => {
    for (const [key, value] of Object.entries(data)) {
      if (value == "") {
        setValidateText(`${key}를 입력해주세요!`)
        return
      }
    }
    await meStore.login(data)
    return
  }

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          로그인
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
            inputRef={register({
              pattern: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
            })}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
            inputRef={register}
          />
          <FormControlLabel
            control={<Checkbox value='remember' color='primary' />}
            label='Remember me'
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            로그인
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href='#' variant='body2'>
                비밀번호를 잊으셨나요?
              </Link>
            </Grid>
            <Grid item>
              <PageLink href='/register'>
                <Typography color='primary' variant='body2'>
                  {"계정이 없으신가요? 회원가입"}
                </Typography>
              </PageLink>
            </Grid>
          </Grid>
          <Grid container justify='center'>
            <Typography color='error' variant='body1'>
              {LoginFormValidator(errors)}
            </Typography>
          </Grid>
        </form>
      </div>
    </Container>
  )
}

export default observer(Login)
