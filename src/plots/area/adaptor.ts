import { Geometry } from '@antv/g2';
import { deepMix, each } from '@antv/util';
import { tooltip, slider, interaction, animation, theme, annotation } from '../../adaptor/common';
import { findGeometry } from '../../utils';
import { Params } from '../../core/adaptor';
import { area, point, line } from '../../adaptor/geometries';
import { flow } from '../../utils';
import { meta, legend, axis } from '../line/adaptor';
import { AreaOptions } from './types';

/**
 * geometry 处理
 * @param params
 */
function geometry(params: Params<AreaOptions>): Params<AreaOptions> {
  const { chart, options } = params;
  const { data, areaStyle, smooth } = options;

  chart.data(data);

  // area geometry 处理
  return flow(area)(deepMix({}, params, { options: { area: { smooth, style: areaStyle } } }));
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
      cfg,
    });
  }

  return params;
}

/**
 * 统一处理 adjust
 * @param params
 */
function adjust(params: Params<AreaOptions>): Params<AreaOptions> {
  const { chart } = params;
  each(chart.geometries, (g: Geometry) => {
    g.adjust('stack');
  });

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
    // line 面积线的配置处理
    line,
    point,
    adjust,
    theme,
    axis,
    legend,
    tooltip,
    label,
    slider,
    annotation(),
    interaction,
    animation
  )(params);
}
