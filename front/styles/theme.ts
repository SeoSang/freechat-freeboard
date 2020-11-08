import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles"
import { red } from "@material-ui/core/colors"

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#9ddfd3",
    },
    secondary: {
      main: "#ffdada",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#F9F9F9",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  typography: {
    fontFamily: `"Noto Sans KR", "Roboto", "Helvetica", "Arial", sans-serif`,
  },
})

export default responsiveFontSizes(theme)
