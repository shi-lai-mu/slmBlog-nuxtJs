
import Link from 'next/link'

export default () => {
  return (
    <div className="default-layouts-footer">
      <div className="copyright clearfix">
        <div className="copyright-left">© CopyRight 2018-2019, <a href="//slmblog.com">SLMBLOG.COM</a>, Inc.All Rights Reserved.</div>
        <div className="copyright-right">
          <Link href={{ pathname: "/other/terms" }}>
            <a>条款和免责</a>
          </Link>
          <Link href={{ pathname: "/other/about"}}>
            <a>关于本站</a>
          </Link>
        </div>
      </div>
      <div className="beian clearfix">
        <span className="beian-a">
          <a target="_blank" className="beian-sn" href="//www.miitbeian.gov.cn">浙ICP备18049156号-2</a>
          <a target="_blank" href="//www.beian.gov.cn">(浙公网安备 33038102331168号)</a>
        </span>
      </div>
    </div>
  )
 }