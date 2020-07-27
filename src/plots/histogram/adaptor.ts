import DataSet from '@antv/data-set';
import { Params } from '../../core/adaptor';
import { flow } from '../../utils';
import { HistogramOptions } from './types';

/**
 * field字段
 * @param params
 */
function field(params: Params<HistogramOptions>): Params<HistogramOptions> {
  const { chart, options } = params;
  const { data, binField, binNumber, binWidth, color } = options;

  const ds = new DataSet();
  const dv = ds.createView().source(data);

  // dataset处理数据
  dv.transform({
    type: 'bin.histogram',
    field: binField,
    bins: binNumber,
    binWidth: binWidth,
    as: ['range', 'count'],
  });

  chart.data(dv.rows);

  const geometry = chart.interval().position('range*count');

  if (color) {
    geometry.color(color);
  }
  // 默认nice y轴
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
  // TODO
  return params;
}

/**
 * interaction 配置用
 * interaction 配合tooltip更友好
 * @param params
 */
function interaction(params: Params<HistogramOptions>): Params<HistogramOptions> {
  const { chart, options } = params;
  const { interaction = 'active-region' } = options;

  chart.tooltip({
    showMarkers: false,
  });
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
