import { deepMix } from '@antv/util';
import { Params } from '../../core/adaptor';
import { interaction, animation, theme, tooltip } from '../../adaptor/common';
import { flow, pick } from '../../utils';
import { AXIS_META_CONFIG_KEYS } from '../../constant';
import { BulletOptions } from './types';
import { transformData } from './utils';

/**
 * field 字段
 * @param params
 */
function field(params: Params<BulletOptions>): Params<BulletOptions> {
  const { chart, options } = params;
  const { bulletStyle, targetField, rangeField, measureField, xField } = options;
  const { range, measure, target } = bulletStyle;
  // 处理数据
  const { min, max, ds } = transformData(options);

  // 需要统一比列尺
  chart.scale({
    [measureField]: {
      min,
      max,
    },
    [rangeField]: {
      sync: `${measureField}`,
    },
    [targetField]: {
      sync: `${measureField}`,
    },
  });
  chart.data(ds);
  chart.coordinate().transpose();
  chart.axis(`${rangeField}`, false);
  chart.axis(`${targetField}`, false);

  const rangeGeometry = chart
    .interval()
    .position(`${xField}*${rangeField}`)
    .adjust('stack')
    .size(range.size)
    .color('index')
    .tooltip(false);

  if (range.color) {
    rangeGeometry.color('index', range.color);
  }

  const measureGeometry = chart
    .interval()
    .position(`${xField}*${measureField}`)
    .size(measure.size)
    .label(`${measureField}`)
    .adjust('stack')
    .color('index');

  if (measure.color) {
    measureGeometry.color('index', measure.color);
  }

  const targetGeometry = chart
    .point()
    .position(`${xField}*${targetField}`)
    .shape('line')
    .size(target.size / 2); // 是半径

  if (target.color) {
    targetGeometry.color('index', target.color);
  }

  return params;
}

/**
 * meta 配置
 * @param params
 */
function meta(params: Params<BulletOptions>): Params<BulletOptions> {
  const { chart, options } = params;
  const { xAxis, yAxis, meta, targetField, rangeField, measureField, xField } = options;

  if (meta) {
    const scales = deepMix({}, meta, {
      [xField]: pick(xAxis, AXIS_META_CONFIG_KEYS),
      [measureField]: pick(yAxis, AXIS_META_CONFIG_KEYS),
      [targetField]: {
        sync: `${measureField}`,
      },
      [rangeField]: {
        sync: `${measureField}`,
      },
    });
    chart.scale(scales);
  }

  return params;
}
/**
 * axis 配置
 * @param params
 */
function axis(params: Params<BulletOptions>): Params<BulletOptions> {
  const { chart, options } = params;
  const { xAxis, yAxis, xField, measureField } = options;

  // 为 false 则是不显示轴
  if (xAxis === false) {
    chart.axis(`${xField}`, false);
  } else {
    chart.axis(`${xField}`, xAxis);
  }

  if (yAxis === false) {
    chart.axis(`${measureField}`, false);
  } else {
    chart.axis(`${measureField}`, yAxis);
  }

  return params;
}

/**
 * legend 配置
 * @param params
 */
function legend(params: Params<BulletOptions>): Params<BulletOptions> {
  const { chart, options } = params;
  const { legend } = options;
  chart.removeInteraction('legend-filter');
  chart.legend(legend);

  return params;
}

/**
 * label 配置
 * @param params
 */
function label(params: Params<BulletOptions>): Params<BulletOptions> {
  const { chart, options } = params;
  const { bulletLabel, measureField } = options;
  const measureGeometry = chart.geometries[1];
  measureGeometry.label(`${measureField}`, bulletLabel);

  return params;
}

/**
 * style 配置
 * @param params
 */
function style(params: Params<BulletOptions>): Params<BulletOptions> {
  const { chart, options } = params;
  const { bulletStyle } = options;
  const { range, measure, target } = bulletStyle;
  // 按绘图顺序
  const [rangeGeometry, measureGeometry, targetGeometry] = chart.geometries;

  if (range.style) {
    rangeGeometry.style(range.style);
  }
  if (measure.style) {
    measureGeometry.style(measure.style);
  }
  if (target.style) {
    targetGeometry.style(target.style);
  }
  return params;
}
/**
 * 子弹图适配器
 * @param chart
 * @param options
 */
export function adaptor(params: Params<BulletOptions>) {
  // flow 的方式处理所有的配置到 G2 API
  flow(field, meta, axis, legend, theme, label, style, tooltip, interaction, animation)(params);
}
