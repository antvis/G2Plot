import { Geometry, View, Element } from '@antv/g2';
import { reduce, get } from '@antv/util';

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

/**
 * 递归获取 View 的 所有 elements, 包括 View 的子 View
 */
export function getAllElementsRecursively(view: View): Element[] {
  if (get(view, ['views', 'length'], 0) <= 0) {
    return getAllElements(view);
  }

  return reduce(
    view.views,
    (ele: Element[], subView: View) => {
      return ele.concat(getAllElementsRecursively(subView));
    },
    getAllElements(view)
  );
}
