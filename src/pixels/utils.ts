import { normalPadding } from '../utils/padding';
import { PixelBBox } from './canvas';

/**
 * padding 语义化
 */
export function getPaddingInfo(rawPadding: number | number[]) {
  const norPadding = normalPadding(rawPadding);
  return {
    top: norPadding[0],
    right: norPadding[1],
    bottom: norPadding[2],
    left: norPadding[3],
  };
}

/**
 * 判断点位置是否在像素图包围盒中
 */
export function isInPixelBBox(x: number, y: number, bbox: PixelBBox) {
  return bbox.x <= x && x <= bbox.x + bbox.width && bbox.y <= y && y <= bbox.y + bbox.height;
}

/**
 * 设置原生 canvas 的位置
 */
export function setCanvasPosition(canvas: HTMLCanvasElement, left: number, top: number) {
  canvas.style.position = 'absolute';
  canvas.style.top = `${top}px`;
  canvas.style.left = `${left}px`;
}
