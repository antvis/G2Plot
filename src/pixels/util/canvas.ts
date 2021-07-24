import { normalPadding } from '../../utils/padding';
import { BBox } from '../type';

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
 * 设置 canvas 的位置
 */
export function setCanvasPosition(canvas: HTMLCanvasElement, left: number, top: number) {
  canvas.style.position = 'absolute';
  canvas.style.top = `${top}px`;
  canvas.style.left = `${left}px`;
}

/**
 * 设置 canvas 的大小
 */
export function changeCanvasSize(canvas: HTMLCanvasElement, width: number, height: number) {
  canvas.setAttribute('width', `${width}`);
  canvas.setAttribute('height', `${height}`);
}

/**
 * 转换成 region 格式
 */
export function getRegionFromBBox(bbox: BBox) {
  return {
    start: {
      x: bbox.x,
      y: bbox.y,
    },
    end: {
      x: bbox.x + bbox.width,
      y: bbox.y + bbox.height,
    },
  };
}
