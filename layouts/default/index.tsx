import Head from './header'
import Footer from './footer'
import Body from './body'
import React from 'react'
import { CSSTransition } from 'react-transition-group';
import './index.scss'

interface DefauleLayoutsProps {
  // 当前一级路由名
  active: string;
}

export default class DefauleLayouts extends React.Component<DefauleLayoutsProps>  {

  state = {
    transitionIn: true,
  }

  /**
   * 处理跳转事件
   */
  private transitionEvent() {
    this.setState({
      transitionIn: !this.state.transitionIn,
    })
    setTimeout(() => {
      this.setState({
        transitionIn: !this.state.transitionIn,
      })
    }, 300)
  }

  render() {
    return (
      <>
        <Head active={ this.props.active } onRouterEvent={ this.transitionEvent.bind(this) } />
        <CSSTransition
          timeout={300}
          classNames='show'
          appear={true}
          in={ this.state.transitionIn }
          unmountOnExit={true}>
          <Body>
            { this.props.children }
          </Body>
        </CSSTransition>
        <Footer/>
      </>
    )
  }
}