import { Geometry, View, Element } from '@antv/g2';
import { reduce } from '@antv/util';

/**
 * 在 View 中查找第一个指定 type 类型的 geometry
 * @param view
 * @param type
 */
export function findGeometry(view: View, type: string): Geometry {
  return view.geometries.find((g: Geometry) => g.type === type);
}

/**
 * 获取 View 的 所有 elements
 */
export function getAllElements(view: View): Element[] {
  return reduce(
    view.geometries,
    (r: Element[], geometry: Geometry) => {
      return r.concat(geometry.elements);
    },
    []
  );
}
