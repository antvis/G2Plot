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
 * 计算两个矩形之间的堆叠情况
 * @return xOverlap x方向重叠大小
 * @return yOverlap y方向重叠大小
 */
export function getOverlapInfo(a: Box, b: Box, margin = 0): { xOverlap: number; yOverlap: number } {
  let xOverlap = Math.max(
    0,
    Math.min(a.x + a.width + margin, b.x + b.width + margin) - Math.max(a.x - margin, b.x - margin)
  );
  let yOverlap = Math.max(
    0,
    Math.min(a.y + a.height + margin, b.y + b.height + margin) - Math.max(a.y - margin, b.y - margin)
  );

  // 添加 sign
  if (xOverlap && a.x < b.x) {
    xOverlap = -xOverlap;
  }
  if (yOverlap && a.y < b.y) {
    yOverlap = -yOverlap;
  }

  // 重叠
  if (a.x === b.x && a.width === b.width) {
    xOverlap = b.width;
  }
  if (a.y === b.y && a.height === b.height) {
    yOverlap = b.height;
  }

  return { xOverlap, yOverlap };
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

/**
 * 判断两个数值 是否接近
 * - 解决精度问题（由于无法确定精度上限，根据具体场景可传入 精度 参数）
 */
export const near = (x: number, y: number, e: number = Number.EPSILON ** 0.5): boolean =>
  [x, y].includes(Infinity) ? Math.abs(x) === Math.abs(y) : Math.abs(x - y) < e;

/**
 * 获取点到圆心的连线与水平方向的夹角
 */
export function getAngleByPoint(coordinate, point): number {
  const center = coordinate.getCenter();
  return Math.atan2(point.y - center.y, point.x - center.x);
}

/**
 * 获取 label 的旋转角度
 * @param angle
 */
export function getLabelRotate(angle: number) {
  const HALF_PI = Math.PI / 2;
  let rotate = angle;
  if (rotate > HALF_PI || rotate < -HALF_PI) {
    rotate = rotate + Math.PI;
  }
  return rotate;
}
