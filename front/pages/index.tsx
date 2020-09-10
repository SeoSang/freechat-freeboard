import React from "react"
import Head from "next/head"
import styles from "../styles/Home.module.css"
import Copyright from "../components/Copyright"

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>SeoSang</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>안녕하세요!</h1>
        <h2 className={styles.title}>
          <a href='#'>서상혁</a>의 포트폴리오 입니다!
        </h2>
      </main>

      <footer className={styles.footer}>
        <Copyright />
      </footer>
    </div>
  )
}
