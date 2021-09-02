import { assign, clone } from '@antv/util';
import { venn, scaleSolution } from './layout/layout';
import { circlePath, intersectionAreaPath, computeTextCentres } from './layout/diagram';
import { VennData, VennOptions } from './types';

/**
 * 给韦恩图数据进行布局
 *
 * @param data
 * @param width
 * @param height
 * @param padding
 * @returns 韦恩图数据
 */
export function layoutVennData(
  data: VennOptions['data'],
  width: number,
  height: number,
  padding: number = 0
): VennData {
  const vennData: VennData = clone(data);
  const solution = venn(vennData);
  const circles = scaleSolution(solution, width, height, padding);
  const textCenters = computeTextCentres(circles, vennData);
  vennData.forEach((row) => {
    const sets = row.sets;
    const id = sets.join(',');
    row.id = id;
    if (sets.length === 1) {
      const circle = circles[id];
      row.path = circlePath(circle.x, circle.y, circle.radius);
      assign(row, circle);
    } else {
      const setCircles = sets.map((set) => circles[set]);
      let path = intersectionAreaPath(setCircles);
      if (!/[zZ]$/.test(path)) {
        path += ' Z';
      }
      row.path = path;
      const center = textCenters[id] || { x: 0, y: 0 };
      assign(row, center);
    }
  });
  return vennData;
}
