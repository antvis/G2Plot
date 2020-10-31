import { theme, scale, animation, annotation, tooltip } from '../../adaptor/common';
import { Params } from '../../core/adaptor';
import { flow, deepMix } from '../../utils';
import { interval } from '../../adaptor/geometries';
import { TinyColumnOptions } from './types';
/**
 * 字段
 * @param params
 */
function geometry(params: Params<TinyColumnOptions>): Params<TinyColumnOptions> {
  const { chart, options } = params;
  const { data, color, columnStyle, columnWidthRatio } = options;

  const seriesData = data.map((y: number, x: number) => {
    return { x: `${x}`, y };
  });

  chart.data(seriesData);

  const p = deepMix({}, params, {
    options: {
      xField: 'x',
      yField: 'y',
      widthRatio: columnWidthRatio,
      interval: {
        style: columnStyle,
        color,
      },
    },
  });
  interval(p);

  chart.axis(false);
  chart.legend(false);
  chart.interaction('element-active');

  return params;
}

/**
 * 迷你柱形图适配器
 * @param chart
 * @param options
 */
export function adaptor(params: Params<TinyColumnOptions>) {
  return flow(geometry, scale({}), tooltip, theme, animation, annotation())(params);
}
