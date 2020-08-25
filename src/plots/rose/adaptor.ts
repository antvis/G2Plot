import { deepMix, isObject } from '@antv/util';
import { Params } from '../../core/adaptor';
import { RoseOptions } from './types';
import { flow, findGeometry, log, LEVEL, pick } from '../../utils';
import { legend, tooltip, interaction, animation, theme } from '../../adaptor/common';
import { interval } from '../../adaptor/geometries';
import { AXIS_META_CONFIG_KEYS } from '../../constant';

/**
 * geometry 配置处理
 * @param params
 */
function geometry(params: Params<RoseOptions>): Params<RoseOptions> {
  const { chart, options } = params;
  const { data, sectorStyle } = options;

  // 装载数据
  chart.data(data);

  flow(interval)(
    deepMix({}, params, {
      options: {
        interval: {
          style: sectorStyle,
        },
      },
    })
  );

  return params;
}

/**
 * label 配置
 * @param params
 */
function label(params: Params<RoseOptions>): Params<RoseOptions> {
  const { chart, options } = params;
  const { label, xField } = options;
  const geometry = findGeometry(chart, 'interval');

  // label 为 false 不显示 label
  if (label === false) {
    geometry.label(false);
  } else if (isObject(label)) {
    const { callback, fields, ...cfg } = label;
    geometry.label({
      fields: fields || [xField],
      callback,
      cfg,
    });
  } else {
    // label == null 表示 label 可能是 undefined 或者 null
    log(LEVEL.WARN, label == null, 'the label option must be an Object.');
    geometry.label({ fields: [xField] });
  }

  return params;
}

/**
 * coord 配置
 * @param params
 */
function coord(params: Params<RoseOptions>): Params<RoseOptions> {
  const { chart, options } = params;
  const { radius, innerRadius } = options;

  chart.coordinate({
    type: 'polar',
    cfg: {
      radius,
      innerRadius,
    },
  });

  return params;
}

/**
 * meta 配置
 * @param params
 */
function meta(params: Params<RoseOptions>): Params<RoseOptions> {
  const { chart, options } = params;
  const { meta, xAxis, yAxis, xField, yField } = options;

  const scales = deepMix({}, meta, {
    [xField]: pick(xAxis, AXIS_META_CONFIG_KEYS),
    [yField]: pick(yAxis, AXIS_META_CONFIG_KEYS),
  });

  chart.scale(scales);

  return params;
}

/**
 * axis 配置
 * @param params
 */
function axis(params: Params<RoseOptions>): Params<RoseOptions> {
  const { chart, options } = params;
  const { xAxis, yAxis, xField, yField } = options;

  // 为 falsy 则是不显示轴
  if (!xAxis) {
    chart.axis(xField, false);
  } else {
    chart.axis(xField, xAxis);
  }

  if (!yAxis) {
    chart.axis(yField, false);
  } else {
    chart.axis(yField, yAxis);
  }

  return params;
}

/**
 * 玫瑰图适配器
 * @param chart
 * @param options
 */
export function adaptor(params: Params<RoseOptions>) {
  // flow 的方式处理所有的配置到 G2 API
  flow(geometry, meta, label, coord, axis, legend, tooltip, interaction, animation, theme)(params);
}
