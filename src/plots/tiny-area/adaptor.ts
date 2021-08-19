import { theme, scale, animation, annotation, tooltip, pattern } from '../../adaptor/common';
import { Params } from '../../core/adaptor';
import { flow, deepAssign } from '../../utils';
import { area, line, point } from '../../adaptor/geometries';
import { X_FIELD, Y_FIELD } from '../tiny-line/constants';
import { getTinyData } from '../tiny-line/utils';
import { adjustYMetaByZero } from '../../utils/data';
import { TinyAreaOptions } from './types';

/**
 * 字段
 * @param params
 */
function geometry(params: Params<TinyAreaOptions>): Params<TinyAreaOptions> {
  const { chart, options } = params;
  const { data, color, areaStyle, point: pointOptions, line: lineOptions } = options;
  const pointState = pointOptions?.state;

  const seriesData = getTinyData(data);

  chart.data(seriesData);

  const primary = deepAssign({}, params, {
    options: {
      xField: X_FIELD,
      yField: Y_FIELD,
      area: { color, style: areaStyle },
      line: lineOptions,
      point: pointOptions,
    },
  });
  const second = deepAssign({}, primary, { options: { tooltip: false } });
  const pointParams = deepAssign({}, primary, { options: { tooltip: false, state: pointState } });

  // area geometry 处理
  area(primary);
  line(second);
  point(pointParams);

  chart.axis(false);
  chart.legend(false);

  return params;
}

/**
 * meta 配置
 * @param params
 */
export function meta(params: Params<TinyAreaOptions>): Params<TinyAreaOptions> {
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
 * 迷你面积图适配器
 * @param chart
 * @param options
 */
export function adaptor(params: Params<TinyAreaOptions>) {
  return flow(pattern('areaStyle'), geometry, meta, tooltip, theme, animation, annotation())(params);
}
