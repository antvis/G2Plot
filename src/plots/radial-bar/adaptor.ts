import { filter } from '@antv/util';
import { interaction, animation, theme, scale, tooltip, legend, annotation } from '../../adaptor/common';
import { Params } from '../../core/adaptor';
import { flow, deepAssign, findGeometry, transformLabel, log, LEVEL } from '../../utils';
import { interval, point } from '../../adaptor/geometries';
import { RadialBarOptions } from './types';
import { getScaleMax } from './utils';
/**
 * data 处理，过滤非法数据
 * @param params
 */
function data(params: Params<RadialBarOptions>): Params<RadialBarOptions> {
  const { chart, options } = params;
  const { data } = options;
  const { yField } = options;

  const processData = filter(data, (d) => {
    const v = d[yField];
    return (typeof v === 'number' && !isNaN(v)) || v === null;
  });

  // 打印异常数据情况
  log(LEVEL.WARN, processData.length === data.length, 'illegal data existed in chart data.');

  chart.data(processData);

  return params;
}

/**
 * geometry 处理
 * @param params
 */
function geometry(params: Params<RadialBarOptions>): Params<RadialBarOptions> {
  const { chart, options } = params;
  const { barStyle: style, color, tooltip, colorField, type, xField, yField } = options;
  const p = deepAssign({}, params, {
    options: {
      tooltip,
      seriesField: colorField,
      interval: {
        style,
        color,
        shape: type === 'line' ? 'line' : 'intervel',
      },
      // 柱子的一些样式设置：柱子最小宽度、柱子最大宽度、柱子背景
      minColumnWidth: options.minBarWidth,
      maxColumnWidth: options.maxBarWidth,
      columnBackground: options.barBackground,
    },
  });
  interval(p);
  if (type === 'line') {
    point({
      chart,
      options: { xField, yField, seriesField: colorField, point: { shape: 'circle', color } },
    });
  }
  return params;
}

/**
 * meta 配置
 * @param params
 */
export function meta(params: Params<RadialBarOptions>): Params<RadialBarOptions> {
  const { options, chart } = params;
  const { yField, maxAngle } = options;

  // data使用chart.data()之后的，因为原始data中可能存在非法数据
  const { data } = chart.getOptions();
  return flow(
    scale({
      [yField]: {
        min: 0,
        max: getScaleMax(maxAngle, yField, data),
      },
    })
  )(params);
}

/**
 * coordinate 配置
 * @param params
 */
function coordinate(params: Params<RadialBarOptions>): Params<RadialBarOptions> {
  const { chart, options } = params;
  const { radius, innerRadius, startAngle, endAngle } = options;

  chart
    .coordinate({
      type: 'polar',
      cfg: {
        radius,
        innerRadius,
        startAngle,
        endAngle,
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
  const { xField, xAxis } = options;
  chart.axis(xField, xAxis);
  return params;
}

/**
 * 数据标签
 * @param params
 */
function label(params: Params<RadialBarOptions>): Params<RadialBarOptions> {
  const { chart, options } = params;
  const { label, yField } = options;

  const intervalGeometry = findGeometry(chart, 'interval');

  // label 为 false, 空 则不显示 label
  if (!label) {
    intervalGeometry.label(false);
  } else {
    const { callback, ...cfg } = label;
    intervalGeometry.label({
      fields: [yField],
      callback,
      cfg: {
        ...transformLabel(cfg),
        type: 'polar',
      },
    });
  }

  return params;
}

/**
 * 图适配器
 * @param chart
 * @param options
 */
export function adaptor(params: Params<RadialBarOptions>) {
  return flow(
    data,
    geometry,
    meta,
    axis,
    coordinate,
    interaction,
    animation,
    theme,
    tooltip,
    legend,
    annotation(),
    label
  )(params);
}
