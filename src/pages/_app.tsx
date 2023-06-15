import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import { ChakraProvider } from '@chakra-ui/react'
import heading from '@/assets/fonts/heading'
import body from '@/assets/fonts/body'
import theme from '@/theme/theme'

import { Provider } from 'react-redux'
import { wrapper } from '@/store/store'

import { SessionProvider } from 'next-auth/react'

export default function MyApp({ Component, ...appProps }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(appProps)
  const { session, ...pageProps } = props

  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-heading: ${heading.style.fontFamily};
            --font-body: ${body.style.fontFamily};
          }
        `}
      </style>
      <ChakraProvider theme={theme}>
        <SessionProvider session={session}>
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
        </SessionProvider>
      </ChakraProvider>
    </>
  )
}
