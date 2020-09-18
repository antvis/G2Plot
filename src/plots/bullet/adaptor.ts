import { deepMix, isNumber } from '@antv/util';
import { Params } from '../../core/adaptor';
import { interaction, animation, theme, tooltip } from '../../adaptor/common';
import { flow, pick } from '../../utils';
import { AXIS_META_CONFIG_KEYS } from '../../constant';
import { interval, point } from '../../adaptor/geometries';
import { BulletOptions } from './types';
import { transformData } from './utils';

/**
 * geometry 处理
 * @param params
 */
function geometry(params: Params<BulletOptions>): Params<BulletOptions> {
  const { chart, options } = params;
  const { bulletStyle, targetField, rangeField, measureField, xField, layout } = options;
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
  chart.axis(`${rangeField}`, false);
  chart.axis(`${targetField}`, false);

  // rangeGeometry
  const r = deepMix({}, params, {
    options: {
      xField: xField,
      yField: rangeField,
      seriesField: 'rKey',
      isStack: true,
      interval: {
        color: range.color,
        style: range.style,
        size: range.size,
      },
    },
  });
  interval(r);
  // 范围值的 tooltip 隐藏掉
  chart.geometries[0].tooltip(false);

  // measureGeometry
  const m = deepMix({}, params, {
    options: {
      xField: xField,
      yField: measureField,
      seriesField: 'mKey',
      isStack: true,
      interval: {
        color: measure.color,
        style: measure.style,
        size: measure.size,
      },
    },
  });
  interval(m);

  // targetGeometry
  const t = deepMix({}, params, {
    options: {
      xField: xField,
      yField: targetField,
      seriesField: 'tKey',
      point: {
        color: target.color,
        style: target.style,
        size: isNumber(target.size) ? Number(target.size) / 2 : target.size,
        shape: layout === 'horizontal' ? 'line' : 'hyphen',
      },
    },
  });
  point(t);

  // 水平的时候，要转换坐标轴
  if (layout === 'horizontal') {
    chart.coordinate().transpose();
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
  const { label, measureField } = options;
  const measureGeometry = chart.geometries[1];
  measureGeometry.label(`${measureField}`, label);

  return params;
}

/**
 * 子弹图适配器
 * @param chart
 * @param options
 */
export function adaptor(params: Params<BulletOptions>) {
  // flow 的方式处理所有的配置到 G2 API
  flow(geometry, meta, axis, legend, theme, label, tooltip, interaction, animation)(params);
}
