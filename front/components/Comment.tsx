import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import {
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
} from "@material-ui/core"
import Faker from "faker"

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  fonts: {
    fontWeight: "bold",
  },
  inline: {
    display: "inline",
  },
}))

const Comment = ({ comments }) => {
  const classes = useStyles()
  console.log(comments)
  return (
    <List className={classes.root}>
      {comments?.map((comment) => {
        console.log("Comment", comment)
        return (
          <React.Fragment key={comment.id}>
            <ListItem key={comment.id} alignItems='flex-start'>
              <ListItemAvatar>
                <Avatar alt='avatar' src={Faker.image.avatar()} />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography className={classes.fonts}>
                    {comment.Users.name}
                  </Typography>
                }
                secondary={
                  <>
                    <Typography
                      component='span'
                      variant='body2'
                      className={classes.inline}
                      color='textPrimary'>
                      {comment.Users.nickname}
                    </Typography>
                    {` - ${comment.text}`}
                  </>
                }
              />
            </ListItem>
            <Divider />
          </React.Fragment>
        )
      })}
    </List>
  )
}

export default Comment
