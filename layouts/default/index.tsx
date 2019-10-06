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
  private transitionEvent(e) {
    const tag: string = e.target.dataset.tag
    if (!tag || tag !== 'page-toggle') return

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
      <div onClick={ this.transitionEvent.bind(this) }>
        <Head active={ this.props.active } />
        <CSSTransition
          timeout={3300}
          classNames='show'
          appear={true}
          in={ this.state.transitionIn }
          unmountOnExit={true}>
          <Body>
            { this.props.children }
          </Body>
        </CSSTransition>
        <Footer/>
      </div>
    )
  }
}