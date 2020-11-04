import { createStyles, makeStyles, Theme } from "@material-ui/core"
export const useDivStyles = makeStyles((theme: Theme) =>
  createStyles({
    centerFlex: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    coloumCenterFlex: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    },
  })
)
export const useTypicalStyles = makeStyles((theme: Theme) =>
  createStyles({
    center: {
      textAlign: "center",
    },
    comment: {
      color: "gray",
      fontStyle: "italic",
    },
  })
)

export const useMarginStyles = makeStyles((theme: Theme) =>
  createStyles({
    mar1: {
      margin: theme.spacing(1),
    },
    mar2: {
      margin: theme.spacing(2),
    },
    mar3: {
      margin: theme.spacing(3),
    },
    mar4: {
      margin: theme.spacing(4),
    },
    marLeft1: {
      marginLeft: theme.spacing(1),
    },
    marLeft2: {
      marginLeft: theme.spacing(2),
    },
    marLeft3: {
      marginLeft: theme.spacing(3),
    },
    marLeft4: {
      marginLeft: theme.spacing(4),
    },
    marLeft5: {
      marginLeft: theme.spacing(5),
    },
    marRight1: {
      marginRight: theme.spacing(1),
    },
    marRight2: {
      marginRight: theme.spacing(2),
    },
    marRight3: {
      marginRight: theme.spacing(3),
    },
    marRight4: {
      marginRight: theme.spacing(4),
    },
    marRight5: {
      marginRight: theme.spacing(5),
    },
    marTop1: {
      marginTop: theme.spacing(1),
    },
    marTop2: {
      marginTop: theme.spacing(2),
    },
    marTop3: {
      marginTop: theme.spacing(3),
    },
    marTop4: {
      marginTop: theme.spacing(4),
    },
    marTop5: {
      marginTop: theme.spacing(5),
    },
    marBottom1: {
      marginBottom: theme.spacing(1),
    },
    marBottom2: {
      marginBottom: theme.spacing(2),
    },
    marBottom3: {
      marginBottom: theme.spacing(3),
    },
    marBottom4: {
      marginBottom: theme.spacing(4),
    },
    marBottom5: {
      marginBottom: theme.spacing(5),
    },
  })
)

export const usePaddingStyles = makeStyles((theme: Theme) =>
  createStyles({
    pad1: {
      padding: theme.spacing(1),
    },
    pad2: {
      padding: theme.spacing(2),
    },
    pad3: {
      padding: theme.spacing(3),
    },
    pad4: {
      padding: theme.spacing(4),
    },
    padLeft1: {
      paddingLeft: theme.spacing(1),
    },
    padLeft2: {
      paddingLeft: theme.spacing(2),
    },
    padLeft3: {
      paddingLeft: theme.spacing(3),
    },
    padLeft4: {
      paddingLeft: theme.spacing(4),
    },
    padLeft5: {
      paddingLeft: theme.spacing(5),
    },
    padRight1: {
      paddingRight: theme.spacing(1),
    },
    padRight2: {
      paddingRight: theme.spacing(2),
    },
    padRight3: {
      paddingRight: theme.spacing(3),
    },
    padRight4: {
      paddingRight: theme.spacing(4),
    },
    padRight5: {
      paddingRight: theme.spacing(5),
    },
    padTop1: {
      paddingTop: theme.spacing(1),
    },
    padTop2: {
      paddingTop: theme.spacing(2),
    },
    padTop3: {
      paddingTop: theme.spacing(3),
    },
    padTop4: {
      paddingTop: theme.spacing(4),
    },
    padTop5: {
      paddingTop: theme.spacing(5),
    },
    padBottom1: {
      paddingBottom: theme.spacing(1),
    },
    padBottom2: {
      paddingBottom: theme.spacing(2),
    },
    padBottom3: {
      paddingBottom: theme.spacing(3),
    },
    padBottom4: {
      paddingBottom: theme.spacing(4),
    },
    padBottom5: {
      paddingBottom: theme.spacing(5),
    },
  })
)
