import { deepMix } from '@antv/util';
import { theme, tooltip, interaction, animation } from '../../adaptor/common';
import { Params } from '../../core/adaptor';
import { flow, pick } from '../../utils';
import { getOption } from './util/option';
import { singleGeometry } from './util/geometry';
import { BiaxOption } from './types';
import { AXIS_META_CONFIG_KEYS } from '../../constant';

/**
 * 获取默认参数设置
 * 双轴图无法使用公共的 getDefaultOption, 因为双轴图存在[lineConfig, lineConfig] 这样的数据，需要根据传入的 option，生成不同的 defaultOption
 * 主要针对 yAxis 和 geometryConfigs
 * @param params
 */
export function transformOptions(params: Params<BiaxOption>): Params<BiaxOption> {
  return deepMix({}, params, {
    options: getOption(params.options),
  });
}

/**
 * 字段
 * @param params
 */
function field(params: Params<BiaxOption>): Params<BiaxOption> {
  const { chart, options } = params;
  const { data } = options;

  // TOFIX: 动态适配坐标轴宽度
  const PADDING = [20, 40];

  // 绘制左轴对应数据
  chart
    .createView({
      padding: PADDING,
    })
    .data(data[0]);

  // 绘制右轴对应数据
  chart
    .createView({
      padding: PADDING,
    })
    .data(data[1]);
  return params;
}

/**
 * 绘制图形
 * @param params
 */
function geometry(params: Params<BiaxOption>): Params<BiaxOption> {
  const { chart, options } = params;
  const { xField, yField, geometryConfigs } = options;

  // 左轴图形
  singleGeometry({
    chart: chart.views[0],
    options: {
      xField,
      yField: yField[0],
      geometryConfig: geometryConfigs[0],
    },
  });

  // 右轴图形
  singleGeometry({
    chart: chart.views[1],
    options: {
      xField,
      yField: yField[1],
      geometryConfig: geometryConfigs[1],
    },
  });
  return params;
}

/**
 * meta 配置
 * @param params
 */
export function meta(params: Params<BiaxOption>): Params<BiaxOption> {
  const { chart, options } = params;
  const { meta = {}, xAxis, yAxis, xField, yField } = options;

  const xFieldScales = deepMix({}, meta[xField] || {}, pick(xAxis, AXIS_META_CONFIG_KEYS));
  const leftYFieldScales = deepMix({}, meta[yField[0]] || {}, pick(yAxis[0], AXIS_META_CONFIG_KEYS));
  const rightYFieldScales = deepMix({}, meta[yField[1]] || {}, pick(yAxis[1], AXIS_META_CONFIG_KEYS));

  chart.views[0].scale({
    [xField]: xFieldScales,
    [yField[0]]: leftYFieldScales,
  });

  chart.views[1].scale({
    [xField]: xFieldScales,
    [yField[1]]: rightYFieldScales,
  });
  return params;
}

/**
 * axis 配置
 * @param params
 */
export function axis(params: Params<BiaxOption>): Params<BiaxOption> {
  const { chart, options } = params;
  const [leftView, rightView] = chart.views;
  const { xField, yField, yAxis } = options;

  let { xAxis } = options;

  // 固定位置
  if (xAxis) {
    xAxis = deepMix({}, xAxis, { position: 'bottom' });
  }
  if (yAxis[0]) {
    yAxis[0] = deepMix({}, yAxis[0], { position: 'left' });
  }

  // 隐藏右轴 grid，留到 g2 解决
  if (yAxis[1]) {
    yAxis[1] = deepMix({}, yAxis[1], { position: 'right', grid: null });
  }

  chart.axis(xField, false);
  chart.axis(yField[0], false);
  chart.axis(yField[1], false);

  // 左 View
  leftView.axis(xField, xAxis);
  leftView.axis(yField[0], yAxis[0]);
  leftView.axis(yField[1], false);

  // 右 Y 轴
  rightView.axis(xField, false);
  rightView.axis(yField[0], false);
  rightView.axis(yField[1], yAxis[1]);

  return params;
}

/**
 * legend 配置
 * @param params
 */
export function legend(params: Params<BiaxOption>): Params<BiaxOption> {
  const { chart, options } = params;
  const { legend, yField } = options;
  if (legend) {
    chart.legend(yField[0], legend);
    chart.legend(yField[1], legend);
  }
  return params;
}

/**
 * 双折线图适配器
 * @param chart
 * @param options
 */
export function adaptor(params: Params<BiaxOption>) {
  // flow 的方式处理所有的配置到 G2 API
  flow(transformOptions, field, geometry, meta, axis, legend, tooltip, theme, interaction, animation)(params);
}
