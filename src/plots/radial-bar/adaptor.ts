import { deepMix } from '@antv/util';
import { interaction, animation, theme, scale, tooltip, legend } from '../../adaptor/common';
import { Params } from '../../core/adaptor';
import { flow } from '../../utils';
import { interval } from '../../adaptor/geometries';
import { RadialBarOptions } from './types';

/**
 * geometry 处理
 * @param params
 */
function geometry(params: Params<RadialBarOptions>): Params<RadialBarOptions> {
  const { chart, options } = params;
  const { data, xField, yField, barStyle: style, color, tooltip } = options;
  chart.data(data);

  // const interval = chart.interval().position(`${xField}*${yField}`);

  // interval.tooltip(yField,(val)=>{
  //   return {
  //     name: '占比',
  //     value: val * 100 + '%',
  //   };
  // });

  // if (barStyle) {
  //   interval.style(barStyle);
  // }
  // if (color) {
  //   interval.color(`${yField}`, color);
  // }

  const p = deepMix({}, params, {
    options: {
      tooltip,
      interval: {
        style,
        color,
      },
    },
  });
  interval(p);
  return params;
}

/**
 * meta 配置
 * @param params
 */
export function meta(params: Params<RadialBarOptions>): Params<RadialBarOptions> {
  const { options } = params;
  const { xField, yField } = options;
  return flow(
    scale({
      [xField]: false,
      [yField]: {
        min: 0,
        max: 2,
      },
    })
  )(params);
}

/**
 * coordinate 配置
 * @param params
 */
function coordinate(params: Params<RadialBarOptions>): Params<RadialBarOptions> {
  const { chart } = params;
  chart
    .coordinate({
      type: 'polar',
      cfg: {
        innerRadius: 0.1,
      },
    })
    .transpose();
  return params;
}

/**
 * axis 配置
 * @param params
 */
export function axis(params: Params<RadialBarOptions>): Params<RadialBarOptions> {
  const { chart, options } = params;
  const { xField } = options;
  chart.axis(xField, {
    grid: null,
    tickLine: null,
    line: null,
  });
  return params;
}

/**
 * 图适配器
 * @param chart
 * @param options
 */
export function adaptor(params: Params<RadialBarOptions>) {
  return flow(geometry, meta, axis, coordinate, interaction, animation, theme, tooltip, legend)(params);
}
