import { deepMix, isFunction, map } from '@antv/util';
import { Box } from './';
import { Params } from '../../core/adaptor';
import { interaction, animation, theme } from '../../adaptor/common';
import { findGeometry } from '../../utils';
import { BoxOptions } from './types';
import { flow, pick } from '../../utils';
import { AXIS_META_CONFIG_KEYS } from '../../constant';

/**
 * 字段
 * @param params
 */
function field(params: Params<BoxOptions>): Params<BoxOptions> {
  const { chart, options } = params;
  const { xField, yField, isGroup, groupField, colorField, seriesField, color } = options;
  let { data } = options;

  const yFieldName = Array.isArray(yField) ? Box.RANGE : yField;
  if (Array.isArray(yField)) {
    const [low, q1, median, q3, high] = yField;
    data = map(data, (obj) => {
      obj[Box.RANGE] = [obj[low], obj[q1], obj[median], obj[q3], obj[high]];
      return obj;
    });
  }

  const geometry = chart.schema().position(`${xField}*${yFieldName}`).shape('box');

  let realColorField = colorField;
  // 设置分组信息
  if (isGroup) {
    realColorField = groupField || seriesField || colorField;
    geometry.color(realColorField, color).adjust('dodge');
  } else {
    if (colorField) {
      geometry.color(colorField, color);
    }
  }

  chart.data(data);

  return params;
}

/**
 * meta 配置
 * @param params
 */
function meta(params: Params<BoxOptions>): Params<BoxOptions> {
  const { chart, options } = params;
  const { meta, xAxis, yAxis, xField } = options;

  const scales = deepMix(
    {
      // 箱型图默认 range 从0 开始
      [Box.RANGE]: { min: 0 },
    },
    meta,
    {
      [xField]: pick(xAxis, AXIS_META_CONFIG_KEYS),
      [Box.RANGE]: pick(yAxis, AXIS_META_CONFIG_KEYS),
    }
  );

  chart.scale(scales);

  return params;
}

/**
 * axis 配置
 * @param params
 */
function axis(params: Params<BoxOptions>): Params<BoxOptions> {
  const { chart, options } = params;
  const { xAxis, yAxis, xField } = options;

  // 为 false 则是不显示轴
  if (xAxis === false) {
    chart.axis(xField, false);
  } else {
    chart.axis(xField, xAxis);
  }

  if (yAxis === false) {
    chart.axis(Box.RANGE, false);
  } else {
    chart.axis(Box.RANGE, yAxis);
  }

  return params;
}

/**
 * legend 配置
 * @param params
 */
export function legend(params: Params<BoxOptions>): Params<BoxOptions> {
  const { chart, options } = params;
  const { legend, seriesField } = options;

  if (legend && seriesField) {
    chart.legend(seriesField, legend);
  }

  return params;
}

/**
 * 样式
 * @param params
 */
function style(params: Params<BoxOptions>): Params<BoxOptions> {
  const { chart, options } = params;
  const { xField, yField, boxStyle } = options;

  const geometry = findGeometry(chart, 'schema');
  const yFieldName = Array.isArray(yField) ? Box.RANGE : yField;
  if (boxStyle && geometry) {
    if (isFunction(boxStyle)) {
      geometry.style(`${xField}*${yFieldName}`, boxStyle);
    } else {
      geometry.style(boxStyle);
    }
  }
  return params;
}

/**
 * tooltip 配置
 * @param params
 */
export function tooltip(params: Params<BoxOptions>): Params<BoxOptions> {
  const { chart, options } = params;
  const { tooltip } = options;

  if (tooltip !== undefined) {
    chart.tooltip(tooltip);
  }

  return params;
}

/**
 * 箱型图适配器
 * @param params
 */
export function adaptor(params: Params<BoxOptions>) {
  return flow(field, meta, axis, style, legend, tooltip, interaction, animation, theme)(params);
}
