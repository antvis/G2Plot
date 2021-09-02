import { isArray } from '@antv/util';
import { interaction, animation, theme, tooltip, scale } from '../../adaptor/common';
import { Params } from '../../core/adaptor';
import { schema as schemaGeometry } from '../../adaptor/geometries';
import { deepAssign, flow } from '../../utils';
import { Datum } from '../../types';
import { getColorMap, layoutVennData } from './utils';
import { VennData, VennOptions } from './types';
import { COLOR_FIELD } from './constant';
import './shape';

// todo 可以在这里处理下非法数据输入，避免直接 crash

/**
 * color options 转换
 */
function transformColor(params: Params<VennOptions>, data: VennData): VennOptions['color'] {
  const { chart, options } = params;
  const { color, blendMode = 'multiply' } = options;

  if (typeof color !== 'function') {
    let colorPalette = typeof color === 'string' ? [color] : color;
    if (!isArray(colorPalette)) {
      const { colors10, colors20 } = chart.getTheme();
      colorPalette = data.filter((d) => d.sets.length === 1).length <= 10 ? colors10 : colors20;
    }
    const colorMap = getColorMap(colorPalette, [...data], blendMode);
    return (datum: Datum) => colorMap.get(datum.id);
  }
  return color;
}

/**
 * geometry 处理
 * @param params
 */
function geometry(params: Params<VennOptions>): Params<VennOptions> {
  const { chart, options } = params;
  const { data, pointStyle } = options;

  // 获取容器大小
  const { width, height } = chart.viewBBox;
  const vennData: VennData = layoutVennData(data, width, height, 0 /** todo 获取内边距 padding */);
  chart.data(vennData);

  schemaGeometry(
    deepAssign({}, params, {
      options: {
        xField: 'x',
        yField: 'y',
        sizeField: 'size',
        seriesField: COLOR_FIELD,
        rawFields: ['sets', 'id', 'size'],
        schema: {
          shape: 'venn',
          style: pointStyle,
          color: transformColor(params, vennData),
        },
      },
    })
  );

  return params;
}

/**
 * 默认关闭图例
 * @param params
 */
export function legend(params: Params<VennOptions>): Params<VennOptions> {
  const { chart } = params;
  chart.legend(false);

  return params;
}

/**
 * 默认关闭坐标轴
 * @param params
 */
export function axis(params: Params<VennOptions>): Params<VennOptions> {
  const { chart } = params;
  chart.axis(false);

  return params;
}

/**
 * 图适配器
 * @param chart
 * @param options
 */
export function adaptor(params: Params<VennOptions>) {
  // flow 的方式处理所有的配置到 G2 API
  return flow(
    theme,
    geometry,
    scale({}),
    legend,
    axis,
    tooltip,
    interaction,
    animation
    // ... 其他的 adaptor flow
  )(params);
}
