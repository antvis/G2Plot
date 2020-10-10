import { Geometry } from '@antv/g2';
import { deepMix, get } from '@antv/util';
import { Params } from '../../core/adaptor';
import { findGeometry } from '../../utils';
import { tooltip, interaction, animation, theme, state, scale, annotation } from '../../adaptor/common';
import { interval } from '../../adaptor/geometries';
import { DEFAULT_COLORS } from '../../constant';
import { flow } from '../../utils';
import { WaterOptions } from './types';
import { processData } from './utils';
import './shape';

/**
 * 字段
 * @param params
 */
function geometry(params: Params<WaterOptions>): Params<WaterOptions> {
  const { chart, options } = params;
  const {
    data,
    xField,
    yField,
    total,
    leaderLine,
    columnWidthRatio,
    waterfallStyle,
    color = DEFAULT_COLORS.BRAND_COLOR,
  } = options;

  // 数据处理
  const newData = processData(data, xField, yField, !!total && get(total, 'label', '总计'));
  chart.data(newData);

  const p = deepMix({}, params, {
    options: {
      widthRatio: columnWidthRatio,
      seriesField: xField,
      interval: {
        style: waterfallStyle,
        shape: 'waterfall',
        color,
      },
    },
  });
  const { ext } = interval(p);
  const geometry = ext.geometry as Geometry;

  // 将 radius 传入到自定义 shape 中
  geometry.customInfo({
    total,
    leaderLine,
  });

  return params;
}

/**
 * meta 配置
 * @param params
 */
function meta(params: Params<WaterOptions>): Params<WaterOptions> {
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
function axis(params: Params<WaterOptions>): Params<WaterOptions> {
  const { chart, options } = params;
  const { xAxis, yAxis, xField, yField } = options;

  // 为 false 则是不显示轴
  if (xAxis === false) {
    chart.axis(xField, false);
  } else {
    chart.axis(xField, xAxis);
  }

  if (yAxis === false) {
    chart.axis(yField, false);
  } else {
    chart.axis(yField, yAxis);
  }

  return params;
}

/**
 * legend 配置 todo
 * @param params
 */
function legend(params: Params<WaterOptions>): Params<WaterOptions> {
  const { chart, options } = params;
  const { legend } = options;
  const geometry = findGeometry(chart, 'interval');
  const colorAttribute = geometry.getAttribute('color');

  if (legend && colorAttribute) {
    const colorFields = colorAttribute.getFields();
    if (colorFields.length > 0) {
      chart.legend(colorFields[0], legend);
    }
  } else {
    chart.legend(false);
  }

  return params;
}

/**
 * 数据标签
 * @param params
 */
function label(params: Params<WaterOptions>): Params<WaterOptions> {
  const { chart, options } = params;
  const { label, yField } = options;

  const geometry = findGeometry(chart, 'interval');

  if (!label) {
    geometry.label(false);
  } else {
    const { callback, ...cfg } = label;
    geometry.label({
      fields: [yField],
      callback,
      cfg,
    });
  }

  return params;
}

/**
 * 瀑布图适配器
 * @param params
 */
export function adaptor(params: Params<WaterOptions>) {
  return flow(geometry, meta, axis, legend, tooltip, label, state, theme, interaction, animation, annotation())(params);
}
