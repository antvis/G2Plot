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
  const { xField, yField, data } = options;
  const [low, q1, median, q3, high] = yField;

  const dataset = map(data, (obj) => {
    obj[Box.RANGE] = [obj[low], obj[q1], obj[median], obj[q3], obj[high]];
    return obj;
  });

  chart.schema().position(`${xField}*${Box.RANGE}`).shape('box');
  chart.data(dataset);

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
  // const { chart, options } = params;
  // const { legend, seriesField } = options;

  // if (legend && seriesField) {
  //   chart.legend(seriesField, legend);
  // }

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
  if (boxStyle && geometry) {
    if (isFunction(boxStyle)) {
      geometry.style(`${xField}*${yField.join('*')}`, boxStyle);
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
  console.log('tooltip: ', tooltip);

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
  return flow(field, meta, axis, style, tooltip, interaction, animation, theme)(params);
}
