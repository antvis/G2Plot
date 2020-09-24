import { deepMix } from '@antv/util';
import { Params } from '../../core/adaptor';
import { polygon as polygonAdaptor } from '../../adaptor/geometries';
import { tooltip, interaction, animation, theme, annotation } from '../../adaptor/common';
import { flow, findGeometry } from '../../utils';
import { transformData } from './utils';
import { SunBurstOptions } from './types';

/**
 * geometry 配置处理
 * @param params
 */
function geometry(params: Params<SunBurstOptions>): Params<SunBurstOptions> {
  const { chart, options } = params;
  const { color, colorField, sunBurstStyle } = options;
  const data = transformData(options);
  chart.data(data);

  // geometry
  polygonAdaptor(
    deepMix({}, params, {
      options: {
        xField: 'x',
        yField: 'y',
        seriesField: colorField,
        polygon: {
          color,
          style: sunBurstStyle,
        },
      },
    })
  );

  return params;
}

/**
 * axis 配置
 * @param params
 */
export function axis(params: Params<SunBurstOptions>): Params<SunBurstOptions> {
  const { chart } = params;
  chart.axis(false);
  return params;
}

/**
 * legend 配置
 * @param params
 */
export function legend(params: Params<SunBurstOptions>): Params<SunBurstOptions> {
  const { chart } = params;
  chart.legend(false);
  return params;
}

/**
 * 数据标签
 * @param params
 */
function label(params: Params<SunBurstOptions>): Params<SunBurstOptions> {
  const { chart, options } = params;
  const { label, seriesField } = options;

  const geometry = findGeometry(chart, 'polygon');

  // label 为 false, 空 则不显示 label
  if (!label) {
    geometry.label(false);
  } else {
    const { callback, ...cfg } = label;
    geometry.label({
      fields: [seriesField],
      callback,
      cfg,
    });
  }

  return params;
}

/**
 * coord 配置
 * @param params
 */
function coordinate(params: Params<SunBurstOptions>): Params<SunBurstOptions> {
  const { chart, options } = params;
  const { innerRadius, reflect } = options;

  const coord = chart.coordinate({
    type: 'polar',
    cfg: {
      innerRadius,
    },
  });
  if (reflect) {
    coord.reflect(reflect);
  }

  return params;
}

/**
 * scale 配置
 * @param params
 */
function scale(params: Params<SunBurstOptions>): Params<SunBurstOptions> {
  const { chart, options } = params;
  const { meta } = options;

  if (meta) {
    chart.scale(meta);
  }

  return params;
}

/**
 * 旭日图适配器
 * @param chart
 * @param options
 */
export function adaptor(params: Params<SunBurstOptions>) {
  // flow 的方式处理所有的配置到 G2 API
  return flow(
    geometry,
    theme,
    axis,
    scale,
    legend,
    coordinate,
    tooltip,
    label,
    interaction,
    animation,
    annotation()
  )(params);
}
