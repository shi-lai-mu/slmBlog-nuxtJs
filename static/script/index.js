/* tslint:disable */
window.less = {
  async: false,
  env: 'production'
};

setTimeout(() => {
  var less = document.createElement('script');
  less.src = '/script/less.min.js';
  document.body.append(less);
});