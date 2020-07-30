import { Geometry } from '@antv/g2';
import { deepMix, each } from '@antv/util';
import { tooltip, interaction, animation, theme } from '../../common/adaptor';
import { findGeometry } from '../../common/helper';
import { Params } from '../../core/adaptor';
import { area as areaGeometryParse, point, line } from '../../geometries';
import { flow, omit } from '../../utils';
import { meta, legend, axis } from '../line/adaptor';
import { AreaOptions } from './types';

/**
 * geometry 处理
 * @param params
 */
function geometry(params: Params<AreaOptions>): Params<AreaOptions> {
  const { chart, options } = params;
  const { data, areaStyle, color, smooth } = options;

  chart.data(data);
  // area geometry 处理
  areaGeometryParse(deepMix(params, { options: { area: { color, smooth, style: areaStyle } } }));

  return { ...params, options: omit(options, ['area']) };
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
  flow(
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
    interaction,
    animation
  )(params);
}
