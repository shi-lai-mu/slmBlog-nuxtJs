declare global {
  interface Window {
    mozRequestAnimationFrame?: any;
    oRequestAnimationFrame?: any;
    msRequestAnimationFrame?: any;
  }
}
/**
 * 获取当前帧数
 */
export const getFPS = (callBacks: (data) => boolean) => {
  const requestAnimationFrame =
    window.requestAnimationFrame          // Chromium  
    || window.webkitRequestAnimationFrame // Webkit 
    || window.mozRequestAnimationFrame    // Mozilla Geko 
    || window.oRequestAnimationFrame      // Opera Presto 
    || window.msRequestAnimationFrame     // IE Trident? 
    || function AnimationFrame(cb: any) { window.setTimeout(cb, 1000/60) } // Fallback function
  ;
  let fps = 0;
  let offset = 0;
  let last = Date.now();
  
  const step = () => { 
    offset = Date.now() - last; 
    fps += 1; 
    if(offset >= 1000) {
      last += offset;
      if (callBacks(fps)) {
        return;
      }
      fps = 0;
    }
    requestAnimationFrame(step); 
  };
  requestAnimationFrame(step); 
};
