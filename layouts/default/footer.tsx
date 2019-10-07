import React from 'react'
import Link from 'next/link'
import { unForm } from '../../utils/date'

export default class LayoutsDefauleFooter extends React.Component {

  state = {
    loadTime: 0,
    currentTime: Date.now(),
  }

  componentDidMount() {
    // 站点加载完成事件添加
    window.addEventListener('load', () => {
      this.setState({
        loadTime: Date.now() - performance.timing.fetchStart,
      })
    })
    // 站点运行时间计算
    setInterval(() => {
      this.setState({
        currentTime: unForm(1535150280000),
      })
    }, 1000)
  }

  render() {
    const { loadTime, currentTime } = this.state

    return (
      <div className="default-layouts-footer">
        <div className="web-info">
          <div>© CopyRight 2018-2019, <a href="//slmblog.com">SLMBLOG.COM</a>, Inc.All Rights Reserved.</div>
          <div className="copyright-right">
            <Link href={{ pathname: "/other/terms" }}>
              <a data-tag="page-toggle">条款和免责</a>
            </Link>
            <Link href={{ pathname: "/other/about"}}>
              <a data-tag="page-toggle">关于本站</a>
            </Link>
          </div>
          <div className="web-param">
            <span>渲染{ loadTime }ms</span>
            <span>站点已运行 { currentTime }</span>
          </div>
        </div>
        <div className="beian">
          <span className="beian-a">
            <a target="_blank" className="beian-sn" href="//www.miitbeian.gov.cn">浙ICP备18049156号-2</a>
            <a target="_blank" href="//www.beian.gov.cn">(浙公网安备 33038102331168号)</a>
          </span>
        </div>
      </div>
    )
  }
 }