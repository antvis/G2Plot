import { Geometry } from '@antv/g2';
import { each, deepMix } from '@antv/util';
import { Params } from '../core/adaptor';
import { Options } from '../types';
import { Interaction } from '../types/interaction';
import { Axis } from '../types/axis';
import { AXIS_META_CONFIG_KEYS } from '../constant';
import { pick, transformTooltip } from '../utils';

/**
 * 通用 legend 配置, 适用于带 colorField 的图表
 * @param params
 */
export function legend<O extends Pick<Options, 'legend'> & { colorField?: string }>(params: Params<O>): Params<O> {
  const { chart, options } = params;
  const { legend, colorField } = options;

  if (legend === false) {
    chart.legend(false);
  } else if (colorField) {
    chart.legend(colorField, legend);
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
    chart.tooltip(transformTooltip(tooltip));
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
export function state(params: Params<Options>): Params<Options> {
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
    scales = deepMix({}, meta, options.meta, scales);

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
