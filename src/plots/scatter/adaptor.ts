import { deepMix, isString } from '@antv/util';
import { Geometry } from '@antv/g2';
import { Params } from '../../core/adaptor';
import { flow, pick, includeKeys } from '../../utils';
import { ScatterOptions } from './types';
import { tooltip } from '../../common/adaptor';
import { KEYS } from '../../constants';
import { REFLECTS } from './reflect';

/**
 * 字段
 * @param params
 */
function field(params: Params<ScatterOptions>): Params<ScatterOptions> {
  const { chart, options } = params;
  const { data, xField, yField, pointSize, seriesField, color, shape } = options;

  // 散点图操作逻辑
  chart.data(data);
  const geometry = chart.point().position(`${xField}*${yField}`);

  // 颜色映射
  if (seriesField) {
    geometry.color(seriesField, color);
    geometry.shape(seriesField, shape);
  }

  // 单一样式映射
  const reflectKeys = Object.keys(REFLECTS);
  reflectKeys.forEach((key: string) => {
    if (options[key]) {
      if (includeKeys(options[key], REFLECTS[key].required)) {
        geometry[REFLECTS[key].action](options[key].field, options[key].formatter);
      } else {
        geometry[REFLECTS[key].action](options[key]);
      }
    }
  });

  // 大小映射
  if (pointSize) {
    const size = typeof pointSize === 'number' ? ([pointSize, pointSize] as [number, number]) : pointSize;
    geometry.size(yField, size);
  }
  return params;
}

/**
 * meta 配置
 * @param params
 */
function meta(params: Params<ScatterOptions>): Params<ScatterOptions> {
  const { chart, options } = params;
  const { meta, xAxis, yAxis, xField, yField } = options;

  // meta 直接是 scale 的信息
  const scales = deepMix({}, meta, {
    [xField]: pick(xAxis, KEYS),
    [yField]: pick(yAxis, KEYS),
  });

  chart.scale(scales);

  return params;
}

/**
 * axis 配置
 * @param params
 */
function axis(params: Params<ScatterOptions>): Params<ScatterOptions> {
  const { chart, options } = params;
  const { xAxis, yAxis, xField, yField } = options;

  chart.axis(xField, xAxis);
  chart.axis(yField, yAxis);

  return params;
}

/**
 * legend 配置
 * @param params
 */
function legend(params: Params<ScatterOptions>): Params<ScatterOptions> {
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
function style(params: Params<ScatterOptions>): Params<ScatterOptions> {
  const { chart, options } = params;
  const { xField, yField, seriesField } = options;

  return params;
}

/**
 * shape 的配置处理
 * @param params
 */
function shape(params: Params<ScatterOptions>): Params<ScatterOptions> {
  const { chart, options } = params;
  const { shape } = options;

  const scatterGeometry = chart.geometries.find((g: Geometry) => g.type === 'point');

  // chart.geometries.shape(shape);
  return params;
}

/**
 * 数据标签
 * @param params
 */
function label(params: Params<ScatterOptions>): Params<ScatterOptions> {
  const { chart, options } = params;
  const { label, yField } = options;

  const scatterGeometry = chart.geometries.find((g: Geometry) => g.type === 'point');

  // label 为 false, 空 则不显示 label
  if (!label) {
    scatterGeometry.label(false);
  } else {
    const { callback, ...cfg } = label;
    scatterGeometry.label({
      fields: [yField],
      callback,
      cfg,
    });
  }

  return params;
}

/**
 * 散点图适配器
 * @param chart
 * @param options
 */
export function adaptor(params: Params<ScatterOptions>) {
  // flow 的方式处理所有的配置到 G2 API
  flow(field, meta, axis, legend, tooltip, style, shape, label)(params);
}
