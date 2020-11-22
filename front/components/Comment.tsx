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
import moment from "moment"
import { CommentData } from "../types/comment"
import { FlexDiv } from "../styles/div"

const useStyles = makeStyles((theme) => ({
  root: {
    width: "90%",
    backgroundColor: "#F1F0F0",
    marginTop: theme.spacing(2),
  },
  fonts: {
    fontWeight: "bold",
  },
  inline: {
    display: "inline",
  },
  titleContainer: {
    display: "flex",
    width: "100%",
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(2),
  },
}))

const Comment = ({ comments }: { comments: CommentData[] }) => {
  const classes = useStyles()
  return (
    <List className={classes.root}>
      <div className={classes.titleContainer}>
        <Typography variant='h6'>댓글</Typography>
      </div>
      <Divider style={{ alignSelf: "stretch" }} variant='middle' />
      {comments?.map((comment) => {
        return (
          <React.Fragment key={comment.id}>
            <ListItem key={comment.id} alignItems='flex-start'>
              <ListItemAvatar>
                <Avatar alt='avatar' src={Faker.image.avatar()} />
              </ListItemAvatar>
              <ListItemText
                primary={<Typography className={classes.fonts}>{comment.Users?.name}</Typography>}
                secondary={
                  <>
                    <Typography
                      component='span'
                      variant='body1'
                      className={classes.inline}
                      color='textPrimary'
                    >
                      {comment.Users?.nickname}
                    </Typography>
                    {` - ${comment.text}`}
                  </>
                }
              />
              <Typography variant='body2'>{moment(comment.createdAt).format("lll")}</Typography>
            </ListItem>
            <Divider />
          </React.Fragment>
        )
      })}
    </List>
  )
}

export default Comment
