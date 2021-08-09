import { BBox, Point } from '../type';

/**
 * 判断点位置是否在像素图包围盒中
 */
export function isInPixelBBox(x: number, y: number, bbox: BBox) {
  return bbox.x <= x && x <= bbox.x + bbox.width && bbox.y <= y && y <= bbox.y + bbox.height;
}

export function getBrushBoxInfo(type: string, prevPos: Point, currPos: Point, pixelBBox: BBox) {
  let { x, y, width, height } = pixelBBox;

  switch (type) {
    case 'x':
      x = prevPos.x;
      width = currPos.x - prevPos.x;
      break;
    case 'y':
      y = prevPos.y;
      height = currPos.y - prevPos.y;
      break;
    case 'xy':
      x = prevPos.x;
      y = prevPos.y;
      width = currPos.x - prevPos.x;
      height = currPos.y - prevPos.y;
      break;
  }
  return { x, y, width, height };
}
