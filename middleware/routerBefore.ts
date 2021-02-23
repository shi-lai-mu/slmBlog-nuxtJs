import nodeCookie from 'cookie';

export default async context => {
  // if (process.env.NODE_ENV === 'production') return;
  
  context.userAgent = process.server
    ? context.req?.headers["user-agent"]
    : navigator.userAgent;


  // 解析cookie
  if (context.req?.headers.cookie) {
    const cookies = nodeCookie.parse(context.req.headers.cookie);
    let config: any = false;
    // 从cookie中读取web设置
    if (cookies.web) {
      config = JSON.parse(cookies.web);
    }
    context.store.commit('config/setWebOptions', config);
    console.log({config, th: context.store.state.config.setting.theme.color});
  }

  const isMobile = !!context.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
  context.store.commit('setClientUA', isMobile);
}