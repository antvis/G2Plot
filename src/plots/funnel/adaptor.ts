import { Params } from '../../core/adaptor';
import { interaction, animation, theme, scale, annotation, tooltip as common } from '../../adaptor/common';
import { flow, deepAssign } from '../../utils';
import { FunnelOptions } from './types';
import { basicFunnel } from './geometries/basic';
import { compareFunnel } from './geometries/compare';
import { dynamicHeightFunnel } from './geometries/dynamic-height';

/**
 *
 * 各式漏斗图geometry实现细节有较大不同,
 * 1. 普通漏斗图：interval.shape('funnel')
 * 2. 对比漏斗图：分面
 * 3. 动态高度漏斗图：polypon
* /

/**
 * options 处理
 * @param params
 */
function defaultOptions(params: Params<FunnelOptions>): Params<FunnelOptions> {
  const { options } = params;
  const { compareField, dynamicHeight, xField, yField } = options;
  let additionalOption = {};
  if (dynamicHeight) {
    additionalOption = {
      tooltip: {
        itemTpl:
          '<li class="g2-tooltip-list-item" data-index={index}>' +
          '<span style="background-color:{color};" class="g2-tooltip-marker"></span>' +
          `<span class="g2-tooltip-name">{${xField}}</span>` +
          `<span class="g2-tooltip-value" style="display: inline-block; float: right; margin-left: 30px;">{${yField}}</span></li>`,
      },
    };
  } else if (compareField) {
    additionalOption = {
      appendPadding: [50, 50, 0, 50],
      label: {
        callback: (xField, yField) => ({
          content: `${yField}`,
        }),
      },
    };
  }

  return deepAssign({}, params, {
    options: {
      ...additionalOption,
      ...options,
    },
  });
}

/**
 * geometry处理
 * @param params
 */
function geometry(params: Params<FunnelOptions>): Params<FunnelOptions> {
  const { options } = params;
  const { compareField, dynamicHeight } = options;
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
 * tooltip
 * @param params
 */
function tooltip(params: Params<FunnelOptions>): Params<FunnelOptions> {
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
