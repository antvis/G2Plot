import { Geometry, View } from '@antv/g2';

/**
 * 在 Chart 中查找第一个指定 type 类型的 geometry
 * @param chart
 * @param type
 */
export function findGeometry(chart: View, type: string): Geometry {
  return chart.geometries.find((g: Geometry) => g.type === type);
}
