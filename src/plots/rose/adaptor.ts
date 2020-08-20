import { isFunction } from '@antv/util';
import { Params } from '../../core/adaptor';
import { RoseOptions } from './types';
import { flow, LEVEL, log } from '../../utils';
import { legend, tooltip, interaction, animation, theme } from '../../adaptor/common';

/**
 * geometry 配置处理
 * @param params
 */
function geometry(params: Params<RoseOptions>): Params<RoseOptions> {
  const { chart, options } = params;
  const { data = [], seriesField, radiusField, colorField, sectorStyle, color, label } = options;

  log(LEVEL.WARN, !!data.length, 'the data option is empty.');

  // 装载数据
  chart.data(data);

  const geometry = chart.interval().position(`${seriesField}*${radiusField}`);
  geometry.color(colorField, color);
  if (isFunction(sectorStyle)) {
    geometry.style(seriesField, sectorStyle);
  } else if (sectorStyle) {
    geometry.style(sectorStyle);
  }
  label && geometry.label(label);

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
 * axis 配置
 * @param params
 */
function axis(params: Params<RoseOptions>): Params<RoseOptions> {
  const { chart, options } = params;
  const { xAxis, yAxis, seriesField, radiusField } = options;

  // 为 falsy 则是不显示轴
  if (!xAxis) {
    chart.axis(seriesField, false);
  } else {
    chart.axis(seriesField, xAxis);
  }

  if (!yAxis) {
    chart.axis(radiusField, false);
  } else {
    chart.axis(radiusField, yAxis);
  }

  return params;
}

/**
 * 玫瑰图适配器
 * @param chart
 * @param options
 */
export function adaptor(params: Params<RoseOptions>) {
  // flow 的方式处理所有的配置到 G2 API
  flow(geometry, coord, axis, legend, tooltip, interaction, animation, theme)(params);
}
