import { Geometry } from '@antv/g2';
import { each, omit } from '@antv/util';
import {
  animation,
  annotation,
  interaction,
  limitInPlot,
  pattern,
  slider,
  theme,
  tooltip,
  transformations,
} from '../../adaptor/common';
import { area, line, point } from '../../adaptor/geometries';
import { Params } from '../../core/adaptor';
import { Datum } from '../../types';
import { deepAssign, findGeometry, flow, transformLabel } from '../../utils';
import { getDataWhetherPercentage } from '../../utils/transform/percent';
import { axis, legend, meta } from '../line/adaptor';
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
    areaShape,
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

  const chartData = getDataWhetherPercentage(data, yField, xField, yField, isPercent);
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
      area: {
        color,
        style: areaStyle,
        shape: areaShape,
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
  // 线默认 2px (折线不能复用面积图的 state，因为 fill 和 stroke 不匹配)
  const lineParams = {
    chart,
    options: deepAssign({ line: { size: 2 } }, omit(options as any, ['state']), {
      // 颜色保持一致，因为如果颜色不一致，会导致 tooltip 中元素重复。
      // 如果存在，才设置，否则为空
      line: lineMapping && {
        color,
        ...lineMapping,
      },
      sizeField: seriesField,
      state: lineMapping?.state,
      tooltip: false,
      // label 不传递给各个 geometry adaptor，由 label adaptor 处理
      label: undefined,
      args: {
        startOnZero,
      },
    }),
  };
  const pointParams = deepAssign({}, primary, { options: { tooltip: false, state: pointState } });

  // area geometry 处理
  area(primary);
  line(lineParams);
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
    theme,
    pattern('areaStyle'),
    transformations('rect'),
    geometry,
    meta,
    adjust,
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
