import DataSet from '@antv/data-set';
import { deepMix } from '@antv/util';
import { Params } from '../../core/adaptor';
import { flow } from '../../utils';
import { HistogramOptions } from './types';

/**
 * field 字段
 * @param params
 */
function field(params: Params<HistogramOptions>): Params<HistogramOptions> {
  const { chart, options } = params;
  const { data, binField, binNumber, binWidth, color, stackField } = options;

  const ds = new DataSet();
  const dv = ds.createView().source(data);

  // dataset 处理数据
  dv.transform({
    type: 'bin.histogram',
    field: binField,
    bins: binNumber,
    binWidth: binWidth,
    groupBy: stackField ? [stackField] : undefined,
    as: ['range', 'count'],
  });
  chart.data(dv.rows);

  const geometry = chart.interval().position('range*count');

  // 基本直方图 color: string
  if (color && !Array.isArray(color) && !stackField) {
    geometry.color(color);
  }
  // 层叠直方图需要 color: string[]
  if (stackField) {
    if (color) {
      // 容错处理 color 为 string 的时候
      const _color = Array.isArray(color) ? color : [color];
      geometry.color(stackField, _color);
    } else {
      // 用 g2 自带颜色
      geometry.color(stackField);
    }
    geometry.adjust('stack');
  }
  // 默认 nice y 轴
  const scale = {
    count: {
      nice: true,
    },
  };
  chart.scale(scale);

  return params;
}

/**
 * meta 配置
 * @param params
 */
function meta(params: Params<HistogramOptions>): Params<HistogramOptions> {
  // TODO
  return params;
}

/**
 * legend 配置
 * @param params
 */
function legend(params: Params<HistogramOptions>): Params<HistogramOptions> {
  // TODO
  return params;
}

/**
 * tooltip 配置
 * @param params
 */
function tooltip(params: Params<HistogramOptions>): Params<HistogramOptions> {
  const { chart, options } = params;
  const { tooltip } = options;

  const cfg = deepMix({}, tooltip, {
    showMarkers: false,
    shared: true,
  });

  chart.tooltip(cfg);

  return params;
}

/**
 * interaction 配置用
 * interaction 配合 tooltip 更友好
 * @param params
 */
function interaction(params: Params<HistogramOptions>): Params<HistogramOptions> {
  const { chart, options } = params;
  const { interaction = 'active-region' } = options;

  chart.interaction(interaction);

  return params;
}

/**
 * 直方图适配器
 * @param chart
 * @param options
 */
export function adaptor(params: Params<HistogramOptions>) {
  // flow 的方式处理所有的配置到 G2 API
  flow(field, meta, legend, tooltip, interaction)(params);
}
