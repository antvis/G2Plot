import { Params } from '../../core/adaptor';
import { tooltip, interaction, animation, theme, scale, state } from '../../adaptor/common';
import { findGeometry, deepAssign } from '../../utils';
import { flow, transformLabel } from '../../utils';
import { interval } from '../../adaptor/geometries';
import { binHistogram } from '../../utils/transform/histogram';
import { HistogramOptions } from './types';

/**
 * geometry 处理
 * @param params
 */
function geometry(params: Params<HistogramOptions>): Params<HistogramOptions> {
  const { chart, options } = params;
  const { data, binField, binNumber, binWidth, color, stackField, legend, columnStyle } = options;

  // 处理数据
  const plotData = binHistogram(data, binField, binWidth, binNumber, stackField);

  chart.data(plotData);

  const p = deepAssign({}, params, {
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
      cfg: transformLabel(cfg),
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
  return flow(geometry, meta, axis, theme, state, label, tooltip, interaction, animation)(params);
}
