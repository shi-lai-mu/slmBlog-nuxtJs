import React from 'react'
import Logo from '../../components/logo'
import Link from 'next/link'
import '../../static/scss/other/thisSite.scss'

export default class OtherThisSite extends React.Component {
  state = {
    friendship: [],
  }

  render() {
    const { friendship } = this.state

    return (
      <div className="conter single clearfix">
        <div className="content-box friendship">
          <Logo size={100}/>
          <h2>史莱姆的个人博客</h2>
          <h3 className="friendship-desc">本博客涉及范围html5,css3,es6,微信小程序,网站开发,技术交流,源码分享,php,nodejs</h3>
          <a className="button-lv1" href="#no1">申请友链</a>
        </div>

        <div className="content-box friendship">
          <h2 className="friendship-tag">友情 链接</h2>
          <ul className="friendship friendship-list">
            {
              friendship.map((item: any) => (
                <li>
                    <Link href={{ pathname: item.web }}>
                      <a target="_black"></a>
                    </Link>
                    <img src={item.icon} alt={ item.name + ' LOGO' } />
                    <span className="friendship-name">{ item.name }</span>
                    <span className="friendship-desc">{ item.desc }</span>
                </li>
              ))
            }
          </ul>
        </div>

        <div className="content-box friendship" id="no1">
          <h2 className="friendship-tag">友情 链接 申请</h2>

          <div className="child-box">
            <h4 className="child-tag">友链申请须知:</h4>
            <ol>
              <li><b>优先:</b>与本站相近内容、原创博客、百度收录、谷歌收录、IT网站、个人博客、技术博客、学员博客、H5</li>
              <li><b>拒收:</b>站内包含 违法内容、过多广告及广告元素</li>
              <li><b>首页:</b>内容优质、原创文章、极速访问、交互流畅、原创UI</li>
              <li><b>删除:</b>长期不能访问、删除本站友链</li>
            </ol>
          </div>

          <div className="child-box">
            <h4 className="child-tag">贵站友链内容:</h4>
            <ul>
              <li><b>名称:</b>史莱姆的博客</li>
              <li><b>域名:</b><a href="//mczyzy.cn" title="史莱姆的博客">http://mczyzy.cn</a></li>
              <li><b>简介:</b>一个注重技术研究与分享的博客。(可包含)</li>
              <li><b>图标:</b><a href="//slmblog.com/LOGO.png" title="本站LOGO">slmblog.com/LOGO.png</a></li>
            </ul>
          </div>

          <div className="child-box">
            <h4 className="child-tag">友链 申请/修改:</h4>
            <ul>
              <li><b>必须:</b>先友后链(先在贵站挂上本站友链)</li>
              <li><b>需知:</b>如果本站在贵站首页，则贵站就会在本站的首页反之则在内页或按(友链申请须知 [首页筛选] )</li>
              <li><b>邮件:</b>以友链标准格式发送至 slm@mczyzy.cn !</li>
              <li><b>感谢:</b>感谢阅读完本条约!</li>
            </ul>
          </div>

          <div className="child-box">
            <h4 className="child-tag">友链格式:</h4>
            <ul>
              <li><b>名称:</b>xxxxxxxxxx</li>
              <li><b>域名:</b>网站首页网址</li>
              <li><b>类型:</b>个人博客、IT站点 ...</li>
              <li><b>简介:</b>尽量简短的简介</li>
              <li><b>图标:</b>可以是favicon等外部图片 ...</li>
            </ul>
            <h5>ps: 博主会在尽快在贵站核实友链后，在本站按条约添加贵站的友链!谢谢合作!</h5>
          </div>

        </div>
      </div>
    )
  }
}