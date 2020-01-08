import { triangulation } from '../util/polygon';
import { dist2 } from '../../../../util/math';
import { area } from '../util/polygon';
import { each } from '@antv/util';

export function randomPointsInPolygon(polygon, num) {
  const points = [];
  // 获取三角网顶点顺序
  const triangleIndex = triangulation(polygon);
  // 组建三角形数据
  const triangles = createTriangleData(polygon, triangleIndex);
  // 计算总面积
  const sum_area = Math.abs(area(polygon));
  // 创建 distribution
  const distributions = [];
  each(triangles, (tri, index) => {
    const lastValue = index === 0 ? 0 : distributions[index - 1];
    const nextValue = lastValue + tri.area / sum_area;
    distributions.push(nextValue);
  });
  for (let i = 0; i < num; i++) {
    // 随机pick一个triangle, 面积越大的几率越高
    const seed = Math.random();
    let triangle;
    for (let j = 0; j < distributions.length; j++) {
      if (distributions[j] > seed) {
        triangle = triangles[j];
        break;
      }
    }
    // 生成triangle内的随机点
    const point = randomPointInTriangle(triangle);
    points.push(point);
  }

  return points;
}

function createTriangleData(polygon, index) {
  const triangles = [];
  for (let i = 0; i < index.length; i += 3) {
    const p0 = { x: polygon[index[i]][0], y: polygon[index[i]][1] };
    const p1 = { x: polygon[index[i + 1]][0], y: polygon[index[i + 1]][1] };
    const p2 = { x: polygon[index[i + 2]][0], y: polygon[index[i + 2]][1] };
    const points = [p0, p1, p2];
    const area = getTriangleArea(points);
    triangles.push({ points, area });
  }
  return triangles;
}

function getTriangleArea(points) {
  // Heron's formula
  const length_a = dist2(points[0], points[1]);
  const length_b = dist2(points[1], points[2]);
  const length_c = dist2(points[0], points[2]);
  const s = (length_a + length_b + length_c) / 2;
  return Math.sqrt(s * (s - length_a) * (s - length_b) * (s - length_c));
}

function randomPointInTriangle(triangle) {
  let wb = Math.random();
  let wc = Math.random();

  if (wb + wc > 1) {
    wb = 1 - wb;
    wc = 1 - wc;
  }
  const a = triangle.points[0];
  const b = triangle.points[1];
  const c = triangle.points[2];
  const rb_x = wb * (b.x - a.x);
  const rb_y = wb * (b.y - a.y);
  const rc_x = wc * (c.x - a.x);
  const rc_y = wc * (c.y - a.y);
  const r_x = rb_x + rc_x + a.x;
  const r_y = rb_y + rc_y + a.y;

  return [r_x, r_y];
}
