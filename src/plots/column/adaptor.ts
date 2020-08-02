import { deepMix, isFunction, isNil } from '@antv/util';
import { Params } from '../../core/adaptor';
import { findGeometry } from '../../common/helper';
import { tooltip, interaction, animation, theme } from '../../adaptor/common';
import { flow, pick } from '../../utils';
import { ColumnOptions } from './types';
import { AXIS_META_CONFIG_KEYS } from '../../constant';

function getGroupField(params: Params<ColumnOptions>): string {
  const { options } = params;
  const { groupField, seriesField, colorField } = options;

  return groupField || seriesField || colorField;
}

function getStackField(params: Params<ColumnOptions>): string {
  const { options } = params;
  const { stackField, seriesField, colorField } = options;

  return stackField || seriesField || colorField;
}

/**
 * 字段
 * @param params
 */
function field(params: Params<ColumnOptions>): Params<ColumnOptions> {
  const { chart, options } = params;
  const { data, xField, yField, colorField, color, isGroup, isStack, marginRatio } = options;

  chart.data(data);
  const geometry = chart.interval().position(`${xField}*${yField}`);

  if (isGroup) {
    geometry.color(getGroupField(params), color);
    geometry.adjust({
      type: 'dodge',
      marginRatio,
    });
  } else if (isStack) {
    geometry.color(getStackField(params), color);
    geometry.adjust({
      type: 'stack',
      marginRatio,
    });
  } else {
    if (colorField) {
      geometry.color(colorField, color);
    }
  }

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
  const { legend, colorField } = options;

  if (legend && colorField) {
    chart.legend(colorField, legend);
  }

  return params;
}

/**
 * 样式
 * @param params
 */
function style(params: Params<ColumnOptions>): Params<ColumnOptions> {
  const { chart, options } = params;
  const { xField, yField, colorField, columnStyle } = options;

  const geometry = findGeometry(chart, 'interval');
  if (columnStyle && geometry) {
    if (isFunction(columnStyle)) {
      geometry.style(`${xField}*${yField}*${colorField}`, columnStyle);
    } else {
      geometry.style(columnStyle);
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
 * 柱形图额外的主题设置
 * @param params
 */
function columnTheme(params: Params<ColumnOptions>): Params<ColumnOptions> {
  const { chart, options } = params;
  const { columnWidthRatio } = options;

  if (!isNil(columnWidthRatio)) {
    chart.theme({
      columnWidthRatio,
    });
  }

  return params;
}

/**
 * 柱形图适配器
 * @param params
 */
export function adaptor(params: Params<ColumnOptions>) {
  return flow(field, meta, axis, legend, tooltip, theme, columnTheme, style, label, interaction, animation)(params);
}
