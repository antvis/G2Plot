import { BBox } from '@antv/g';

/**
 * 计算两个矩形之间的堆叠区域面积
 */
export function getOverlapArea(a: BBox, b: BBox, margin = 0) {
  const xOverlap = Math.max(
    0,
    Math.min(a.x + a.width + margin, b.x + b.width + margin) - Math.max(a.x - margin, b.x - margin)
  );
  const yOverlap = Math.max(
    0,
    Math.min(a.y + a.height + margin, b.y + b.height + margin) - Math.max(a.y - margin, b.y - margin)
  );

  return xOverlap * yOverlap;
}
