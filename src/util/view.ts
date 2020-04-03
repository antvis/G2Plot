import { head, filter, map } from '@antv/util';
import { View, Geometry, Element, IShape, IGroup } from '../dependents';

export function getAllGeometryByType(view: View, type: string): Geometry[] {
  return filter(view.geometries, (geometry: Geometry) => geometry.type === type);
}

export function getGeometryByType(view: View, type: string): Geometry | undefined {
  return head(getAllGeometryByType(view, type));
}

export function getGeometryShapes(geometry: Geometry): (IShape | IGroup)[] {
  return map(geometry.elements, (element: Element) => element.shape);
}
