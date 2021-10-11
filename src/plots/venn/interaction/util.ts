import { View } from '@antv/g2';

/** tofront: 同步所有元素的位置  */
export function placeElementsOrdered(view: View) {
  if (!view) {
    return;
  }
  const elements = view.geometries[0].elements;
  elements.forEach((elem) => {
    elem.shape.toFront();
  });
}
