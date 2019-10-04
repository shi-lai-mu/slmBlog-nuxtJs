import Head from './header'
import Footer from './footer'
import Body from './body'
import * as React from 'react'
import './index.scss'

export default class DefauleLayouts extends React.Component<any, any>  {
  render() {
    return (
      <>
        <Head />
        <Body>
          { this.props.children }
        </Body>
        <Footer/>
      </>
    )
  }
}