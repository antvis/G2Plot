import { assign, memoize } from '@antv/util';
import { blend } from '../../utils/color/blend';
import { venn, scaleSolution } from './layout/layout';
import { circlePath, intersectionAreaPath, computeTextCentres } from './layout/diagram';
import { ID_FIELD, PATH_FIELD } from './constant';
import { VennData, VennOptions } from './types';

/**
 * 获取 颜色映射
 * @usage colorMap.get(id) => color
 *
 * @returns Map<string, string>
 */
export const getColorMap = memoize(
  (colorPalette: string[], data: VennData, options: VennOptions) => {
    const { blendMode, setsField } = options;
    const colorMap = new Map<string /** id */, string /** color */>();
    const colorPaletteLen = colorPalette.length;
    data.forEach((d, idx) => {
      if (d[setsField].length === 1) {
        colorMap.set(d[ID_FIELD], colorPalette[(idx + colorPaletteLen) % colorPaletteLen]);
      } else {
        /** 一般都是可以获取到颜色的，如果不正确 就是输入了非法数据 */
        const colorArr = d[setsField].map((id) => colorMap.get(id));
        colorMap.set(
          d[ID_FIELD],
          colorArr.slice(1).reduce((a, b) => blend(a, b, blendMode), colorArr[0])
        );
      }
    });

    return colorMap;
  },
  (...params) => JSON.stringify(params)
);

/**
 * 给韦恩图数据进行布局
 *
 * @param data
 * @param width
 * @param height
 * @param padding
 * @returns 韦恩图数据
 */
export function layoutVennData(options: VennOptions, width: number, height: number, padding: number = 0): VennData {
  const { data, setsField, sizeField } = options;

  const vennData: VennData = data.map((d) => ({
    ...d,
    sets: d[setsField] || [],
    size: d[sizeField],
    [PATH_FIELD]: '',
    [ID_FIELD]: '',
  }));
  // 1. 进行排序，避免图形元素遮挡
  vennData.sort((a, b) => a.sets.length - b.sets.length);
  // todo 2. 可以在这里处理下非法数据输入，避免直接 crash

  const solution = venn(vennData);
  const circles = scaleSolution(solution, width, height, padding);
  const textCenters = computeTextCentres(circles, vennData);
  vennData.forEach((row) => {
    const sets = row.sets;
    const id = sets.join(',');
    row[ID_FIELD] = id;
    if (sets.length === 1) {
      const circle = circles[id];
      row[PATH_FIELD] = circlePath(circle.x, circle.y, circle.radius);
      assign(row, circle);
    } else {
      const setCircles = sets.map((set) => circles[set]);
      let path = intersectionAreaPath(setCircles);
      if (!/[zZ]$/.test(path)) {
        path += ' Z';
      }
      row[PATH_FIELD] = path;
      const center = textCenters[id] || { x: 0, y: 0 };
      assign(row, center);
    }
  });
  return vennData;
}
