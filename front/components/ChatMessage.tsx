import { makeStyles } from "@material-ui/core"
import React from "react"
import clsx from "clsx"

const useStyles = makeStyles((theme) => ({
  messageContainer: {
    display: "flex",
    width: "100%",
  },
  messageBox: {
    display: "flex",
    maxWidth: "60%",
    padding: theme.spacing(1, 2),
    borderRadius: "20px",
    marginBottom: theme.spacing(1),
  },
  meContainer: {
    justifyContent: "flex-end",
  },
  meBox: {
    backgroundColor: "#007AFF",
    color: "#FFFFFF",
  },
  otherContainer: {
    justifyContent: "flex-start",
  },
  otherBox: {
    backgroundColor: "#F4F4F8",
  },
}))

const ChatMessage = ({ me, txt }: { me: boolean; txt: string }) => {
  const st = useStyles()
  return (
    <div
      className={clsx(
        st.messageContainer,
        me ? st.meContainer : st.otherContainer
      )}>
      <div className={clsx(st.messageBox, me ? st.meBox : st.otherBox)}>
        {txt}
      </div>
    </div>
  )
}

export default ChatMessage
