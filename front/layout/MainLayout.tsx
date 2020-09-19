import clsx from "clsx"
import React, { FC, ReactComponentElement, ReactElement, useCallback, useEffect } from "react"
import st from "./MainLayout.module.css"
import Copyright from "../components/Copyright"
import styled from "styled-components"
import { RootStore, useStore } from "../stores"
import { makeStyles, useTheme, Theme, createStyles } from "@material-ui/core/styles"
import Drawer from "@material-ui/core/Drawer"
import CssBaseline from "@material-ui/core/CssBaseline"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import List from "@material-ui/core/List"
import Typography from "@material-ui/core/Typography"
import Divider from "@material-ui/core/Divider"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import ChevronRightIcon from "@material-ui/icons/ChevronRight"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import AssignmentIcon from "@material-ui/icons/Assignment"
import ChatIcon from "@material-ui/icons/Chat"
import MapIcon from "@material-ui/icons/Map"
import MiniProfile from "./MiniProfile"
import DeleteIcon from "@material-ui/icons/Delete"
import { PageLink } from "../components/PageLink"
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount"
// mobx
import { observer } from "mobx-react"
import { useRouter } from "next/dist/client/router"
// cookie
import cookie from "react-cookies"

const Footer = styled.footer`
  width: 100%;
  height: 100px;
  border-top: 1px solid #eaeaea;
  display: flex;
  justify-content: center;
  align-items: center;
`
const drawerWidth = 240

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      // flexDirection: "column",
    },
    appBar: {
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: "none",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: "flex-end",
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
    menuRightContent: {
      padding: theme.spacing(0, 1),
    },
    menuRightDiv: {
      display: "flex",
      marginLeft: "auto",
    },
  }),
)

const MainLayout: FC<{
  children: ReactComponentElement<any, any>
}> = ({ children }) => {
  const classes = useStyles()
  const theme = useTheme()
  const [open, setOpen] = React.useState(false)
  const { meStore } = useStore()
  const router = useRouter()

  useEffect(() => {
    cookie.remove("token", { path: "/" })
    router.push("/")
    meStore.initialize()
  }, [meStore, meStore.isLogouted])

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const isLoggedIn = useCallback(() => {
    return meStore && meStore.id !== -1
  }, [meStore])

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position='fixed'
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' noWrap>
            메뉴
          </Typography>
          <div className={classes.menuRightDiv}>
            <PageLink href='/login'>
              <Typography
                className={clsx(classes.menuRightContent, isLoggedIn() && classes.hide)}
                variant='h6'
                noWrap
              >
                로그인
              </Typography>
            </PageLink>
            <PageLink href='/register'>
              <Typography
                className={clsx(classes.menuRightContent, isLoggedIn() && classes.hide)}
                variant='h6'
                noWrap
              >
                회원가입
              </Typography>
            </PageLink>
            {isLoggedIn() ? <MiniProfile></MiniProfile> : ""}
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant='persistent'
        anchor='left'
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <PageLink href='userboard'>
            <ListItem button>
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary={"게시판"} />
            </ListItem>
          </PageLink>
          <PageLink href='posts'>
            <ListItem button>
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary={"게시판_테스트용"} />
            </ListItem>
          </PageLink>
          <PageLink href='chat'>
            <ListItem button>
              <ListItemIcon>
                <ChatIcon />
              </ListItemIcon>
              <ListItemText primary={"채팅하기"} />
            </ListItem>
          </PageLink>
        </List>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon>
              <MapIcon />
            </ListItemIcon>
            <ListItemText primary={"지도 보기"} />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText primary={"쓰레기통!"} />
          </ListItem>
        </List>
        <Divider />
        <List>
          <PageLink href='/admin'>
            <ListItem button>
              <ListItemIcon>
                <SupervisorAccountIcon />
              </ListItemIcon>
              <ListItemText primary={"관리자"} />
            </ListItem>
          </PageLink>
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        {children}
        <Footer>
          <Copyright />
        </Footer>
      </main>
    </div>
  )
}

export default observer(MainLayout)
