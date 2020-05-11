import { vec3 } from '@antv/matrix-util';
import { each, clone } from '@antv/util';

function magnitude(v) {
  let sum = 0;
  each(v, (value) => {
    sum += value * value;
  });
  return Math.sqrt(sum);
}

function dotProduct2D(va, vb) {
  return va.x * vb.y + va.y * vb.x;
}

function angleTo(va, vb) {
  const magA = magnitude(va);
  const magB = magnitude(vb);
  const dot = dotProduct2D(va, vb);
  const angle = Math.acos(dot / magA / magB);
  return angle;
}

function crossProduct2D(va, vb) {
  const magA = magnitude(va);
  const magB = magnitude(vb);
  const dot = dotProduct2D(va, vb);
  const angle = Math.acos(dot / magA / magB);
  return magA * magB * Math.sin(angle);
}

function crossProduct3D(va, vb) {
  const ax = va.x,
    ay = va.y,
    az = va.z;
  const bx = vb.x,
    by = vb.y,
    bz = vb.z;

  const x = ay * bz - az * by;
  const y = az * bx - ax * bz;
  const z = ax * by - ay * bx;

  return { x, y, z };
}

function sub2D(va, vb) {
  return { x: va.x - vb.x, y: va.y - vb.y };
}

function applyMatrix(point, matrix, tag = 1) {
  const vector: [number, number, number] = [point.x, point.y, tag];
  vec3.transformMat3(vector, vector, matrix);
  return {
    x: vector[0],
    y: vector[1],
  };
}

function isBetween(value, min, max) {
  return value >= min && value <= max;
}

const tolerance = 0.001;

function getLineIntersect(p0, p1, p2, p3) {
  const E = {
    x: p2.x - p0.x,
    y: p2.y - p0.y,
  };
  const D0 = {
    x: p1.x - p0.x,
    y: p1.y - p0.y,
  };
  const D1 = {
    x: p3.x - p2.x,
    y: p3.y - p2.y,
  };
  const kross = D0.x * D1.y - D0.y * D1.x;
  const sqrKross = kross * kross;
  const sqrLen0 = D0.x * D0.x + D0.y * D0.y;
  const sqrLen1 = D1.x * D1.x + D1.y * D1.y;
  let point = null;
  if (sqrKross > tolerance * sqrLen0 * sqrLen1) {
    const s = (E.x * D1.y - E.y * D1.x) / kross;
    const t = (E.x * D0.y - E.y * D0.x) / kross;
    if (isBetween(s, 0, 1) && isBetween(t, 0, 1)) {
      point = {
        x: p0.x + s * D0.x,
        y: p0.y + s * D0.y,
      };
    }
  }
  return point;
}

function isPointInPolygon(p, polygon) {
  /** 射线法 */
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].x;
    const yi = polygon[i].y;
    const xj = polygon[j].x;
    const yj = polygon[j].y;

    const intersect = yi > p.y !== yj > p.y && p.x <= ((xj - xi) * (p.y - yi)) / (yj - yi) + xi;
    if (intersect) {
      inside = !inside;
    }
  }
  return inside;
}

function sqr(v) {
  return v * v;
}

function dist2(a, b) {
  return Math.sqrt(sqr(a.x - b.x) + sqr(a.y - b.y));
}

function distBetweenPoints(a, b) {
  return Math.sqrt(sqr(a.x - b.x) + sqr(a.y - b.y));
}

function distBetweenPointLine(p, p1, p2) {
  const l2 = dist2(p1, p2);
  if (l2 === 0) {
    return dist2(p, p1);
  }
  let t = ((p.x - p1.x) * (p2.x - p1.x) + (p.y - p1.y) * (p2.y - p1.y)) / l2;
  t = Math.max(0, Math.min(1, t));
  const distSquare = dist2(p, { x: p1.x + t * (p2.x - p1.x), y: p1.y + t * (p2.y - p1.y) });
  return Math.sqrt(distSquare);
}

// todo：待优化 https://blog.csdn.net/WilliamSun0122/article/details/77994526
function minDistBetweenPointPolygon(p, polygon) {
  let min = Infinity;
  /** vertice to vertice */
  each(polygon, (v) => {
    const dist = Math.sqrt(dist2(v, p));
    if (min > dist) {
      min = dist;
    }
  });
  /** vertice to edge */
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].x;
    const yi = polygon[i].y;
    const xj = polygon[j].x;
    const yj = polygon[j].y;
    const dist = distBetweenPointLine(p, { x: xi, y: yi }, { x: xj, y: yj });
    if (min > dist) {
      min = dist;
    }
  }

  return min;
}

function isPolygonIntersection(polyA, polyB) {
  for (const p of polyA) {
    const inside = isPointInPolygon(p, polyB);
    if (inside) {
      return true;
    }
  }
  return false;
}

function minDistBetweenConvexPolygon(polyA, polyB) {
  if (isPolygonIntersection(polyA, polyB)) {
    return 0;
  }
  let minA = Infinity;
  let minB = Infinity;
  each(polyA, (v) => {
    const localMin = minDistBetweenPointPolygon(v, polyB);
    if (minA > localMin) {
      minA = localMin;
    }
  });
  each(polyB, (v) => {
    const localMin = minDistBetweenPointPolygon(v, polyA);
    if (minB > localMin) {
      minB = localMin;
    }
  });

  return Math.min(minA, minB);
}

function bboxOnRotate(shape) {
  const bbox = shape.getBBox();
  const x = bbox.minX;
  const y = bbox.minY;
  /*
   * step1: 获得旋转后的shape包围盒
   * 将包围盒对齐到原点，apply旋转矩阵
   * 移回原来的位置
   */
  const bboxWidth = bbox.maxX - bbox.minX;
  const bboxHeight = bbox.maxY - bbox.minY;
  // const matrix = shape.getTotalMatrix();
  const matrix = shape.attr('matrix');
  let ulMatrix;
  if (matrix) {
    ulMatrix = [matrix[0], matrix[1], 0, matrix[3], matrix[4], 0, 0, 0, 1];
  } else {
    ulMatrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];
  }
  const top_left = applyMatrix({ x: 0, y: 0 }, ulMatrix);
  top_left.x += x;
  top_left.y += y;
  const top_right = applyMatrix({ x: bboxWidth, y: 0 }, ulMatrix);
  top_right.x += x;
  top_right.y += y;
  const bottom_left = applyMatrix({ x: 0, y: bboxHeight }, ulMatrix);
  bottom_left.x += x;
  bottom_left.y += y;
  const bottom_right = applyMatrix({ x: bboxWidth, y: bboxHeight }, ulMatrix);
  bottom_right.x += x;
  bottom_right.y += y;
  /** step2：根据旋转后的画布位置重新计算包围盒，以免图形进行旋转后上下颠倒 */
  const points = [top_left, top_right, bottom_left, bottom_right];
  points.sort((a, b) => {
    return a.y - b.y;
  });
  const minY = points[0].y;
  const maxY = points[points.length - 1].y;
  const tops = [points[0], points[1]];
  const bottoms = [points[2], points[3]];
  const topLeft = tops[0].x < tops[1].x ? tops[0] : tops[1];
  const topRight = tops[0].x < tops[1].x ? tops[1] : tops[0];
  const bottomLeft = bottoms[0].x < bottoms[1].x ? bottoms[0] : bottoms[1];
  const bottomRight = bottoms[0].x < bottoms[1].x ? bottoms[1] : bottoms[0];
  points.sort((a, b) => {
    return a.x - b.x;
  });
  const minX = points[0].x;
  const maxX = points[points.length - 1].x;
  const node = {
    width: maxX - minX,
    height: maxY - minY,
    left: minX,
    right: maxX,
    top: minY,
    bottom: maxY,
    topLeft,
    topRight,
    bottomLeft,
    bottomRight,
    centerX: minX + (maxX - minX) / 2,
    centerY: minY + (maxY - minY) / 2,
    // shape
  };
  return node;
}

/**
 * 线简化算法
 */

const THRESHOLD = 2;

function lineSimplification(points) {
  if (points.length < 5) {
    return points;
  }
  return DouglasPeucker(points, THRESHOLD);
}

// https://en.wikipedia.org/wiki/Ramer%E2%80%93Douglas%E2%80%93Peucker_algorithm
function DouglasPeucker(points, threshold) {
  let result;
  let max = -Infinity;
  let index = 0;
  const endIndex = points.length - 1;
  for (let i = 1; i < endIndex; i++) {
    const point = points[i];
    const line = { start: points[0], end: points[endIndex] };
    const dist = distBetweenPointLine(point, line.start, line.end);
    if (dist > max) {
      max = dist;
      index = i;
    }
  }

  if (max > threshold) {
    const list1 = DouglasPeucker(points.slice(0, index + 1), threshold);
    const list2 = DouglasPeucker(points.slice(index, points.length), threshold);
    result = list1.concat(list2);
  } else {
    result = [points[0], points[points.length - 1]];
  }
  return result;
}

/** 统计的以后迁出去，暂时先放这里 */
function getMedian(array) {
  const list = clone(array);
  list.sort((a, b) => {
    return a - b;
  });

  const half = Math.floor(list.length / 2);

  if (list.length % 2) {
    return list[half];
  }

  return (list[half - 1] + list[half]) / 2.0;
}

function getMean(array) {
  let sum: number = 0;
  each(array, (num: number) => {
    sum += num;
  });
  return sum / array.length;
}

function sturges(values) {
  return Math.ceil(Math.log(values.length) / Math.LN2) + 1;
}

export {
  applyMatrix,
  isBetween,
  getLineIntersect,
  isPointInPolygon,
  distBetweenPoints,
  distBetweenPointLine,
  isPolygonIntersection,
  minDistBetweenConvexPolygon,
  bboxOnRotate,
  dotProduct2D,
  crossProduct2D,
  crossProduct3D,
  sub2D,
  angleTo,
  lineSimplification,
  getMedian,
  getMean,
  sturges,
  dist2,
};

/**
 * 获取 x/y/width/height指定的BBox边界上的所有点，由step抽样
 * @param x
 * @param y
 * @param width
 * @param height
 * @param step
 */
export function getStrokePoints(x: number, y: number, width: number, height: number, step = 2) {
  const points: Array<[number, number]> = [];
  // top
  for (let curX = x; curX <= x + width; curX += step) {
    points.push([curX, y]);
  }
  // right
  for (let curY = y; curY <= y + height; curY += step) {
    points.push([x + width, curY]);
  }
  // bottom
  for (let curX = x + width; curX >= x; curX -= step) {
    points.push([curX, y + height]);
  }
  // left
  for (let curY = y + height; curY >= y; curY -= step) {
    points.push([x, curY]);
  }
  return points;
}
