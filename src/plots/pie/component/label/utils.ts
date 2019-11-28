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
