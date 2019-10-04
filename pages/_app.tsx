import App from 'next/app'
import React from 'react'
import { Provider } from 'mobx-react'
import store from '../store'
import DefaultLayouts from '../layouts/default'
// import { Head } from 'next/document'
// import ReactComment from './components/annotation'

export default class MyApp extends App {
  static async getInitialProps ({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    return {pageProps}
  }

  render () {
    const {Component, pageProps} = this.props
    return (
      <Provider {...store}>
        <DefaultLayouts>
          <Component {...pageProps} />
        </DefaultLayouts>
      </Provider>
    )
  }
}