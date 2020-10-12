import React, { useMemo, useEffect, FC } from "react"
// next
import { AppPropsType } from "next/dist/next-server/lib/utils"
import Head from "next/head"
// mobx
import { observer, Provider } from "mobx-react"
// material-ui
import { ThemeProvider } from "@material-ui/styles"
import CssBaseline from "@material-ui/core/CssBaseline"
import theme from "../styles/theme"
// custom
import MainLayout from "../layout/MainLayout"
import initializeStore from "../stores"
import { useCookies, CookiesProvider } from "react-cookie"
// css
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import "../styles/globals.css"
import { MainUserData } from "../types/user"

interface myAppPropsType extends AppPropsType {
  meData: MainUserData
}

const MyApp = ({ Component, pageProps, meData }: myAppPropsType) => {
  // const [cookies, setCookie] = useCookies(["token"])
  // useEffect(() => {
  //   const tokenValue = cookies.get("token")
  //   axios.defaults.headers.common["authorization"] = tokenValue
  // })
  // console.log(meData)
  const store = useMemo(() => {
    const rootStore = initializeStore(meData)
    return rootStore
  }, [])

  useEffect(() => {
    console.log("_app useEffect")
    if (store.meStore.id != -1) return
    store.meStore.loadMe()
  }, [])

  return (
    <>
      <Head>
        <title>make-everything</title>
        <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width' />
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

// MyApp.getInitialProps = async (context: Context) => {
//   const { ctx, Component } = context
//   // 서버일때만 쿠키 준다 (클라이언트일때는 알아서 쿠키 줌)
//   console.log(ctx)
//   const cookie = ctx.req.headers.cookie
//   if (cookie) {
//     axios.defaults.headers.Cookie = cookie // 모든 axios 에 적용
//   }
//   try {
//     const response = await axios.get(`${BACKEND_URL}/api/user`, { withCredentials: true })
//     const me: MainUserData = response.data
//     console.log(me)
//     return {
//       meData: me, // will be passed to the page component as props
//     }
//   } catch (e) {
//     console.log("error")
//     return {
//       props: { meData: null },
//     }
//   }
// }

export default observer(MyApp)
