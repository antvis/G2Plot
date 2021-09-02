import { assign, clone, memoize } from '@antv/util';
import chroma from 'chroma-js';
import { venn, scaleSolution } from './layout/layout';
import { circlePath, intersectionAreaPath, computeTextCentres } from './layout/diagram';
import { VennData, VennOptions } from './types';
import { COLOR_FIELD } from './constant';

/**
 * 获取 颜色映射
 * @usage colorMap.get('id') => color
 *
 * @returns Map<string, string>
 */
export const getColorMap = memoize(
  (colorPalette: string[], data: VennData, blendMode: string) => {
    const colorMap = new Map<string /** id */, string /** color */>();
    const colorPaletteLen = colorPalette.length;
    // 排序，mutable
    data.sort((a, b) => a.sets.length - b.sets.length);
    data.forEach((d, idx) => {
      if (d.sets.length === 1) {
        colorMap.set(d.id, colorPalette[(idx + colorPaletteLen) % colorPaletteLen]);
      } else {
        const colorArr = d.sets.map(
          (subSetId) => colorMap.get(subSetId) /** 一般都是可以获取到颜色的，如果不正确 就是输入了非法数据 */
        );
        // https://gka.github.io/chroma.js/#chroma-blend, 这里直接使用 乘加 的方式
        colorMap.set(
          d.id,
          colorArr.slice(1).reduce((a, b) => chroma.blend(a, b, blendMode).hex(), colorArr[0])
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
    // color 分类字段与 id 同步
    row[COLOR_FIELD] = id;
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
