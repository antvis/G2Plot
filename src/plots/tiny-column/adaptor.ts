import { animation, annotation, pattern, theme, tooltip } from '../../adaptor/common';
import { interval } from '../../adaptor/geometries';
import { Params } from '../../core/adaptor';
import { deepAssign, flow } from '../../utils';
import { meta } from '../tiny-area/adaptor';
import { X_FIELD, Y_FIELD } from '../tiny-line/constants';
import { getTinyData } from '../tiny-line/utils';
import { TinyColumnOptions } from './types';

export { meta };

/**
 * 字段
 * @param params
 */
function geometry(params: Params<TinyColumnOptions>): Params<TinyColumnOptions> {
  const { chart, options } = params;
  const { data, color, columnStyle, columnWidthRatio } = options;

  const seriesData = getTinyData(data);

  chart.data(seriesData);

  const p = deepAssign({}, params, {
    options: {
      xField: X_FIELD,
      yField: Y_FIELD,
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
  return flow(theme, pattern('columnStyle'), geometry, meta, tooltip, animation, annotation())(params);
}
