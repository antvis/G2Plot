import { deepMix } from '@antv/util';
import { Params } from '../../core/adaptor';
import { findGeometry } from '../../common/helper';
import { tooltip, interaction, animation, theme } from '../../adaptor/common';
import { interval } from '../../adaptor/geometries';
import { flow, pick } from '../../utils';
import { ColumnOptions } from './types';
import { AXIS_META_CONFIG_KEYS } from '../../constant';

/**
 * 字段
 * @param params
 */
function geometry(params: Params<ColumnOptions>): Params<ColumnOptions> {
  const { chart, options } = params;
  const { data, columnStyle, columnWidthRatio, marginRatio } = options;

  chart.data(data);

  flow(interval)(
    deepMix({}, params, {
      options: {
        interval: {
          marginRatio,
          widthRatio: columnWidthRatio,
          style: columnStyle,
        },
      },
    })
  );

  return params;
}

/**
 * meta 配置
 * @param params
 */
function meta(params: Params<ColumnOptions>): Params<ColumnOptions> {
  const { chart, options } = params;
  const { meta, xAxis, yAxis, xField, yField } = options;

  const scales = deepMix({}, meta, {
    [xField]: pick(xAxis, AXIS_META_CONFIG_KEYS),
    [yField]: pick(yAxis, AXIS_META_CONFIG_KEYS),
  });

  chart.scale(scales);

  return params;
}

/**
 * axis 配置
 * @param params
 */
function axis(params: Params<ColumnOptions>): Params<ColumnOptions> {
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
 * legend 配置
 * @param params
 */
function legend(params: Params<ColumnOptions>): Params<ColumnOptions> {
  const { chart, options } = params;
  const { legend } = options;
  const geometry = findGeometry(chart, 'interval');
  const colorAttribute = geometry.getAttribute('color');

  if (legend && colorAttribute) {
    const colorFields = colorAttribute.getFields();
    if (colorFields.length > 0) {
      chart.legend(colorFields[0], legend);
    }
  }

  return params;
}

/**
 * 数据标签
 * @param params
 */
function label(params: Params<ColumnOptions>): Params<ColumnOptions> {
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
 * 柱形图适配器
 * @param params
 */
export function adaptor(params: Params<ColumnOptions>) {
  return flow(geometry, meta, axis, legend, tooltip, theme, label, interaction, animation)(params);
}
