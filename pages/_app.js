import Footer from '../components/Footer'
import Header from '../components/Header'
import styles from './_app.module.scss'
import useAxiosConfig from '../hooks/useAxiosConfig'
import Head from 'next/head'
import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {
  useAxiosConfig()
  return (
    <>
      <Head>
        <title>Code</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.wrapper}>
        <div className={styles.header}>
          <Header />
        </div>
        <div className={styles.content}>
          <Component {...pageProps} />
        </div>
        <div className={styles.footer}>
          <Footer />
        </div>
      </div>  
    </>
 
  )
}

export default MyApp
