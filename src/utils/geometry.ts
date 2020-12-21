import { Chart, Geometry, View, Element } from '@antv/g2';
import { reduce } from '@antv/util';

/**
 * 在 Chart 中查找第一个指定 type 类型的 geometry
 * @param chart
 * @param type
 */
export function findGeometry(chart: View, type: string): Geometry {
  return chart.geometries.find((g: Geometry) => g.type === type);
}

/**
 * 获取 Chart 的 所有 elements
 */
export function getAllElements(chart: Chart): Element[] {
  return reduce(
    chart.geometries,
    (r: Element[], geometry: Geometry) => {
      return r.concat(geometry.elements);
    },
    []
  );
}
