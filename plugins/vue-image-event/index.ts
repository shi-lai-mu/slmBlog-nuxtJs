
export default {
  install(Vue, options) {
    
    Vue.directive('img', {
      inserted(target: HTMLImageElement, params) {
        if (target instanceof HTMLImageElement) {
          const Img = new Image();
          Img.onerror = () => {
            target.src = '/error.jpg';
            target.setAttribute('error-src', Img.src);
          };
          Img.onload = () => {
            target.classList.add('load-success');
            target.src = Img.src;
          };
          Img.src = target.src;
          target.src = '/loading.gif';
        }
        console.dir(Vue);
        Vue.$observer.on('scroll-in-el', data => {
          console.log(data);
        })
      }
    });
  }
}
