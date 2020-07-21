import { Geometry, Chart } from '@antv/g2';
import { deepMix, isFunction } from '@antv/util';
import { Params } from '../../core/adaptor';
import { flow, pick } from '../../utils';
import { ColumnOptions } from './types';
import { AXIS_META_CONFIG_KEYS } from '../../constant';

function findGeometry(chart: Chart): Geometry | undefined {
  return chart.geometries.find((g: Geometry) => g.type === 'interval');
}

/**
 * 字段
 * @param params
 */
function field(params: Params<ColumnOptions>): Params<ColumnOptions> {
  const { chart, options } = params;
  const { data, xField, yField, colorField, color } = options;

  chart.data(data);
  const geometry = chart.interval().position(`${xField}*${yField}`);

  if (colorField) {
    geometry.color(colorField, color);
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
    chart.axis(xField, false);
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

  const geometry = findGeometry(chart);
  if (columnStyle && geometry) {
    if (isFunction(columnStyle)) {
      geometry.style(colorField ? `${xField}*${yField}*${colorField}` : `${xField}*${yField}`, columnStyle);
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

  const geometry = findGeometry(chart);

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
  return flow(field, meta, axis, legend, style, label)(params);
}
