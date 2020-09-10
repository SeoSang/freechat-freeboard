import "../styles/globals.css"
import React, { useEffect } from "react"
import { AppPropsType } from "next/dist/next-server/lib/utils"
import Head from "next/head"
import MainLayout from "../layout/MainLayout"
import { ThemeProvider } from "@material-ui/styles"
import CssBaseline from "@material-ui/core/CssBaseline"
import theme from "../styles/theme"

function MyApp({ Component, pageProps }: AppPropsType) {
  // useEffect(() => {
  //   const jssStyles = document.querySelector("#jss-server-side")
  //   if (jssStyles) {
  //     jssStyles!.parentNode!.removeChild(jssStyles)
  //   }
  // })

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
        {/* <CssBaseline /> */}
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </ThemeProvider>
    </>
  )
}

export default MyApp
