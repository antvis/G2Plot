import { deepMix, groupBy } from '@antv/util';
import { Params } from '../../core/adaptor';
import { tooltip, interaction, animation, theme, scale } from '../../adaptor/common';
import { interval } from '../../adaptor/geometries';
import { flow } from '../../utils';

import { BidirectionalOptions } from './types';

import { LEFT_AXES_VIEW, RIGHT_AXES_VIEW } from './constant';

/**
 * geometry 处理
 * @param params
 */
function geometry(params: Params<BidirectionalOptions>): Params<BidirectionalOptions> {
  const { chart, options } = params;
  const { data, seriesField, xField, yField, color, columnStyle, columnWidthRatio } = options;

  // 处理数据，通过 seriesField 分成左右数据
  const groupData = Object.values(groupBy(data, seriesField));

  chart.scale({
    [seriesField]: {
      sync: true,
    },
    [yField]: {
      sync: true,
    },
  });
  // 创建左边子 view
  const leftView = chart.createView({
    region: {
      start: { x: 0, y: 0 },
      end: { x: 0.5, y: 1 },
    },
    id: LEFT_AXES_VIEW,
  });
  // 转轴
  leftView.coordinate().transpose().reflect('x');
  // 相当于轴在左边
  leftView.axis(`${xField}`, { position: 'top' });
  leftView.data(groupData[0]);
  const left = deepMix({}, params, {
    chart: leftView,
    options: {
      widthRatio: columnWidthRatio,
      xField,
      yField,
      seriesField,
      interval: {
        color,
        style: columnStyle,
      },
    },
  });

  interval(left);

  // 创建右边子 view
  const rightView = chart.createView({
    region: {
      start: { x: 0.5, y: 0 },
      end: { x: 1, y: 1 },
    },
    id: RIGHT_AXES_VIEW,
  });
  rightView.coordinate().transpose();
  // 右边的轴隐藏掉
  rightView.axis(`${xField}`, false);
  rightView.data(groupData[1]);

  const right = deepMix({}, params, {
    chart: rightView,
    options: {
      xField,
      yField,
      seriesField,
      widthRatio: columnWidthRatio,
      interval: {
        color,
        style: columnStyle,
      },
    },
  });

  interval(right);
  return params;
}

/**
 * meta 配置
 * @param params
 */
function meta(params: Params<BidirectionalOptions>): Params<BidirectionalOptions> {
  const { options } = params;
  const { xAxis, yAxis, xField, yField } = options;

  return flow(
    scale({
      [xField]: xAxis,
      [yField]: yAxis,
    })
  )(params);
}

/**
 * axis 配置
 * @param params
 */
function axis(params: Params<BidirectionalOptions>): Params<BidirectionalOptions> {
  // Todo
  return params;
}

/**
 * label 配置
 * @param params
 */
function label(params: Params<BidirectionalOptions>): Params<BidirectionalOptions> {
  // Todo
  return params;
}

/**
 * 对称条形图适配器
 * @param chart
 * @param options
 */
export function adaptor(params: Params<BidirectionalOptions>) {
  // flow 的方式处理所有的配置到 G2 API
  return flow(geometry, meta, axis, theme, label, tooltip, interaction, animation)(params);
}
