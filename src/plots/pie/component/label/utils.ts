export interface Point {
  x: number;
  y: number;
}

export function getEndPoint(center, angle, r): Point {
  return {
    x: center.x + r * Math.cos(angle),
    y: center.y + r * Math.sin(angle),
  };
}

export interface Box {
  x: number;
  y: number;
  width: number;
  height: number;
}

/** 获取矩形中点 */
export function getCenter(box: Box): Point {
  return {
    x: box.x + box.width / 2,
    y: box.y + box.height / 2,
  };
}

/**
 * Detect if two lines intersect.
 *
 * @return 1: intersect 0: not intersect
 */
export function intersectLine(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  x3: number,
  y3: number,
  x4: number,
  y4: number
): boolean {
  // http://paulbourke.net/geometry/pointlineplane/
  const denom = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);
  const numera = (x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3);
  const numerb = (x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3);
  const mua = numera / denom;
  const mub = numerb / denom;
  if (!(mua < 0 || mua > 1 || mub < 0 || mub > 1)) {
    return true;
  }
  return false;
}

/**
 * Detect if a box intersects with a line.
 */
export function boxIntersectLine(box: Box, p1: Point, p2: Point): boolean {
  const { x, y, width, height } = box;
  const { x: x1, y: y1 } = p1;
  const { x: x2, y: y2 } = p2;
  return (
    intersectLine(x, y, x + width, y, x1, y1, x2, y2) || // top of label
    intersectLine(x + width, y, x + width, y + height, x1, y1, x2, y2) || // right
    intersectLine(x, y + height, x + width, y + height, x1, y1, x2, y2) || // bottom
    intersectLine(x, y, x, y + height, x1, y1, x2, y2) // left of label
  );
}

/**
 * 计算两个矩形之间的堆叠情况
 * @return xOverlap x方向重叠大小
 * @return yOverlap y方向重叠大小
 * @return xSign aBox和bBox x方向位置情况，xSign > 0 means aBox is on the left of bBox
 * @return ySign aBox和bBox x方向位置情况，ySign > 0 means aBox is on the top of bBox
 */
export function getOverlapInfo(
  a: Box,
  b: Box,
  margin = 0
): { xOverlap: number; yOverlap: number; xSign: number; ySign: number } {
  const xOverlap = Math.max(
    0,
    Math.min(a.x + a.width + margin, b.x + b.width + margin) - Math.max(a.x - margin, b.x - margin)
  );
  const yOverlap = Math.max(
    0,
    Math.min(a.y + a.height + margin, b.y + b.height + margin) - Math.max(a.y - margin, b.y - margin)
  );

  return { xOverlap, yOverlap, xSign: b.x - a.x, ySign: b.y - a.y };
}

export function getOverlapArea(a: Box, b: Box, margin = 0): number {
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

/**
 * Determine the index of quadrants which point placed by angle of point.
 * -------------
 * |  3  |  0  |
 * -------------
 * |  2  |  1  |
 * -------------
 *
 * @param {number} angle
 * @return {number} the index of quadrants, always in range `<0, 3>`
 */
export function getQuadrantByAngle(angle: number): number {
  const left = angle > Math.PI / 2 || angle < -Math.PI / 2;
  // fix angle > Math.PI
  const top = angle < 0 || angle > Math.PI;
  let index: number;

  if (left) {
    if (top) {
      // Top left
      index = 3;
    } else {
      // Bottom left
      index = 2;
    }
  } else {
    if (top) {
      // Top right
      index = 0;
    } else {
      // Bottom right
      index = 1;
    }
  }

  return index;
}

/**
 * 粗略地判断是否在panel内部
 * @param panel
 * @param shape
 */
export function inPanel(panel: Box, shape: Box) {
  return (
    panel.x < shape.x &&
    panel.x + panel.width > shape.x + shape.width &&
    panel.y < shape.y &&
    panel.y + panel.height > shape.y + shape.height
  );
}
