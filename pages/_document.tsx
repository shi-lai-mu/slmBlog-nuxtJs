import Document, { Head, Main, NextScript } from 'next/document'

export default class MysDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <html>
        <Head>
          <meta charset="utf-8"/>
          <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
          <meta data-hid="description" name="description" itemprop="description" content="欢迎浏览史莱姆的博客٩( °༥° )و，让我们一起交流技术一起嗨皮分享！史莱姆的博客为个人站点，注重前端开发。"/>
          <meta name="keywords" content="史莱姆的博客,html5,css3,es6,微信小程序,网站开发,技术交流,源码分享,php,nodejs"/>
          <meta name="referrer" content="origin"/>
          <meta name="renderer" content="webkit"/>
          <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
          <meta itemprop="author" content="史莱姆[qq: 478889187]"/>
          <meta itemprop="image" data-hid="qqlogo" content="https://img.slmblog.com/QQLOGO.jpg"/>
          <meta itemprop="name" data-hid="qqname" content="史莱姆的博客"/>
          <meta name="format-detection" content="telephone=no"/>
          <meta name="robots" content="all"/>
          <meta name="Copyright" content="slmblog.com"/>
          <meta name="theme-color" content="#fff"/>
          <meta name="baidu-site-verification" content="y5VuyW34xO"/>
          <meta name="google-site-verification" content="LsmBI4ZEP2h0Ni17kTFRG7A_kKO7zONt51w_GYjM2Gs"/>
          <link rel="icon" type="image/x-icon" href="https://slmblog.com/favicon.ico"/>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}