import { deepMix } from '@antv/util';
import { Params } from '../../core/adaptor';
import { tooltip, interaction, animation, theme } from '../../adaptor/common';
import { area, point, line } from '../../adaptor/geometries';
import { AXIS_META_CONFIG_KEYS } from '../../constant';
import { flow, pick } from '../../utils';
import { RadarOptions } from './types';

/**
 * geometry 配置处理
 * @param params
 */
function geometry(params: Params<RadarOptions>): Params<RadarOptions> {
  const { chart, options } = params;
  const { data, lineStyle, smooth } = options;

  chart.data(data);
  // line geometry 处理
  flow(line)(deepMix({}, params, { options: { line: { smooth, style: lineStyle } } }));

  return params;
}

/**
 * meta 配置
 * @param params
 */
function meta(params: Params<RadarOptions>): Params<RadarOptions> {
  const { chart, options } = params;
  const { meta, xField, yField, xAxis, yAxis } = options;

  // meta 直接是 scale 的信息
  const scales = deepMix(
    {
      [xField]: pick(xAxis, AXIS_META_CONFIG_KEYS),
      [yField]: pick(yAxis, AXIS_META_CONFIG_KEYS),
    },
    meta
  );

  chart.scale(scales);

  return params;
}

/**
 * coord 配置
 * @param params
 */
function coord(params: Params<RadarOptions>): Params<RadarOptions> {
  const { chart, options } = params;
  const { radius } = options;

  chart.coordinate('polar', {
    radius,
  });
  return params;
}

/**
 * axis 配置
 * @param params
 */
function axis(params: Params<RadarOptions>): Params<RadarOptions> {
  const { chart, options } = params;
  const { xField, xAxis, yField, yAxis } = options;

  chart.axis(xField, xAxis);
  chart.axis(yField, yAxis);

  return params;
}

/**
 * legend 配置
 * @param params
 */
function legend(params: Params<RadarOptions>): Params<RadarOptions> {
  return params;
}

/**
 * label 配置
 * @param params
 */
function label(params: Params<RadarOptions>): Params<RadarOptions> {
  return params;
}

/**
 * 雷达图适配器
 * @param chart
 * @param options
 */
export function adaptor(params: Params<RadarOptions>) {
  // flow 的方式处理所有的配置到 G2 API
  flow(
    geometry,
    meta,
    // 雷达图 point geometry 处理
    point,
    // 雷达图 area geometry 处理
    area,
    theme,
    coord,
    axis,
    legend,
    tooltip,
    label,
    interaction,
    animation
  )(params);
}
