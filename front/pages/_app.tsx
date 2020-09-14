import React, { useMemo, useEffect } from "react"
// next
import { AppPropsType } from "next/dist/next-server/lib/utils"
import Head from "next/head"
// mobx
import { Provider } from "mobx-react"
// material-ui
import { ThemeProvider } from "@material-ui/styles"
import CssBaseline from "@material-ui/core/CssBaseline"
import theme from "../styles/theme"
// custom
import MainLayout from "../layout/MainLayout"
import initializeStore from "../stores"
import { useCookies, CookiesProvider } from "react-cookie"
import axios from "axios"
// css
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import "../styles/globals.css"

function MyApp({ Component, pageProps }: AppPropsType) {
  // const [cookies, setCookie] = useCookies(["token"])
  // useEffect(() => {
  //   const tokenValue = cookies.get("token")
  //   axios.defaults.headers.common["authorization"] = tokenValue
  // })

  const store = useMemo(() => {
    const rootStore = initializeStore()
    return rootStore
  }, [])

  return (
    <>
      <Head>
        <title>make-everything</title>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <ThemeProvider theme={theme}>
        <CookiesProvider>
          <Provider store={store}>
            {/* <CssBaseline /> */}
            <MainLayout>
              <Component {...pageProps} />
            </MainLayout>
          </Provider>
        </CookiesProvider>
      </ThemeProvider>
    </>
  )
}

export default MyApp
