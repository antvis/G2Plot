import { BBox } from '../type';

/**
 * 判断点位置是否在像素图包围盒中
 */
export function isInPixelBBox(x: number, y: number, bbox: BBox) {
  return bbox.x <= x && x <= bbox.x + bbox.width && bbox.y <= y && y <= bbox.y + bbox.height;
}
