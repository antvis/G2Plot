import { deepMix, isFunction, map } from '@antv/util';
import { Params } from '../../core/adaptor';
import { interaction, animation, theme } from '../../adaptor/common';
import { findGeometry } from '../../utils';
import { BoxOptions } from './types';
import { flow, pick } from '../../utils';
import { AXIS_META_CONFIG_KEYS } from '../../constant';
import { BOX_RANGE, BOX_SYNC_NAME } from './constant';

/**
 * 字段
 * @param params
 */
function field(params: Params<BoxOptions>): Params<BoxOptions> {
  const { chart, options } = params;
  const { xField, yField, groupField, color } = options;

  const yFieldName = Array.isArray(yField) ? BOX_RANGE : yField;

  const geometry = chart.schema().position(`${xField}*${yFieldName}`).shape('box');

  // set group field as color channel
  if (groupField) {
    geometry.color(groupField, color).adjust('dodge');
  }

  // formate data when `yField` is Array
  let data = options.data;
  if (Array.isArray(yField)) {
    const [low, q1, median, q3, high] = yField;
    data = map(data, (obj) => {
      obj[BOX_RANGE] = [obj[low], obj[q1], obj[median], obj[q3], obj[high]];
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
  const { meta, xAxis, yAxis, xField, yField, outliersField } = options;
  const yFieldName = Array.isArray(yField) ? BOX_RANGE : yField;

  let baseMeta = {};

  // make yField and outliersField share y mate
  if (outliersField) {
    const syncName = BOX_SYNC_NAME;
    baseMeta = {
      [outliersField]: { sync: syncName },
      [yFieldName]: { sync: syncName },
    };
  }

  const scales = deepMix(baseMeta, meta, {
    [xField]: pick(xAxis, AXIS_META_CONFIG_KEYS),
    [yFieldName]: pick(yAxis, AXIS_META_CONFIG_KEYS),
  });

  chart.scale(scales);

  return params;
}

/**
 * axis 配置
 * @param params
 */
function axis(params: Params<BoxOptions>): Params<BoxOptions> {
  const { chart, options } = params;
  const { xAxis, yAxis, xField, yField } = options;
  const yFieldName = Array.isArray(yField) ? BOX_RANGE : yField;

  // 为 false 则是不显示轴
  if (xAxis === false) {
    chart.axis(xField, false);
  } else {
    chart.axis(xField, xAxis);
  }

  if (yAxis === false) {
    chart.axis(BOX_RANGE, false);
  } else {
    chart.axis(yFieldName, yAxis);
  }

  return params;
}

/**
 * legend 配置
 * @param params
 */
export function legend(params: Params<BoxOptions>): Params<BoxOptions> {
  const { chart, options } = params;
  const { legend, groupField } = options;

  if (groupField) {
    if (legend) {
      chart.legend(groupField, legend);
    } else {
      // Grouped Box Chart default has legend, and it's position is `bottom`
      chart.legend(groupField, { position: 'bottom' });
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
  const yFieldName = Array.isArray(yField) ? BOX_RANGE : yField;
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
