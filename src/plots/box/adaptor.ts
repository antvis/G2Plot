import { isFunction, isObject } from '@antv/util';
import { Params } from '../../core/adaptor';
import { interaction, animation, theme } from '../../adaptor/common';
import { findGeometry } from '../../utils';
import { flow, pick, deepAssign } from '../../utils';
import { AXIS_META_CONFIG_KEYS } from '../../constant';
import { BoxOptions } from './types';
import { BOX_RANGE, BOX_SYNC_NAME, OUTLIERS_VIEW_ID } from './constant';
import { transformData } from './utils';

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

  chart.data(transformData(options.data, yField));

  return params;
}

function outliersPoint(params: Params<BoxOptions>): Params<BoxOptions> {
  const { chart, options } = params;
  const { xField, data, outliersField, outliersStyle, padding } = options;

  if (!outliersField) return params;

  const outliersView = chart.createView({ padding, id: OUTLIERS_VIEW_ID });
  outliersView.data(data);
  outliersView.axis(false);
  const geometry = outliersView.point().position(`${xField}*${outliersField}`).shape('circle');

  /**
   * style 的几种情况
   * g.style({ fill: 'red' });
   * g.style('x*y*color', (x, y, color) => ({ fill: 'red' }));
   */
  if (isFunction(outliersStyle)) {
    geometry.style(`${xField}*${outliersField}`, (_x: string, _outliers: number) => {
      return outliersStyle({
        [xField]: _x,
        [outliersField]: _outliers,
      });
    });
  } else if (isObject(outliersStyle)) {
    geometry.style(outliersStyle);
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
      [outliersField]: { sync: syncName, nice: true },
      [yFieldName]: { sync: syncName, nice: true },
    };
  }

  const scales = deepAssign(baseMeta, meta, {
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

  /**
   * style 的几种情况
   * g.style({ fill: 'red' });
   * g.style('x*y*color', (x, y, color) => ({ fill: 'red' }));
   */
  if (isFunction(boxStyle)) {
    geometry.style(`${xField}*${yFieldName}`, (_x: string, _y: number) => {
      return boxStyle({
        [xField]: _x,
        [yFieldName]: _y,
      });
    });
  } else if (isObject(boxStyle)) {
    geometry.style(boxStyle);
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
