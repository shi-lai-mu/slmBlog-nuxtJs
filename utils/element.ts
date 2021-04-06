/**
 * 获取相当于浏览器的位置
 * @param el        元素
 * @param direction 方向
 */
export const getRelativeBrowserPos = (
  el: Element,
  direction: 'Top' | 'Right' | 'Bottom' | 'Left' | 'ALL',
  _pos?: number[],
  _posIndex?: number,
): { top:number; right:number; bottom:number; left: number; }  => {
  const pos = _pos || Array(4).fill(0);
  const directionPoint = [ 'Top', 'Right', 'Bottom', 'Left' ];
  let { top, right, bottom, left } = el?.getBoundingClientRect();
  const posArray = [ top, right, bottom, left ];
  const posIndex = _posIndex !== undefined ? _posIndex : directionPoint.indexOf(direction);

  if (posIndex === -1) { // ALL
    posArray.forEach((v, i) => pos[i] += v);
  } else {
    pos[posIndex] += posArray[posIndex];
  }

  if (el.parentElement) {
    return getRelativeBrowserPos(el.parentElement, direction, pos, posIndex);
  } else {
    [ top, right, bottom, left ] = pos;
    return { top, right, bottom, left };
  }
}