import { makeStyles } from "@material-ui/core"
import React from "react"
import clsx from "clsx"
import { observer } from "mobx-react"

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
  systemContainer: {
    justifyContent: "center",
  },
  systemBox: {
    backgroundColor: "#d6d2c4",
  },
}))

const ChatMessage = ({ user, txt }: { user: string; txt: string }) => {
  const st = useStyles()
  return (
    <div
      className={clsx(
        st.messageContainer,
        user === "me"
          ? st.meContainer
          : user === "system"
          ? st.systemContainer
          : st.otherContainer
      )}>
      <div
        className={clsx(
          st.messageBox,
          user === "me"
            ? st.meBox
            : user === "system"
            ? st.systemBox
            : st.otherBox
        )}>
        {txt}
      </div>
    </div>
  )
}

export default observer(ChatMessage)
