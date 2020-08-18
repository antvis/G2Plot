import { Params } from '../../core/adaptor';
import { RoseOptions } from './types';
import { flow, LEVEL, log } from '../../utils';
import { isFunction } from '@antv/util';
import { legend, tooltip, interaction, animation, theme } from '../../adaptor/common';

/**
 * geometry 配置处理
 * @param params
 */
function geometry(params: Params<RoseOptions>): Params<RoseOptions> {
  const { chart, options } = params;
  const { data = [], seriesField, radiusField, colorField, sectorStyle, color } = options;

  log(LEVEL.WARN, !data.length, 'the data option is empty.');

  // 装载数据
  chart.data(data);

  const geometry = chart.interval().position(`${seriesField}*${radiusField}`);
  geometry.color(colorField, color);
  if (isFunction(sectorStyle)) {
    geometry.style(`${seriesField}`, sectorStyle);
  } else {
    geometry.style(sectorStyle);
  }

  return params;
}

/**
 * coord 配置
 * @param params
 */
function coord(params: Params<RoseOptions>): Params<RoseOptions> {
  const { chart, options } = params;
  const { radius, innerRadius } = options;

  chart.coordinate({
    type: 'polar',
    cfg: {
      radius,
      innerRadius,
    },
  });

  return params;
}

/**
 * 玫瑰图适配器
 * @param chart
 * @param options
 */
export function adaptor(params: Params<RoseOptions>) {
  // flow 的方式处理所有的配置到 G2 API
  flow(geometry, coord, legend, tooltip, interaction, animation, theme)(params);
}
