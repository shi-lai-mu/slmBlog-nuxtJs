export default (win: Window, vue: Vue) => {
  const resizeEvent = () => {
    // 宽度小于800 判为移动否则判为pc
    vue.$store.commit('setClientUA', window.innerWidth <= 1050);
  };
  win.addEventListener('resize', resizeEvent);
  resizeEvent();
};
