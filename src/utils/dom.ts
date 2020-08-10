import { Size } from '../types';

/**
 * get the element's bounding size
 * @param ele dom element
 * @returns the element width and height
 */
export function getContainerSize(ele: HTMLElement): Size {
  if (!ele) {
    return { width: 0, height: 0 };
  }
  const style = getComputedStyle(ele);

  return {
    width:
      (ele.clientWidth || parseInt(style.width, 10)) -
      parseInt(style.paddingLeft, 10) -
      parseInt(style.paddingRight, 10),
    height:
      (ele.clientHeight || parseInt(style.height, 10)) -
      parseInt(style.paddingTop, 10) -
      parseInt(style.paddingBottom, 10),
  };
}
