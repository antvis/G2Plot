import DataSet from '@antv/data-set';
import { deepMix } from '@antv/util';
import { Params } from '../../core/adaptor';
import { tooltip, interaction, animation, theme, scale } from '../../adaptor/common';
import { findGeometry } from '../../utils';
import { flow } from '../../utils';
import { interval } from '../../adaptor/geometries';
import { HistogramOptions } from './types';

/**
 * field 字段
 * @param params
 */
function field(params: Params<HistogramOptions>): Params<HistogramOptions> {
  const { chart, options } = params;
  const { data, binField, binNumber, binWidth, color, stackField, legend, columnStyle } = options;

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

  const p = deepMix({}, params, {
    options: {
      xField: 'range',
      yField: 'count',
      seriesField: stackField,
      isStack: true,
      interval: {
        color,
        style: columnStyle,
      },
    },
  });

  interval(p);

  // 图例
  if (legend && stackField) {
    chart.legend(stackField, legend);
  }

  return params;
}

/**
 * meta 配置
 * @param params
 */
function meta(params: Params<HistogramOptions>): Params<HistogramOptions> {
  const { options } = params;
  const { xAxis, yAxis } = options;

  return flow(
    scale({
      range: xAxis,
      count: yAxis,
    })
  )(params);
}

/**
 * axis 配置
 * @param params
 */
function axis(params: Params<HistogramOptions>): Params<HistogramOptions> {
  const { chart, options } = params;
  const { xAxis, yAxis } = options;

  // 为 false 则是不显示轴
  if (xAxis === false) {
    chart.axis('range', false);
  } else {
    chart.axis('range', xAxis);
  }

  if (yAxis === false) {
    chart.axis('count', false);
  } else {
    chart.axis('count', yAxis);
  }

  return params;
}

/**
 * label 配置
 * @param params
 */
function label(params: Params<HistogramOptions>): Params<HistogramOptions> {
  const { chart, options } = params;
  const { label } = options;

  const geometry = findGeometry(chart, 'interval');

  if (!label) {
    geometry.label(false);
  } else {
    const { callback, ...cfg } = label;
    geometry.label({
      fields: ['count'],
      callback,
      cfg,
    });
  }

  return params;
}

/**
 * 直方图适配器
 * @param chart
 * @param options
 */
export function adaptor(params: Params<HistogramOptions>) {
  // flow 的方式处理所有的配置到 G2 API
  return flow(field, meta, axis, theme, label, tooltip, interaction, animation)(params);
}
