import { reduce, get } from '@antv/util';
import { View } from '@antv/g2';
import { getLegendItems } from '@antv/g2/lib/util/legend';
import { findGeometry } from '../../../utils';
import { GeometryOption } from '../types';
import { Legend } from '../../../types/legend';
import { isLine } from './option';

/**
 * 获取 view 的 legendItem，供存在不含有 seriesField 的图形使用
 * @param params
 */
export function getViewLegendItems(params: {
  view: View;
  yField: string;
  geometryOption: GeometryOption;
  legend: Legend;
}) {
  const { view, geometryOption, yField, legend } = params;
  const userMarker = get(legend, 'marker');
  const geometry = findGeometry(view, isLine(geometryOption) ? 'line' : 'interval');
  if (!geometryOption.seriesField) {
    // 返回 g2 设置的图例
    const { color } = geometryOption;
    const marker =
      userMarker ||
      (isLine(geometryOption)
        ? {
            symbol: (x: number, y: number, r: number) => {
              return [
                ['M', x - r, y],
                ['L', x + r, y],
              ];
            },
            style: {
              lineWidth: 2,
              r: 6,
              stroke: color,
            },
          }
        : { symbol: 'square' });
    return [
      {
        value: yField,
        name: get(view, `options.scales.${yField}.alias`) || yField,
        marker,
        isGeometry: true,
      },
    ];
  }

  const attributes = geometry.getGroupAttributes();
  return reduce(
    attributes,
    (items, attr) => {
      const attrItems = getLegendItems(view, geometry, attr, view.getTheme(), userMarker);
      return items.concat(attrItems);
    },
    []
  );
}
