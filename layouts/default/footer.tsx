
import Link from 'next/link'

export default () => {
  return (
    <div>
      <footer className="body-footer">
        <div className="copyright clearfix">
          <span className="copyright-left">© CopyRight 2018-2019, <a href="//mczyzy.cn">SLMBLOG.COM</a>, Inc.All Rights Reserved.</span>
          <ul className="copyright-right">
            <li><Link href="/other/terms">条款和免责</Link></li>
            <li><Link href="/other/thisSite">关于本站</Link></li>
          </ul>
        </div>
        <div className="beian clearfix">
          <span className="beian-a">
            <img className="beian-img" src="/img/police_badge.png"/>
            <p className="beian-p">
              <a target="_blank" href="//www.miitbeian.gov.cn">浙ICP备18049156号-2</a>
              <a target="_blank" href="//www.beian.gov.cn">(浙公网安备 33038102331168号)</a>
            </p>
          </span>
        </div>
      </footer>
      <style>{`
        .footer {
          width: 100%;
          padding: 0 70px;
          border-top: 1px solid #eee;
          box-sizing: border-box
        }
        .footer .footer-inner {
          width: 100%;
          display: flex;
          flex: 1;
          justify-content: center;
          height: 50px;
          align-items: center;
          font-size: 12px;
          color: #999999
        }
      `}</style>
    </div>
  )
 }