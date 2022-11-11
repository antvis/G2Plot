import { vec2 } from '@antv/matrix-util';
import { Point, Position } from '../types/common';

export function points2Path(points: Point[], isInCircle: boolean) {
  const path = [];
  if (points.length) {
    path.push(['M', points[0].x, points[0].y]);
    for (let i = 1, length = points.length; i < length; i += 1) {
      const item = points[i];
      path.push(['L', item.x, item.y]);
    }
    if (isInCircle) {
      path.push(['Z']);
    }
  }
  return path;
}

/**
 * @ignore
 * 计算光滑的贝塞尔曲线
 */
export const smoothBezier = (
  points: Position[],
  smooth: number,
  isLoop: boolean,
  constraint: Position[]
): Position[] => {
  const cps = [];
  let prevPoint: Position;
  let nextPoint: Position;
  const hasConstraint = !!constraint;
  let min: Position;
  let max: Position;
  if (hasConstraint) {
    min = [Infinity, Infinity];
    max = [-Infinity, -Infinity];

    for (let i = 0, l = points.length; i < l; i++) {
      const point = points[i];
      min = vec2.min([0, 0], min, point) as [number, number];
      max = vec2.max([0, 0], max, point) as [number, number];
    }
    min = vec2.min([0, 0], min, constraint[0]) as [number, number];
    max = vec2.max([0, 0], max, constraint[1]) as [number, number];
  }

  for (let i = 0, len = points.length; i < len; i++) {
    const point = points[i];
    if (isLoop) {
      prevPoint = points[i ? i - 1 : len - 1];
      nextPoint = points[(i + 1) % len];
    } else {
      if (i === 0 || i === len - 1) {
        cps.push(point);
        continue;
      } else {
        prevPoint = points[i - 1];
        nextPoint = points[i + 1];
      }
    }
    let v: [number, number] = [0, 0];
    v = vec2.sub(v, nextPoint, prevPoint) as [number, number];
    v = vec2.scale(v, v, smooth) as [number, number];

    let d0 = vec2.distance(point, prevPoint);
    let d1 = vec2.distance(point, nextPoint);

    const sum = d0 + d1;
    if (sum !== 0) {
      d0 /= sum;
      d1 /= sum;
    }

    const v1 = vec2.scale([0, 0], v, -d0);
    const v2 = vec2.scale([0, 0], v, d1);

    let cp0 = vec2.add([0, 0], point, v1);
    let cp1 = vec2.add([0, 0], point, v2);

    if (hasConstraint) {
      cp0 = vec2.max([0, 0], cp0, min);
      cp0 = vec2.min([0, 0], cp0, max);
      cp1 = vec2.max([0, 0], cp1, min);
      cp1 = vec2.min([0, 0], cp1, max);
    }

    cps.push(cp0);
    cps.push(cp1);
  }

  if (isLoop) {
    cps.push(cps.shift());
  }
  return cps;
};

/**
 * @ignore
 * 贝塞尔曲线
 */
export function catmullRom2bezier(crp: number[], z: boolean, constraint: Position[]) {
  const isLoop = !!z;
  const pointList = [];
  for (let i = 0, l = crp.length; i < l; i += 2) {
    pointList.push([crp[i], crp[i + 1]]);
  }

  const controlPointList = smoothBezier(pointList, 0.4, isLoop, constraint);
  const len = pointList.length;
  const d1 = [];

  let cp1: Position;
  let cp2: Position;
  let p: Position;

  for (let i = 0; i < len - 1; i++) {
    cp1 = controlPointList[i * 2];
    cp2 = controlPointList[i * 2 + 1];
    p = pointList[i + 1];
    d1.push(['C', cp1[0], cp1[1], cp2[0], cp2[1], p[0], p[1]]);
  }

  if (isLoop) {
    cp1 = controlPointList[len];
    cp2 = controlPointList[len + 1];
    p = pointList[0];
    d1.push(['C', cp1[0], cp1[1], cp2[0], cp2[1], p[0], p[1]]);
  }
  return d1;
}

/**
 * @ignore
 * 根据关键点获取限定了范围的平滑线
 */
export function getSplinePath(points: Point[], isInCircle?: boolean, constaint?: Position[]) {
  const data = [];
  const first = points[0];
  let prePoint = null;
  if (points.length <= 2) {
    // 两点以内直接绘制成路径
    return points2Path(points, isInCircle);
  }
  for (let i = 0, len = points.length; i < len; i++) {
    const point = points[i];
    if (!prePoint || !(prePoint.x === point.x && prePoint.y === point.y)) {
      data.push(point.x);
      data.push(point.y);
      prePoint = point;
    }
  }
  const constraint = constaint || [
    // 范围
    [0, 0],
    [1, 1],
  ];
  const splinePath = catmullRom2bezier(data, isInCircle, constraint);
  splinePath.unshift(['M', first.x, first.y]);
  return splinePath;
}
