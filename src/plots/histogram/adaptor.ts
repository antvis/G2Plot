import { clone, sortBy, valuesOfKey, getRange, each, hasKey } from '@antv/util';
import { Params } from '../../core/adaptor';
import { flow } from '../../utils';
import { StatisticBin, StatisticData, HistogramOptions } from './types';
import { getBinKey, sturges } from './util';

/**
 * field字段
 * @param params
 */
function field(params: Params<HistogramOptions>): Params<HistogramOptions> {
  const { chart, options } = params;
  const { data, binField, binNumber, binWidth, color } = options;

  // 直方图操作逻辑
  const originData_copy = clone(data);
  // 根据binField value对源数据进行排序
  sortBy(originData_copy, binField);

  // 获取源数据binField values的range
  const values = valuesOfKey(originData_copy, binField);
  const range = getRange(values);
  const rangeWidth = range.max - range.min;

  // 计算分箱，直方图分箱的计算基于binWidth，如配置了binNumber则将其转为binWidth进行计算
  let _binWidth = binWidth;
  if (!binWidth && binNumber) {
    _binWidth = rangeWidth / binNumber;
  }
  // 当binWidth和binNumber都没有指定的情况，采用Sturges formula自动生成binWidth
  if (!binWidth && !binNumber) {
    const _defaultBinNumber = sturges(values);
    _binWidth = rangeWidth / _defaultBinNumber;
  }
  // 构建key - StatisticData 结构
  const bins: StatisticBin = {};

  each(originData_copy, (data: any) => {
    const value = data[binField];
    const bin = getBinKey(value, _binWidth);
    const binKey = `${bin[0]}-${bin[1]}`;
    if (!hasKey(bins, binKey)) {
      bins[binKey] = { name: binKey, range: bin, count: 0, data: [] };
    }
    bins[binKey].data.push(data);
    bins[binKey].count += 1;
  });

  // 将分箱数据转换为plotData才是图表所需要的
  const plotData: Array<StatisticData> = [];
  each(bins, (bin: StatisticData) => {
    plotData.push(bin);
  });

  chart.data(plotData);

  const geometry = chart.interval().position('range*count');

  if (color) {
    geometry.color(color);
  }
  chart.scale({
    count: {
      nice: true,
    },
  });

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
  const { chart } = params;

  chart.tooltip({
    showMarkers: false,
  });

  return params;
}

/**
 * tooltip 配置
 * @param params
 */
function interaction(params: Params<HistogramOptions>): Params<HistogramOptions> {
  const { chart, options } = params;
  const { interaction = 'active-region' } = options;

  chart.interaction(interaction);

  return params;
}

/**
 * 散点图适配器
 * @param chart
 * @param options
 */
export function adaptor(params: Params<HistogramOptions>) {
  // flow 的方式处理所有的配置到 G2 API
  flow(field, meta, legend, tooltip, interaction)(params);
}
