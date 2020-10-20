import { deepMix, groupBy } from '@antv/util';
import { Params } from '../../core/adaptor';
import { tooltip, interaction, animation, theme, scale } from '../../adaptor/common';
import { interval } from '../../adaptor/geometries';
import { flow, findViewById, findGeometry, transformLabel } from '../../utils';
import { BidirectionalBarOptions } from './types';
import { LEFT_AXES_VIEW, RIGHT_AXES_VIEW } from './constant';

/**
 * geometry 处理
 * @param params
 */
function geometry(params: Params<BidirectionalBarOptions>): Params<BidirectionalBarOptions> {
  const { chart, options } = params;
  const { data, seriesField, xField, yField, color, barStyle, barWidthRatio, legend } = options;

  // 处理数据，通过 seriesField 分成左右数据
  const groupData = Object.values(groupBy(data, seriesField));

  chart.scale({
    [seriesField]: {
      sync: true,
    },
  });
  // 在创建子 view 执行后不行，需要在前面
  if (legend && seriesField) {
    chart.legend(seriesField, legend);
  } else if (legend === false) {
    chart.legend(false);
  }
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
  leftView.data(groupData[0]);
  const left = deepMix({}, params, {
    chart: leftView,
    options: {
      widthRatio: barWidthRatio,
      xField,
      yField,
      seriesField,
      interval: {
        color,
        style: barStyle,
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
  // 右边的 y 轴默认就要隐藏掉
  rightView.axis(xField, false);
  rightView.data(groupData[1]);
  const right = deepMix({}, params, {
    chart: rightView,
    options: {
      xField,
      yField,
      seriesField,
      widthRatio: barWidthRatio,
      interval: {
        color,
        style: barStyle,
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
function meta(params: Params<BidirectionalBarOptions>): Params<BidirectionalBarOptions> {
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
function axis(params: Params<BidirectionalBarOptions>): Params<BidirectionalBarOptions> {
  const { chart, options } = params;
  const { xAxis, yAxis, xField, yField } = options;

  const leftView = findViewById(chart, LEFT_AXES_VIEW);
  const rightView = findViewById(chart, RIGHT_AXES_VIEW);
  // 为 false 则是不显示轴
  if (xAxis === false) {
    leftView.axis(xField, false);
  } else {
    leftView.axis(xField, xAxis);
  }

  if (yAxis === false) {
    leftView.axis(yField, false);
    rightView.axis(yField, false);
  } else {
    leftView.axis(yField, yAxis);
    rightView.axis(yField, yAxis);
  }
  return params;
}

/**
 * label 配置
 * @param params
 */
function label(params: Params<BidirectionalBarOptions>): Params<BidirectionalBarOptions> {
  const { chart, options } = params;
  const { label, yField } = options;

  const leftView = findViewById(chart, LEFT_AXES_VIEW);
  const rightView = findViewById(chart, RIGHT_AXES_VIEW);
  const leftGeometry = findGeometry(leftView, 'interval');
  const rightGeometry = findGeometry(rightView, 'interval');

  if (!label) {
    leftGeometry.label(false);
    rightGeometry.label(false);
  } else {
    const { callback, ...cfg } = label;
    leftGeometry.label({
      fields: [yField],
      callback,
      cfg: transformLabel(cfg),
    });
    rightGeometry.label({
      fields: [yField],
      callback,
      cfg: transformLabel(cfg),
    });
  }

  return params;
}

/**
 * 对称条形图适配器
 * @param chart
 * @param options
 */
export function adaptor(params: Params<BidirectionalBarOptions>) {
  // flow 的方式处理所有的配置到 G2 API
  return flow(geometry, meta, axis, theme, label, tooltip, interaction, animation)(params);
}
