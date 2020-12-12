export default context => {
  if (process.env.NODE_ENV === 'production') return;
  
  context.userAgent = process.server
    ? context.req.headers["user-agent"]
    : navigator.userAgent;

  const isMobile = !!context.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
  context.store.commit('setClientUA', isMobile);
}