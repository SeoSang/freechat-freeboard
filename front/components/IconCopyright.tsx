import { Divider, makeStyles } from "@material-ui/core"
import React from "react"

const useStyles = makeStyles((theme) => ({
  icon_copyright: {
    color: "gray",
    position: "absolute",
    bottom: "-14%",
    opacity: 0.3,
  },
  divider: {
    opacity: 1,
  },
}))

const IconCopyright = () => {
  const styles = useStyles()
  return (
    <div className={styles.icon_copyright}>
      <Divider className={styles.divider}></Divider>
      <div>
        Icons made by{" "}
        <a
          href='https://www.flaticon.com/authors/smashicons'
          title='Smashicons'>
          Smashicons
        </a>{" "}
        from{" "}
        <a href='https://www.flaticon.com/' title='Flaticon'>
          www.flaticon.com
        </a>
      </div>
    </div>
  )
}

export default IconCopyright
