import { Geometry } from '@antv/g2';
import { each } from '@antv/util';
import { tooltip, slider, interaction, animation, theme, annotation, limitInPlot } from '../../adaptor/common';
import { findGeometry } from '../../utils';
import { Params } from '../../core/adaptor';
import { area, point, line } from '../../adaptor/geometries';
import { flow, transformLabel, deepAssign } from '../../utils';
import { getDataWhetherPecentage } from '../../utils/transform/percent';
import { Datum } from '../../types';
import { meta, legend, axis } from '../line/adaptor';
import { AreaOptions } from './types';

export { meta };

/**
 * geometry 处理
 * @param params
 */
function geometry(params: Params<AreaOptions>): Params<AreaOptions> {
  const { chart, options } = params;
  const {
    data,
    areaStyle,
    color,
    point: pointMapping,
    line: lineMapping,
    isPercent,
    xField,
    yField,
    tooltip,
    seriesField,
    startOnZero,
  } = options;
  const pointState = pointMapping?.state;

  const chartData = getDataWhetherPecentage(data, yField, xField, yField, isPercent);
  chart.data(chartData);
  // 百分比堆积图，默认会给一个 % 格式化逻辑, 用户可自定义
  const tooltipOptions = isPercent
    ? {
        formatter: (datum: Datum) => ({
          name: datum[seriesField] || datum[xField],
          value: (Number(datum[yField]) * 100).toFixed(2) + '%',
        }),
        ...tooltip,
      }
    : tooltip;
  const primary = deepAssign({}, params, {
    options: {
      area: { color, style: areaStyle },
      // 颜色保持一致，因为如果颜色不一致，会导致 tooltip 中元素重复。
      // 如果存在，才设置，否则为空
      line: lineMapping && {
        color,
        ...lineMapping,
      },
      point: pointMapping && {
        color,
        ...pointMapping,
      },
      tooltip: tooltipOptions,
      // label 不传递给各个 geometry adaptor，由 label adaptor 处理
      label: undefined,
      args: {
        startOnZero,
      },
    },
  });
  const second = deepAssign({}, primary, { options: { tooltip: false } });
  const pointParams = deepAssign({}, primary, { options: { tooltip: false, state: pointState } });

  // area geometry 处理
  area(primary);
  line(second);
  point(pointParams);

  return params;
}

/**
 * 数据标签
 * @param params
 */
function label(params: Params<AreaOptions>): Params<AreaOptions> {
  const { chart, options } = params;
  const { label, yField } = options;

  const areaGeometry = findGeometry(chart, 'area');

  // label 为 false, 空 则不显示 label
  if (!label) {
    areaGeometry.label(false);
  } else {
    const { callback, ...cfg } = label;
    areaGeometry.label({
      fields: [yField],
      callback,
      cfg: {
        layout: [
          { type: 'limit-in-plot' },
          { type: 'path-adjust-position' },
          { type: 'point-adjust-position' },
          { type: 'limit-in-plot', cfg: { action: 'hide' } },
        ],
        ...transformLabel(cfg),
      },
    });
  }

  return params;
}

/**
 * 处理 adjust
 * @param params
 */
function adjust(params: Params<AreaOptions>): Params<AreaOptions> {
  const { chart, options } = params;
  const { isStack, isPercent, seriesField } = options;
  if ((isPercent || isStack) && seriesField) {
    each(chart.geometries, (g: Geometry) => {
      g.adjust('stack');
    });
  }

  return params;
}

/**
 * 折线图适配器
 * @param chart
 * @param options
 */
export function adaptor(params: Params<AreaOptions>) {
  // flow 的方式处理所有的配置到 G2 API
  return flow(
    geometry,
    meta,
    adjust,
    theme,
    axis,
    legend,
    tooltip,
    label,
    slider,
    annotation(),
    interaction,
    animation,
    limitInPlot
  )(params);
}
