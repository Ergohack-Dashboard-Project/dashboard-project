import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Ergdash</title>
        <meta name="description" content="An ergo token dashboard to track your entire portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Ergdash!
        </h1>
      </main>

      <footer className={styles.footer}>

      </footer>
    </div>
  )
}