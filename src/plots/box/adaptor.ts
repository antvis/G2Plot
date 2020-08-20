import { deepMix, isFunction, map } from '@antv/util';
import { Box } from './';
import { Params } from '../../core/adaptor';
import { interaction, animation, theme } from '../../adaptor/common';
import { findGeometry } from '../../utils';
import { BoxOptions } from './types';
import { flow, pick } from '../../utils';
import { AXIS_META_CONFIG_KEYS } from '../../constant';

function getGroupField(params: Params<BoxOptions>): string {
  const { options } = params;
  const { groupField, seriesField, colorField } = options;

  return groupField || seriesField || colorField;
}

/**
 * 字段
 * @param params
 */
function field(params: Params<BoxOptions>): Params<BoxOptions> {
  const { chart, options } = params;
  const { xField, yField, isGroup, colorField, color } = options;

  const yFieldName = Array.isArray(yField) ? Box.RANGE : yField;

  const geometry = chart.schema().position(`${xField}*${yFieldName}`).shape('box');

  // set group field as color channel
  let realColorField = colorField;
  if (isGroup) {
    realColorField = getGroupField(params);
    geometry.color(realColorField, color).adjust('dodge');
  } else {
    if (colorField) {
      geometry.color(colorField, color);
    }
  }

  // formate data when `yField` is Array
  let data = options.data;
  if (Array.isArray(yField)) {
    const [low, q1, median, q3, high] = yField;
    data = map(data, (obj) => {
      obj[Box.RANGE] = [obj[low], obj[q1], obj[median], obj[q3], obj[high]];
      return obj;
    });
  }

  chart.data(data);

  return params;
}

function outliersPoint(params: Params<BoxOptions>): Params<BoxOptions> {
  const { chart, options } = params;
  const { xField, data, outliersField, outliersStyle, padding } = options;

  if (!outliersField) return params;

  const outliersView = chart.createView({ padding });
  outliersView.data(data);
  outliersView.axis(false);
  const outliersGeom = outliersView.point().position(`${xField}*${outliersField}`).shape('circle');

  if (outliersStyle) {
    if (isFunction(outliersStyle)) {
      outliersGeom.style(`${xField}*${outliersField}`, outliersStyle);
    } else {
      outliersGeom.style(outliersStyle);
    }
  }

  return params;
}

/**
 * meta 配置
 * @param params
 */
function meta(params: Params<BoxOptions>): Params<BoxOptions> {
  const { chart, options } = params;
<<<<<<< HEAD
  const { meta, xAxis, yAxis, xField, yField, outliersField } = options;
  const yFieldName = Array.isArray(yField) ? Box.RANGE : yField;

  let baseMeta = {};

  // make yField and outliersField share y mate
  if (outliersField) {
    const syncName = '$$y_outliers$$';
    baseMeta = {
      [outliersField]: { sync: syncName },
      [yFieldName]: { sync: syncName },
    };
  }

  const scales = deepMix(baseMeta, meta, {
    [xField]: pick(xAxis, AXIS_META_CONFIG_KEYS),
    [yFieldName]: pick(yAxis, AXIS_META_CONFIG_KEYS),
  });
=======
  const { meta, xAxis, yAxis, xField } = options;

  const scales = deepMix(
    {
      // 箱型图默认 range 从0 开始
      [RANGE]: { min: 0 },
    },
    meta,
    {
      [xField]: pick(xAxis, AXIS_META_CONFIG_KEYS),
      [RANGE]: pick(yAxis, AXIS_META_CONFIG_KEYS),
    }
  );
>>>>>>> 82b5e3ae... feat: 增加基础 demo

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
  const { legend } = options;

  const realColorField = getGroupField(params);

  if (realColorField) {
    if (legend) {
      chart.legend(realColorField, legend);
    } else {
      // Grouped Box Chart default has legend, and it's position is `bottom`
      chart.legend(realColorField, { position: 'bottom' });
    }
  } else {
    chart.legend(false);
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
  return flow(field, outliersPoint, meta, axis, style, legend, tooltip, interaction, animation, theme)(params);
}
