import { Geometry } from '@antv/g2';
import { each, isNil, isObject } from '@antv/util';
import { Params } from '../core/adaptor';
import { Options } from '../types';
import { Interaction } from '../types/interaction';
import { Axis } from '../types/axis';
import { AXIS_META_CONFIG_KEYS } from '../constant';
import { pick, deepAssign } from '../utils';

/**
 * 通用 legend 配置, 适用于带 colorField 或 seriesField 的图表
 * @param params
 */
export function legend<O extends Pick<Options, 'legend'> & { colorField?: string; seriesField?: string }>(
  params: Params<O>
): Params<O> {
  const { chart, options } = params;
  const { legend, colorField, seriesField } = options;

  if (legend === false) {
    chart.legend(false);
  } else if (colorField || seriesField) {
    chart.legend(colorField || seriesField, legend);
  }

  return params;
}

/**
 * 通用 tooltip 配置
 * @param params
 */
export function tooltip<O extends Pick<Options, 'tooltip'>>(params: Params<O>): Params<O> {
  const { chart, options } = params;
  const { tooltip } = options;

  if (tooltip !== undefined) {
    chart.tooltip(tooltip);
  }

  return params;
}

/**
 * Interaction 配置
 * @param params
 */
export function interaction<O extends Pick<Options, 'interactions'>>(params: Params<O>): Params<O> {
  const { chart, options } = params;
  const { interactions } = options;

  each(interactions, (i: Interaction) => {
    if (i.enable === false) {
      chart.removeInteraction(i.type);
    } else {
      chart.interaction(i.type, i.cfg || {});
    }
  });

  return params;
}

/**
 * 动画
 * @param params
 */
export function animation<O extends Pick<Options, 'animation'>>(params: Params<O>): Params<O> {
  const { chart, options } = params;
  const { animation } = options;

  // 同时设置整个 view 动画选项
  if (typeof animation === 'boolean') {
    chart.animate(animation);
  } else {
    chart.animate(true);
  }

  // 所有的 Geometry 都使用同一动画（各个图形如有区别，自行覆盖）
  each(chart.geometries, (g: Geometry) => {
    g.animate(animation);
  });

  return params;
}

/**
 * 设置全局主题配置
 * @param params
 */
export function theme<O extends Pick<Options, 'theme'>>(params: Params<O>): Params<O> {
  const { chart, options } = params;
  const { theme } = options;

  // 存在主题才设置主题
  if (theme) {
    chart.theme(theme);
  }
  return params;
}

/**
 * 状态 state 配置
 * @param params
 */
export function state<O extends Options>(params: Params<O>): Params<O> {
  const { chart, options } = params;
  const { state } = options;

  if (state) {
    each(chart.geometries, (geometry: Geometry) => {
      geometry.state(state);
    });
  }

  return params;
}

/**
 * 处理缩略轴的 adaptor
 * @param params
 */
export function slider(params: Params<Options>): Params<Options> {
  const { chart, options } = params;
  const { slider } = options;

  chart.option('slider', slider);

  return params;
}

/**
 * 处理缩略轴的 adaptor
 * @param params
 */
export function scrollbar(params: Params<Options>): Params<Options> {
  const { chart, options } = params;
  const { scrollbar } = options;

  chart.option('scrollbar', scrollbar);

  return params;
}

/**
 * scale 的 adaptor
 * @param axes
 */
export function scale(axes: Record<string, Axis>, meta?: Options['meta']) {
  return function <O extends Pick<Options, 'meta'>>(params: Params<O>): Params<O> {
    const { chart, options } = params;

    // 1. 轴配置中的 scale 信息
    let scales: Record<string, any> = {};
    each(axes, (axis: Axis, field: string) => {
      scales[field] = pick(axis, AXIS_META_CONFIG_KEYS);
    });

    // 2. meta 直接是 scale 的信息
    scales = deepAssign({}, meta, options.meta, scales);

    chart.scale(scales);

    return params;
  };
}

/**
 * annotation 配置
 * @param params
 */
export function annotation(annotationOptions?: Options['annotations']) {
  return function <O extends Pick<Options, 'annotations'>>(params: Params<O>): Params<O> {
    const { chart, options } = params;

    const annotationController = chart.getController('annotation');

    /** 自定义 annotation */
    each([...(options.annotations || []), ...(annotationOptions || [])], (annotationOption) => {
      // @ts-ignore
      annotationController.annotation(annotationOption);
    });

    return params;
  };
}

/**
 * 自动设置 limitInPlot
 * @param params
 */
export function limitInPlot(params: Params<Options>): Params<Options> {
  const { chart, options } = params;
  const { yAxis, limitInPlot } = options;

  let value = limitInPlot;

  // 用户没有设置 limitInPlot，则自动根据 yAxis 是否有 min/max 来设置 limitInPlot
  if (isObject(yAxis) && isNil(limitInPlot)) {
    if (Object.values(pick(yAxis, ['min', 'max', 'minLimit', 'maxLimit'])).some((value) => !isNil(value))) {
      value = true;
    } else {
      value = false;
    }
  }
  chart.limitInPlot = value;

  return params;
}
