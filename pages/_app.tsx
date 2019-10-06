import App from 'next/app'
import React from 'react'
import { Provider } from 'mobx-react'
import store from '../store'
import DefaultLayouts from '../layouts/default'
// import { Head } from 'next/document'
// import ReactComment from './components/annotation'
import axios from '../utils/axios'

export default class MyApp extends App {
  static async getInitialProps ({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    axios.api('test').get().then(console.log)
    return {pageProps}
  }

  componentDidMount() {

    axios.api('test').then(console.log)
  }

  render () {
    const {Component, pageProps} = this.props
    return (
      <Provider {...store}>
        <DefaultLayouts active={this.props.router.route.split('/')[1]}>
          <Component {...pageProps} />
        </DefaultLayouts>
      </Provider>
    )
  }
}