import { head, filter, map, some } from '@antv/util';
import { View, Geometry, Element, IShape, IGroup, IElement, MappingDatum, ORIGIN } from '../dependents';
import BBox from '../util/bbox';

export function getAllGeometryByType(view: View, type: string): Geometry[] {
  return filter(view.geometries, (geometry: Geometry) => geometry.type === type);
}

export function getGeometryByType(view: View, type: string): Geometry | undefined {
  return head(getAllGeometryByType(view, type));
}

export function getGeometryShapes(geometry: Geometry): (IShape | IGroup)[] {
  return map(geometry.elements, (element: Element) => element.shape);
}

export function forEachGeometry(view: View, callback: (geometry: Geometry) => void) {
  view.geometries.forEach(callback);
}

export function forEachElement(view: View, callback: (element: Element) => void) {
  view.geometries.forEach((geometry: Geometry) => {
    geometry.elements.forEach((element) => {
      callback(element);
    });
  });
}

/** 检测是否有和已存在的Shape数据`相等`的情况 */
export function checkOriginEqual(
  cur: IElement,
  dones: IElement[],
  compare: (a: MappingDatum, b: MappingDatum) => boolean
) {
  return some(dones, (done) => {
    return compare(done.get(ORIGIN), cur.get(ORIGIN));
  });
}

/** 将label调整到panel内 */
export function moveInPanel(shape: IElement, panel: BBox) {
  const box = shape.getBBox();
  let deltaX = 0;
  let deltaY = 0;

  if (box.minX < panel.minX) {
    deltaX = box.minX - panel.minX;
  } else if (box.maxX > panel.maxX) {
    deltaX = box.maxX - panel.maxX;
  }
  if (deltaX) {
    shape.attr('x', shape.attr('x') - deltaX);
  }

  if (box.minY < panel.minY) {
    deltaY = box.minY - panel.minY;
  } else if (box.maxY > panel.maxY) {
    deltaY = box.maxY - panel.maxY;
  }
  if (deltaY) {
    shape.attr('y', shape.attr('y') - deltaY);
  }
}

/**
 * 计算两个矩形之间的堆叠区域面积
 */
export function getOverlapArea(a: BBox, b: BBox, margin = 0) {
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

/** 检测是否和已布局的堆叠 */
export function checkShapeOverlap(cur: IElement, dones: IElement[]) {
  const box = cur.getBBox();
  return some(dones, (done) => {
    const target = done.getBBox();
    return getOverlapArea(box, target, 2) > 0;
  });
}
