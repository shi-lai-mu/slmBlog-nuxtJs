import nodeCookie from 'cookie';

import { getSelfInfo } from "@/service/data/user";

export default async context => {
  // if (process.env.NODE_ENV === 'production') return;
  
  context.userAgent = process.server
    ? context.req?.headers["user-agent"]
    : navigator.userAgent;


  // 解析cookie
  if (context.req?.headers.cookie) {
    const cookies = nodeCookie.parse(context.req.headers.cookie);
    const token = cookies.token;
    let config: any = false;

    // 从cookie中读取web设置
    if (cookies.web) {
      config = JSON.parse(cookies.web);
    }

    if (token) {
      const res: any = await getSelfInfo({
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      context.store.commit('initUser', res.result);
      context.store.commit('setJWT', token);
    }
    context.store.commit('setWebOptions', config);
  }

  const isMobile = !!context.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
  context.store.commit('setClientUA', isMobile);
}