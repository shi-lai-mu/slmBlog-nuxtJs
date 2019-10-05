
import Link from 'next/link'

export default () => {
  return (
    <div className="default-layouts-footer">
      <div className="copyright clearfix">
        <span className="copyright-left">© CopyRight 2018-2019, <a href="//mczyzy.cn">SLMBLOG.COM</a>, Inc.All Rights Reserved.</span>
        <ul className="copyright-right">
          <Link href={{ pathname: "/other/terms" }}>
            <li>条款和免责</li>
          </Link>
          <Link href={{ pathname: "/other/thisSite"}}>
            <li>关于本站</li>
          </Link>
        </ul>
      </div>
      <div className="beian clearfix">
        <span className="beian-a">
          <img className="beian-img" src="/static/images/police_badge.png"/>
          <p className="beian-p">
            <a target="_blank" href="//www.miitbeian.gov.cn">浙ICP备18049156号-2</a>
            <a target="_blank" href="//www.beian.gov.cn">(浙公网安备 33038102331168号)</a>
          </p>
        </span>
      </div>
    </div>
  )
 }