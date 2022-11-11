import { clone, each, isFunction } from '@antv/util';
import { animation, annotation, scale, theme, tooltip } from '../../adaptor/common';
import { Params } from '../../core/adaptor';
import { getLocale } from '../../core/locale';
import { Datum } from '../../types';
import { deepAssign, flow } from '../../utils';
import { conversionTagFormatter } from '../../utils/conversion';
import { FUNNEL_CONVERSATION, FUNNEL_PERCENT } from './constant';
import { basicFunnel } from './geometries/basic';
import { compareFunnel } from './geometries/compare';
import { dynamicHeightFunnel } from './geometries/dynamic-height';
import { facetFunnel } from './geometries/facet';
import { FUNNEL_LEGEND_FILTER, interactionStart } from './interactions';
import { FunnelOptions } from './types';
import type { Interaction } from './types';

/**
 *
 * 各式漏斗图geometry实现细节有较大不同,
 * 1. 普通漏斗图：interval.shape('funnel')
 * 2. 对比漏斗图：分面
 * 3. 动态高度漏斗图：polypon
 * 4. 分面漏斗图：普通 + list 分面
* /

/**
 * options 处理
 * @param params
 */
function defaultOptions(params: Params<FunnelOptions>): Params<FunnelOptions> {
  const { options } = params;
  const { compareField, xField, yField, locale, funnelStyle, data } = options;
  const i18n = getLocale(locale);

  const defaultOption = {
    label: compareField
      ? {
          fields: [xField, yField, compareField, FUNNEL_PERCENT, FUNNEL_CONVERSATION],
          formatter: (datum) => `${datum[yField]}`,
        }
      : {
          fields: [xField, yField, FUNNEL_PERCENT, FUNNEL_CONVERSATION],
          offset: 0,
          position: 'middle',
          formatter: (datum) => `${datum[xField]} ${datum[yField]}`,
        },
    tooltip: {
      title: xField,
      formatter: (datum) => {
        return { name: datum[xField], value: datum[yField] };
      },
    },
    conversionTag: {
      // conversionTag 的计算和显示逻辑统一保持一致
      formatter: (datum) =>
        `${i18n.get(['conversionTag', 'label'])}: ${conversionTagFormatter(
          ...(datum[FUNNEL_CONVERSATION] as [number, number])
        )}`,
    },
  };

  // 漏斗图样式
  let style;
  if (compareField || funnelStyle) {
    style = (datum: Datum) => {
      return deepAssign(
        {},
        // 对比漏斗图默认描边
        compareField && { lineWidth: 1, stroke: '#fff' },
        isFunction(funnelStyle) ? funnelStyle(datum) : funnelStyle
      );
    };
  }

  return deepAssign({ options: defaultOption }, params, { options: { funnelStyle: style, data: clone(data) } });
}

/**
 * geometry处理
 * @param params
 */
function geometry(params: Params<FunnelOptions>): Params<FunnelOptions> {
  const { options } = params;
  const { compareField, dynamicHeight, seriesField } = options;
  if (seriesField) {
    return facetFunnel(params);
  }
  if (compareField) {
    return compareFunnel(params);
  }
  if (dynamicHeight) {
    return dynamicHeightFunnel(params);
  }

  return basicFunnel(params);
}

/**
 * meta 配置
 * @param params
 */
export function meta(params: Params<FunnelOptions>): Params<FunnelOptions> {
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
 * 坐标轴
 * @param params
 */
function axis(params: Params<FunnelOptions>): Params<FunnelOptions> {
  const { chart } = params;
  chart.axis(false);
  return params;
}

/**
 * legend 配置
 * @param params
 */
function legend(params: Params<FunnelOptions>): Params<FunnelOptions> {
  const { chart, options } = params;
  const { legend } = options;

  if (legend === false) {
    chart.legend(false);
  } else {
    chart.legend(legend);
    // TODO FIX: legend-click 时间和转化率组件之间的关联
  }

  return params;
}

/**
 * Interaction 配置
 * @param params
 */
export function interaction<O extends Pick<FunnelOptions, 'interactions'>>(params: Params<O>): Params<O> {
  const { chart, options } = params;
  // @ts-ignore
  const { interactions, dynamicHeight } = options;

  each(interactions, (i: Interaction) => {
    if (i.enable === false) {
      chart.removeInteraction(i.type);
    } else {
      chart.interaction(i.type, i.cfg || {});
    }
  });
  // 动态高度  不进行交互操作
  if (!dynamicHeight) {
    chart.interaction(FUNNEL_LEGEND_FILTER, {
      start: [{ ...interactionStart, arg: options }],
    });
  } else {
    chart.removeInteraction(FUNNEL_LEGEND_FILTER);
  }

  return params;
}

/**
 * 漏斗图适配器
 * @param chart
 * @param options
 */
export function adaptor(params: Params<FunnelOptions>) {
  return flow(
    defaultOptions,
    geometry,
    meta,
    axis,
    tooltip,
    interaction,
    legend,
    animation,
    theme,
    annotation()
  )(params);
}
