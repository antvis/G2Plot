import { clone, each, isEqual } from '@antv/util';
import { dist2, sub2D, crossProduct3D, bboxOnRotate } from '../../../../util/math';
import Triangle from './triangle';

export function area(polygon) {
  const n = polygon.length;
  let i = -1,
    a,
    b = polygon[n - 1],
    area = 0;

  while (++i < n) {
    a = b;
    b = polygon[i];
    area += a[1] * b[0] - a[0] * b[1];
  }

  return area / 2;
}

export function centroid(polygon) {
  const n = polygon.length;
  let i = -1,
    x = 0,
    y = 0,
    a,
    b = polygon[n - 1],
    c,
    k = 0;

  while (++i < n) {
    a = b;
    b = polygon[i];
    k += c = a[0] * b[1] - b[0] * a[1];
    x += (a[0] + b[0]) * c;
    y += (a[1] + b[1]) * c;
  }

  return (k *= 3), [x / k, y / k];
}

export function contains(polygon, point) {
  const n = polygon.length;
  const x = point[0];
  const y = point[1];
  let p = polygon[n - 1],
    x0 = p[0],
    y0 = p[1],
    x1,
    y1,
    inside = false;

  for (let i = 0; i < n; ++i) {
    (p = polygon[i]), (x1 = p[0]), (y1 = p[1]);
    if (y1 > y !== y0 > y && x < ((x0 - x1) * (y - y1)) / (y0 - y1) + x1) inside = !inside;
    (x0 = x1), (y0 = y1);
  }

  return inside;
}

export function hull(points) {
  const n = points.length;
  if (n < 3) return null;

  const sortedPoints = new Array(n);
  const flippedPoints = new Array(n);

  let i;

  for (i = 0; i < n; ++i) sortedPoints[i] = [+points[i][0], +points[i][1], i];
  sortedPoints.sort(lexicographicOrder);
  for (i = 0; i < n; ++i) flippedPoints[i] = [sortedPoints[i][0], -sortedPoints[i][1]];

  const upperIndexes = computeUpperHullIndexes(sortedPoints),
    lowerIndexes = computeUpperHullIndexes(flippedPoints);

  // Construct the hull polygon, removing possible duplicate endpoints.
  const skipLeft: any = lowerIndexes[0] === upperIndexes[0],
    skipRight: any = lowerIndexes[lowerIndexes.length - 1] === upperIndexes[upperIndexes.length - 1],
    hull = [];

  // Add upper hull in right-to-l order.
  // Then add lower hull in left-to-right order.
  for (i = upperIndexes.length - 1; i >= 0; --i) hull.push(points[sortedPoints[upperIndexes[i]][2]]);
  for (i = +skipLeft; i < lowerIndexes.length - skipRight; ++i) hull.push(points[sortedPoints[lowerIndexes[i]][2]]);

  return hull;
}

function computeUpperHullIndexes(points) {
  const n = points.length,
    indexes = [0, 1];
  let size = 2;

  for (let i = 2; i < n; ++i) {
    while (size > 1 && cross(points[indexes[size - 2]], points[indexes[size - 1]], points[i]) <= 0) --size;
    indexes[size++] = i;
  }

  return indexes.slice(0, size); // remove popped points
}

function cross(a, b, c) {
  return (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);
}

function lexicographicOrder(a, b) {
  return a[0] - b[0] || a[1] - b[1];
}

export function polygonLength(polygon) {
  const n = polygon.length;
  let i = -1,
    b = polygon[n - 1],
    xa,
    ya,
    xb = b[0],
    yb = b[1],
    perimeter = 0;

  while (++i < n) {
    xa = xb;
    ya = yb;
    b = polygon[i];
    xb = b[0];
    yb = b[1];
    xa -= xb;
    ya -= yb;
    perimeter += Math.sqrt(xa * xa + ya * ya);
  }

  return perimeter;
}

export function triangulation(polygon) {
  const points = polygonPoints(polygon);
  const last = points[points.length - 1];
  if (isEqual(points[0], last)) {
    points.splice(points.length - 1, 1);
  }
  const bbox = calBox(points);
  let localPoints = getLocalCoords(points, bbox.top_left);
  localPoints = counter_clockwise(localPoints, { x: 0, y: bbox.height });
  return triangulate_polygon(localPoints);
}

function polygonPoints(polygon) {
  const points = [];
  each(polygon, (poly) => {
    points.push({ x: poly[0], y: poly[1] });
  });
  return points;
}

function calBox(inputs, mode?) {
  const points = clone(inputs);
  //sort by x value
  points.sort(function(a, b) {
    return a.x - b.x;
  });
  const xmin = points[0].x,
    xmax = points[points.length - 1].x;
  //sort by y value
  points.sort(function(a, b) {
    return b.y - a.y;
  });
  const ymin = points[0].y,
    ymax = points[points.length - 1].y;

  if (mode == 'flat') {
    return {
      top_left: { x: xmin, y: ymin },
      top_right: { x: xmax, y: ymin },
      bottom_left: { x: xmin, y: ymax },
      bottom_right: { x: xmax, y: ymax },
      width: Math.abs(xmax - xmin),
      height: Math.abs(ymax - ymin),
    };
  }

  return {
    top_left: { x: xmin, y: ymax },
    top_right: { x: xmax, y: ymax },
    bottom_left: { x: xmin, y: ymin },
    bottom_right: { x: xmax, y: ymin },
    width: Math.abs(xmax - xmin),
    height: Math.abs(ymax - ymin),
  };
}

function getLocalCoords(points, tl /*of bbox*/) {
  const locals = [];
  for (let i = 0; i < points.length; i++) {
    const p = points[i];
    const dx = p.x - tl.x,
      dy = p.y - tl.y;
    locals.push({ index: i, value: { x: dx, y: dy } });
  }

  return locals;
}

function counter_clockwise(points, bottom_left) {
  //sort polygon vertex by counter_clockwise direction
  const ps = clone(points);
  ps.sort(function(a, b) {
    const dist_a = Math.sqrt(Math.pow(bottom_left.x - a.value.x, 2) + Math.pow(bottom_left.y - a.value.y, 2)),
      dist_b = Math.sqrt(Math.pow(bottom_left.x - b.value.x, 2) + Math.pow(bottom_left.y - b.value.y, 2));
    return dist_a - dist_b;
  });
  const startPoint = ps[0].index;
  const pa = points[startPoint].value,
    pr = ps[0].index == 0 ? points[points.length - 1].value : points[startPoint - 1].value,
    pl = ps[0].index == points.length - 1 ? points[0].value : points[startPoint + 1].value;

  const v1: any = sub2D(pl, pa),
    v2: any = sub2D(pa, pr);
  v1.z = 0;
  v2.z = 0;
  const cross = crossProduct3D(v1, v2);
  const dir = cross.z >= 0 ? 1 : -1,
    targetPoint = cross.z >= 0 ? points.length : 0;

  const arr1 = points.slice(Math.min(startPoint, targetPoint), Math.max(startPoint, targetPoint) + 1);
  if (dir == -1) arr1.reverse();
  points.splice(Math.min(startPoint, targetPoint), Math.abs(startPoint - targetPoint) + 1);
  if (dir == -1) points.reverse();
  const arr = arr1.concat(points);
  return arr;
}

function triangulate_polygon(points) {
  points.push(points[0]);
  const ps = clone(points);
  const triangles = [];
  let i = 0;
  while (ps.length > 3 && i <= ps.length - 3) {
    const tri = new Triangle({ points: [ps[i].value, ps[i + 1].value, ps[i + 2].value] });
    if (!tri.isConcave() && !triContain(ps, i + 3, ps.length - 1, tri)) {
      triangles.push(ps[i].index, ps[i + 1].index, ps[i + 2].index);
      ps.splice(i + 1, 1);
      i = 0;
    } else {
      i++;
    }
  }
  return triangles;
}

function triContain(points, from, to, tri) {
  for (let i = from; i < to; i++) {
    const p = points[i].value;
    if (tri.containPoint(p)) return true;
  }

  return false;
}
