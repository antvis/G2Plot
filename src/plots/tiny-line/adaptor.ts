import { Params } from '../../core/adaptor';
import { flow, deepAssign } from '../../utils';
import { theme, animation, annotation, tooltip } from '../../adaptor/common';
import { line, point } from '../../adaptor/geometries';
import { meta } from '../tiny-area/adaptor';
import { getTinyData } from './utils';
import { TinyLineOptions } from './types';
import { X_FIELD, Y_FIELD } from './constants';

export { meta };

/**
 * 字段
 * @param params
 */
function geometry(params: Params<TinyLineOptions>): Params<TinyLineOptions> {
  const { chart, options } = params;
  const { data, color, lineStyle, point: pointMapping } = options;

  const pointState = pointMapping?.state;

  const seriesData = getTinyData(data);

  chart.data(seriesData);

  // line geometry 处理
  const primary = deepAssign({}, params, {
    options: {
      xField: X_FIELD,
      yField: Y_FIELD,
      line: {
        color,
        style: lineStyle,
      },
      point: pointMapping,
    },
  });
  const pointParams = deepAssign({}, primary, { options: { tooltip: false, state: pointState } });

  line(primary);
  point(pointParams);

  chart.axis(false);
  chart.legend(false);

  return params;
}

/**
 * 迷你折线图适配器
 * @param chart
 * @param options
 */
export function adaptor(params: Params<TinyLineOptions>) {
  return flow(geometry, meta, theme, tooltip, animation, annotation())(params);
}
