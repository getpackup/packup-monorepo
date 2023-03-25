import 'tailwindcss/tailwind.css'

import { AppProps } from 'next/app'
import Head from 'next/head'

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Expert packing lists for camping and outdoor adventure | Packup</title>
      </Head>
      <div className="app">
        <main>
          <Component {...pageProps} />
        </main>
      </div>
    </>
  )
}
export default CustomApp
