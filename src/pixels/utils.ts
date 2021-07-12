import { normalPadding } from '../utils/padding';
import { PixelBBox } from './canvas';

export function getPaddingInfo(rawPadding: number | number[]) {
  const norPadding = normalPadding(rawPadding);
  return {
    top: norPadding[0],
    right: norPadding[1],
    bottom: norPadding[2],
    left: norPadding[3],
  };
}

export function isInPixelBBox(x: number, y: number, bbox: PixelBBox) {
  return bbox.x <= x && x <= bbox.x + bbox.width && bbox.y <= y && y <= bbox.y + bbox.height;
}
