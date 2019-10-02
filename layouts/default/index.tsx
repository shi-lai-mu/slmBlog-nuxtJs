import Head from './header'
import Footer from './footer'
import * as React from 'react'
import './index.scss'

export default class DefauleLayouts extends React.Component<any, any>  {

  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <>
        <Head />
          { this.props.children }
        <Footer/>
      </>
    )
  }
}