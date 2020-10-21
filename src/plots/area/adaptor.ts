import { deepMix } from '@antv/util';
import { tooltip, slider, interaction, animation, theme, annotation } from '../../adaptor/common';
import { findGeometry } from '../../utils';
import { Params } from '../../core/adaptor';
import { area, point, line } from '../../adaptor/geometries';
import { flow, transformLabel } from '../../utils';
import { meta, legend, axis, adjust } from '../line/adaptor';
import { AreaOptions } from './types';

/**
 * geometry 处理
 * @param params
 */
function geometry(params: Params<AreaOptions>): Params<AreaOptions> {
  const { chart, options } = params;
  const { data, areaStyle, color, point: pointMapping, line: lineMapping } = options;

  chart.data(data);

  const p = deepMix({}, params, {
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
    },
  });
  // area geometry 处理
  area(p);
  line(p);
  point(p);

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
      cfg: transformLabel(cfg),
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
    animation
  )(params);
}
