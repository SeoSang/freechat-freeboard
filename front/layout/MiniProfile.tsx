import React from "react"
import { IconButton, Menu, MenuItem, Typography, makeStyles } from "@material-ui/core"
import { observer } from "mobx-react"
import AccountCircle from "@material-ui/icons/AccountCircle"
import { useStore } from "../stores"

const useStyles = makeStyles((theme) => ({
  profileMenu: {
    padding: theme.spacing(3),
  },
}))

const MiniProfile = () => {
  const st = useStyles()
  const { meStore } = useStore()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  const onClickLogout = () => {
    meStore.logOut()
  }

  return (
    <div>
      <IconButton
        aria-label='account of current user'
        aria-controls='menu-appbar'
        aria-haspopup='true'
        onClick={handleMenu}
        color='inherit'
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id='menu-appbar'
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={open}
        onClose={handleClose}
      >
        <Typography className={st.profileMenu} variant='body1'>
          안녕하세요 <br />
          {meStore && meStore.nickname} 님!
        </Typography>
        <MenuItem onClick={handleClose}>프로필 페이지</MenuItem>
        <MenuItem onClick={onClickLogout}>로그아웃</MenuItem>
      </Menu>
    </div>
  )
}

export default observer(MiniProfile)
