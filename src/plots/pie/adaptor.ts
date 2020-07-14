import { deepMix, isFunction } from '@antv/util';
import { Params } from '../../core/adaptor';
import { tooltip } from '../../common/adaptor';
import { flow } from '../../utils';
import { PieOptions } from './types';

/**
 * 字段
 * @param params
 */
function field(params: Params<PieOptions>): Params<PieOptions> {
  const { chart, options } = params;
  const { data, angleField, colorField, color } = options;

  // TODO 饼图数据非法处理
  chart.data(data);
  const geometry = chart.interval().position(`1*${angleField}`).adjust({ type: 'stack' });

  if (colorField) {
    geometry.color(colorField, color);
  }

  return params;
}

/**
 * meta 配置
 * @param params
 */
function meta(params: Params<PieOptions>): Params<PieOptions> {
  const { chart, options } = params;
  const { meta, colorField } = options;

  // meta 直接是 scale 的信息
  const scales = deepMix({}, meta);
  chart.scale(scales, {
    [colorField]: { type: 'cat' },
  });

  return params;
}

/**
 * coord 配置
 * @param params
 */
function coord(params: Params<PieOptions>): Params<PieOptions> {
  const { chart, options } = params;
  const { radius, innerRadius } = options;

  chart.coordinate({
    type: 'theta',
    cfg: {
      radius,
      innerRadius,
    },
  });

  return params;
}

/**
 * legend 配置
 * @param params
 */
function legend(params: Params<PieOptions>): Params<PieOptions> {
  const { chart, options } = params;
  const { legend, colorField } = options;

  if (legend && colorField) {
    chart.legend(colorField, legend);
  }

  return params;
}

/**
 * style 配置
 * @param params
 */
function style(params: Params<PieOptions>): Params<PieOptions> {
  const { chart, options } = params;
  const { pieStyle, angleField, colorField } = options;

  const geometry = chart.geometries[0];
  if (pieStyle && geometry) {
    if (isFunction(pieStyle)) {
      // 为了兼容，colorField 放第一位
      geometry.style(colorField ? `${colorField}*${angleField}` : angleField, pieStyle);
    } else {
      geometry.style(pieStyle);
    }
  }

  return params;
}

/**
 * 折线图适配器
 * @param chart
 * @param options
 */
export function adaptor(params: Params<PieOptions>) {
  // flow 的方式处理所有的配置到 G2 API
  flow(field, meta, coord, legend, tooltip, style)(params);
}
