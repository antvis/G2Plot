import { Params } from '../../core/adaptor';
import { interaction, animation, theme, scale, annotation, tooltip } from '../../adaptor/common';
import { flow, deepAssign } from '../../utils';
import { conversionTagFormatter } from '../../utils/conversion';
import { FunnelOptions } from './types';
import { basicFunnel } from './geometries/basic';
import { compareFunnel } from './geometries/compare';
import { facetFunnel } from './geometries/facet';
import { dynamicHeightFunnel } from './geometries/dynamic-height';
import { FUNNEL_CONVERSATION, FUNNEL_MAPPING_VALUE, FUNNEL_PERCENT } from './constant';

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
  const { compareField, xField, yField } = options;
  const defaultOption = {
    minSize: 0,
    maxSize: 1,
    meta: {
      [FUNNEL_MAPPING_VALUE]: {
        min: 0,
        max: 1,
        nice: false,
      },
    },
    label: compareField
      ? {
          fields: [xField, yField, compareField, FUNNEL_PERCENT, FUNNEL_CONVERSATION],
          style: {
            fill: '#fff',
            fontSize: 12,
          },
          formatter: (datum) => `${datum[yField]}`,
        }
      : {
          fields: [xField, yField, FUNNEL_PERCENT, FUNNEL_CONVERSATION],
          offset: 0,
          position: 'middle',
          style: {
            fill: '#fff',
            fontSize: 12,
          },
          formatter: (datum) => `${datum[xField]} ${datum[yField]}`,
        },
    tooltip: {
      showTitle: false,
      showMarkers: false,
      shared: false,
      title: xField,
      formatter: (datum) => {
        return { name: datum[xField], value: datum[yField] };
      },
    },
    conversionTag: {
      offsetX: 10,
      offsetY: 0,
      style: {},
      // conversionTag 的计算和显示逻辑统一保持一致
      formatter: (datum) => `转化率: ${conversionTagFormatter(...(datum[FUNNEL_CONVERSATION] as [number, number]))}`,
    },
  };

  return deepAssign(
    {
      options: defaultOption,
    },
    params
  );
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
