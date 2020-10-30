import { deepMix } from '@antv/util';
import { Params } from '../../core/adaptor';
import { findGeometry } from '../../utils';
import { tooltip, slider, interaction, animation, theme, scale, annotation, scrollbar } from '../../adaptor/common';
import { conversionTag } from '../../adaptor/conversion-tag';
import { interval } from '../../adaptor/geometries';
import { flow, transformLabel } from '../../utils';
import { percent } from '../../utils/transform/percent';
import { Datum } from '../../types';
import { ColumnOptions } from './types';

/**
 * 字段
 * @param params
 */
function geometry(params: Params<ColumnOptions>): Params<ColumnOptions> {
  const { chart, options } = params;
  const { data, columnStyle, color, columnWidthRatio, isPercent, xField, yField, seriesField, tooltip } = options;
  const chartData = isPercent ? percent(data, yField, xField, yField) : data;

  chart.data(chartData);

  // 百分比堆积图，默认会给一个 % 格式化逻辑, 用户可自定义
  const tooltipOptions = deepMix(
    {},
    {
      formatter: isPercent
        ? (datum: Datum) => ({
            name: datum[seriesField] || datum[xField],
            value: (Number(datum[yField]) * 100).toFixed(2) + '%',
          })
        : undefined,
    },
    tooltip
  );

  const p = deepMix({}, params, {
    options: {
      widthRatio: columnWidthRatio,
      tooltip: tooltipOptions,
      interval: {
        style: columnStyle,
        color,
      },
    },
  });
  interval(p);

  return params;
}

/**
 * meta 配置
 * @param params
 */
function meta(params: Params<ColumnOptions>): Params<ColumnOptions> {
  const { options } = params;
  const { xAxis, yAxis, xField, yField } = options;

  return flow(
    scale({
      [xField]: xAxis,
      [yField]: yAxis,
    })
  )(params);
}

/**
 * axis 配置
 * @param params
 */
function axis(params: Params<ColumnOptions>): Params<ColumnOptions> {
  const { chart, options } = params;
  const { xAxis, yAxis, xField, yField } = options;

  // 为 false 则是不显示轴
  if (xAxis === false) {
    chart.axis(xField, false);
  } else {
    chart.axis(xField, xAxis);
  }

  if (yAxis === false) {
    chart.axis(yField, false);
  } else {
    chart.axis(yField, yAxis);
  }

  return params;
}

/**
 * legend 配置
 * @param params
 */
export function legend(params: Params<ColumnOptions>): Params<ColumnOptions> {
  const { chart, options } = params;
  const { legend, seriesField } = options;

  if (legend && seriesField) {
    chart.legend(seriesField, legend);
  } else if (legend === false) {
    chart.legend(false);
  }

  return params;
}

/**
 * 数据标签
 * @param params
 */
function label(params: Params<ColumnOptions>): Params<ColumnOptions> {
  const { chart, options } = params;
  const { label, yField } = options;

  const geometry = findGeometry(chart, 'interval');

  if (!label) {
    geometry.label(false);
  } else {
    const { callback, ...cfg } = label;
    geometry.label({
      fields: [yField],
      callback,
      cfg: transformLabel(cfg),
    });
  }

  return params;
}

/**
 * 柱形图适配器
 * @param params
 */
export function adaptor(params: Params<ColumnOptions>, isBar = false) {
  const { options } = params;
  return flow(
    geometry,
    meta,
    axis,
    legend,
    tooltip,
    slider,
    scrollbar,
    theme,
    label,
    interaction,
    animation,
    annotation(),
    conversionTag<ColumnOptions>(options.yField, !isBar)
  )(params);
}
