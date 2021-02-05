import { Params } from '../../core/adaptor';
import { flow, deepAssign } from '../../utils';
import { scale, theme, animation, annotation, tooltip } from '../../adaptor/common';
import { line, point } from '../../adaptor/geometries';
import { adjustYMetaByZero } from '../../utils/data';
import { getTinyData } from './utils';
import { TinyLineOptions } from './types';
import { X_FIELD, Y_FIELD } from './constants';

/**
 * 字段
 * @param params
 */
function geometry(params: Params<TinyLineOptions>): Params<TinyLineOptions> {
  const { chart, options } = params;
  const { data, color, lineStyle, point: pointMapping } = options;

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
  const second = deepAssign({}, primary, { options: { tooltip: false } });

  line(primary);
  point(second);

  chart.axis(false);
  chart.legend(false);

  return params;
}

/**
 * meta 配置
 * @param params
 */
export function meta(params: Params<TinyLineOptions>): Params<TinyLineOptions> {
  const { options } = params;
  const { xAxis, yAxis, data } = options;
  const seriesData = getTinyData(data);

  return flow(
    scale(
      {
        [X_FIELD]: xAxis,
        [Y_FIELD]: yAxis,
      },
      {
        [X_FIELD]: {
          type: 'cat',
        },
        [Y_FIELD]: adjustYMetaByZero(seriesData, Y_FIELD),
      }
    )
  )(params);
}

/**
 * 迷你折线图适配器
 * @param chart
 * @param options
 */
export function adaptor(params: Params<TinyLineOptions>) {
  return flow(geometry, meta, theme, tooltip, animation, annotation())(params);
}
