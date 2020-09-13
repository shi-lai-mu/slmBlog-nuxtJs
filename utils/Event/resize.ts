export default (win: Window, vue: Vue) => {
  win.addEventListener('resize', () => {
    console.log(vue);
  });
};
