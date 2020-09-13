import "../styles/globals.css"
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

function MyApp({ Component, pageProps }: AppPropsType) {
  // useEffect(() => {
  //   const jssStyles = document.querySelector("#jss-server-side")
  //   if (jssStyles) {
  //     jssStyles!.parentNode!.removeChild(jssStyles)
  //   }
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
        <Provider store={store}>
          {/* <CssBaseline /> */}
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </Provider>
      </ThemeProvider>
    </>
  )
}

export default MyApp
