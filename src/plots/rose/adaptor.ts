import { deepMix, isObject } from '@antv/util';
import { Params } from '../../core/adaptor';
import { flow, findGeometry, log, LEVEL } from '../../utils';
import { tooltip, interaction, animation, theme, scale, annotation } from '../../adaptor/common';
import { interval } from '../../adaptor/geometries';
import { RoseOptions } from './types';

/**
 * geometry 配置处理
 * @param params
 */
function geometry(params: Params<RoseOptions>): Params<RoseOptions> {
  const { chart, options } = params;
  const { data, sectorStyle, color } = options;

  // 装载数据
  chart.data(data);

  flow(interval)(
    deepMix({}, params, {
      options: {
        marginRatio: 1,
        interval: {
          style: sectorStyle,
          color,
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
    log(LEVEL.WARN, label === null || label === undefined, 'the label option must be an Object.');
    geometry.label({ fields: [xField] });
  }

  return params;
}

/**
 * legend 配置
 * @param params
 */
export function legend(params: Params<RoseOptions>): Params<RoseOptions> {
  const { chart, options } = params;
  const { legend, seriesField } = options;

  if (legend === false) {
    chart.legend(false);
  } else if (seriesField) {
    chart.legend(seriesField, legend);
  }

  return params;
}

/**
 * coord 配置
 * @param params
 */
function coordinate(params: Params<RoseOptions>): Params<RoseOptions> {
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
  flow(geometry, meta, label, coordinate, axis, legend, tooltip, interaction, animation, theme, annotation())(params);
}
