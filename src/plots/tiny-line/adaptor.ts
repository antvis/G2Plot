import { Params } from '../../core/adaptor';
import { flow, deepAssign } from '../../utils';
import { scale, theme, animation, annotation, tooltip } from '../../adaptor/common';
import { line, point } from '../../adaptor/geometries';
import { adjustYMetaByZero } from '../../utils/data';
import { TinyLineOptions } from './types';
import { X_FIELD, Y_FIELD } from './constants';

/**
 * 字段
 * @param params
 */
function geometry(params: Params<TinyLineOptions>): Params<TinyLineOptions> {
  const { chart, options } = params;
  const { data, xAxis, yAxis, color, lineStyle, point: pointMapping } = options;

  const seriesData = data.map((y: number, x: number) => {
    return { x, y };
  });

  chart.data(seriesData);

  // line geometry 处理
  const p = deepAssign({}, params, {
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

  line(p);
  point(p);

  chart.axis(false);
  chart.legend(false);

  // scale
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
  )(params);

  return params;
}

/**
 * 迷你折线图适配器
 * @param chart
 * @param options
 */
export function adaptor(params: Params<TinyLineOptions>) {
  return flow(geometry, theme, tooltip, animation, annotation())(params);
}
