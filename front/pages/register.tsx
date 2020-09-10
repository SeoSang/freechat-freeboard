import axios from "axios"
import React, { useState } from "react"
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
import { useForm } from "react-hook-form"
import Copyright from "../components/Copyright"
import { PageLink } from "../components/PageLink"
import { BACKEND_URL } from "../util/util"

type FormValues = {
  name: string
  nickname: string
  email: string
  password: string
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

const FormValidator = (errors: any) => {
  if (errors.name) {
    return "올바른 이름이 아닙니다."
  }
  if (errors.nickname) {
    return "올바른 닉네임이 아닙니다."
  }
  if (errors.email) {
    return "올바른 이메일 주소가 아닙니다."
  }
  if (errors.password) {
    return "올바른 비밀번호가 아닙니다."
  }
  return ""
}

export default function register() {
  const classes = useStyles()
  const { register, handleSubmit, watch, errors } = useForm<FormValues>()
  const [validateText, setValidateText] = useState<string>()

  const onSubmit = async (data: FormValues) => {
    for (const [key, value] of Object.entries(data)) {
      console.log(value)
      if (value == "") {
        setValidateText(`${key}를 입력해주세요!`)
        return
      }
    }
    try {
      const newUser = await axios.post(`${BACKEND_URL}/api/user/register`, data)
      console.log(newUser)
    } catch (e) {
      console.error(e)
    }
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
          회원가입
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete='name'
                name='name'
                variant='outlined'
                required
                fullWidth
                id='name'
                label='이름'
                autoFocus
                inputRef={register({
                  maxLength: 10,
                })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='nickname'
                label='별명'
                name='nickname'
                autoComplete='nickname'
                inputRef={register({
                  maxLength: 20,
                })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
                inputRef={register({
                  pattern: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
                inputRef={register}
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}>
            회원가입
          </Button>
          <Grid container justify='flex-end'>
            <Grid item>
              <PageLink href='/login'>
                <Typography color='primary' variant='body2'>
                  이미 가입하셨나요? 로그인
                </Typography>
              </PageLink>
            </Grid>
          </Grid>
          <Grid container justify='center'>
            <Typography color='error' variant='body1'>
              {FormValidator(errors)}
            </Typography>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  )
}
