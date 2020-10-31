import { theme, scale, animation, annotation, tooltip } from '../../adaptor/common';
import { Params } from '../../core/adaptor';
import { flow, deepMix } from '../../utils';
import { area, line, point } from '../../adaptor/geometries';
import { TinyAreaOptions } from './types';

/**
 * 字段
 * @param params
 */
function geometry(params: Params<TinyAreaOptions>): Params<TinyAreaOptions> {
  const { chart, options } = params;
  const { data, color, areaStyle, point: pointOptions, line: lineOptions } = options;

  const seriesData = data.map((y: number, x: number) => {
    return { x, y };
  });

  chart.data(seriesData);

  const p = deepMix({}, params, {
    options: {
      xField: 'x',
      yField: 'y',
      area: { color, style: areaStyle },
      line: lineOptions,
      point: pointOptions,
    },
  });
  // area geometry 处理
  area(p);
  line(p);
  point(p);

  chart.axis(false);
  chart.legend(false);

  return params;
}

/**
 * 迷你面积图适配器
 * @param chart
 * @param options
 */
export function adaptor(params: Params<TinyAreaOptions>) {
  return flow(geometry, scale({}), tooltip, theme, animation, annotation())(params);
}
