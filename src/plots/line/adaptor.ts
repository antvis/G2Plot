import { Geometry } from '@antv/g2';
import { each, isArray, isNil, uniq } from '@antv/util';
import { Params } from '../../core/adaptor';
import { tooltip, slider, interaction, animation, theme, scale, annotation, limitInPlot } from '../../adaptor/common';
import { findGeometry, transformLabel, deepAssign, getAllGeometriesRecursively } from '../../utils';
import { point, line, area } from '../../adaptor/geometries';
import { flow } from '../../utils';
import { adjustYMetaByZero } from '../../utils/data';
import { POINT_VIEW_ID } from './constants';
import { LineOptions } from './types';

/**
 * geometry 配置处理
 * @param params
 */
function geometry(params: Params<LineOptions>): Params<LineOptions> {
  const { chart, options } = params;
  const { data, color, lineStyle, lineShape, point: pointMapping, area: areaMapping, yField, seriesField } = options;
  const pointState = pointMapping?.state;

  chart.data(data);

  // line geometry 处理
  const primary = deepAssign({}, params, {
    options: {
      shapeField: seriesField,
      line: {
        color,
        style: lineStyle,
        shape: lineShape,
      },
      // 颜色保持一致，因为如果颜色不一致，会导致 tooltip 中元素重复。
      // 如果存在，才设置，否则为空
      point: pointMapping && {
        color,
        shape: 'circle',
        ...pointMapping,
      },
      // 面积配置
      area: areaMapping && {
        color,
        ...areaMapping,
      },
      // label 不传递给各个 geometry adaptor，由 label adaptor 处理
      label: undefined,
    },
  });

  const areaParams = deepAssign({}, primary, { options: { tooltip: false, state: pointState } });

  line(primary);
  area(areaParams);

  const pointParams = deepAssign({}, primary, { options: { tooltip: false, state: pointState } });
  if (pointMapping) {
    const pointView = chart.createView({ id: POINT_VIEW_ID });
    pointView.axis(false);
    pointView.tooltip(false);
    pointView.legend(false);
    // [PERFORMANCE] 🚀 数据为空的 point 标注点都不渲染（不包括：数据为 0)
    pointView.data(data.filter((d) => !isNil(d[yField])));
    point({ ...pointParams, chart: pointView });
  }

  return params;
}

/**
 * meta 配置
 * @param params
 */
export function meta(params: Params<LineOptions>): Params<LineOptions> {
  const { options } = params;
  const { xAxis, yAxis, xField, yField, data, seriesField } = options;
  const defaultMeta = {
    [xField]: {
      type: 'cat',
      sync: true,
      values: uniq(data.map((d) => d[xField])),
    },
    [yField]: {
      ...adjustYMetaByZero(data, yField),
      sync: true,
    },
  };
  if (seriesField) {
    defaultMeta[seriesField] = { sync: true };
  }

  return flow(
    scale(
      {
        [xField]: xAxis,
        [yField]: yAxis,
      },
      defaultMeta
    )
  )(params);
}

/**
 * 坐标系配置. 支持 reflect 镜像处理
 * @param params
 */
function coordinate(params: Params<LineOptions>): Params<LineOptions> {
  const { chart, options } = params;
  const { reflect } = options;
  if (reflect) {
    let p = reflect as any;
    if (!isArray(p)) {
      p = [p];
    }
    const actions = p.map((d) => ['reflect', d]);

    chart.coordinate({ type: 'rect', actions });
  }

  return params;
}

/**
 * axis 配置
 * @param params
 */
export function axis(params: Params<LineOptions>): Params<LineOptions> {
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
export function legend(params: Params<LineOptions>): Params<LineOptions> {
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
function label(params: Params<LineOptions>): Params<LineOptions> {
  const { chart, options } = params;
  const { label, yField } = options;

  const lineGeometry = findGeometry(chart, 'line');

  // label 为 false, 空 则不显示 label
  if (!label) {
    lineGeometry.label(false);
  } else {
    const { callback, ...cfg } = label;
    lineGeometry.label({
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
 * 统一处理 adjust
 * @param params
 */
export function adjust(params: Params<Pick<LineOptions, 'isStack'>>): Params<any> {
  const { chart, options } = params;
  const { isStack } = options;

  const geometries = getAllGeometriesRecursively(chart);

  if (isStack) {
    each(geometries, (g: Geometry) => {
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
export function adaptor(params: Params<LineOptions>) {
  // flow 的方式处理所有的配置到 G2 API
  return flow(
    geometry,
    meta,
    adjust,
    theme,
    coordinate,
    axis,
    legend,
    tooltip,
    label,
    slider,
    interaction,
    animation,
    annotation(),
    limitInPlot
  )(params);
}
