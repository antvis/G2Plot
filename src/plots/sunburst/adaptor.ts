import { Params } from '../../core/adaptor';
import { polygon as polygonAdaptor } from '../../adaptor/geometries';
import { interaction, animation, theme, annotation } from '../../adaptor/common';
import { flow, findGeometry, transformLabel, deepAssign } from '../../utils';
import { transformData, getTooltipTemplate } from './utils';
import { SunburstOptions } from './types';

/**
 * geometry 配置处理
 * @param params
 */
function geometry(params: Params<SunburstOptions>): Params<SunburstOptions> {
  const { chart, options } = params;
  const { color, colorField, sunburstStyle } = options;
  const data = transformData(options);
  chart.data(data);

  // geometry
  polygonAdaptor(
    deepAssign({}, params, {
      options: {
        xField: 'x',
        yField: 'y',
        seriesField: colorField,
        polygon: {
          color,
          style: sunburstStyle,
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
export function axis(params: Params<SunburstOptions>): Params<SunburstOptions> {
  const { chart } = params;
  chart.axis(false);
  return params;
}

/**
 * legend 配置
 * @param params
 */
export function legend(params: Params<SunburstOptions>): Params<SunburstOptions> {
  const { chart } = params;
  chart.legend(false);
  return params;
}

/**
 * 数据标签
 * @param params
 */
function label(params: Params<SunburstOptions>): Params<SunburstOptions> {
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
      cfg: transformLabel(cfg),
    });
  }

  return params;
}

/**
 * coord 配置
 * @param params
 */
function coordinate(params: Params<SunburstOptions>): Params<SunburstOptions> {
  const { chart, options } = params;
  const { innerRadius, radius, reflect } = options;

  const coord = chart.coordinate({
    type: 'polar',
    cfg: {
      innerRadius,
      radius,
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
function scale(params: Params<SunburstOptions>): Params<SunburstOptions> {
  const { chart, options } = params;
  const { meta } = options;

  if (meta) {
    // @ts-ignore
    chart.scale(meta);
  }

  return params;
}

/**
 * tooltip 配置
 * @param params
 */
export function tooltip(params: Params<SunburstOptions>): Params<SunburstOptions> {
  const { chart, options } = params;
  const { tooltip, seriesField, colorField } = options;

  if (tooltip) {
    chart.tooltip({
      ...tooltip,
      customContent:
        tooltip && tooltip.customContent
          ? tooltip.customContent
          : (value: string, items: any[]) => {
              return getTooltipTemplate({
                value,
                items,
                formatter: tooltip && tooltip?.formatter,
                fields: (tooltip && tooltip.fields) || [seriesField, colorField],
              });
            },
    });
  }

  return params;
}

/**
 * 旭日图适配器
 * @param chart
 * @param options
 */
export function adaptor(params: Params<SunburstOptions>) {
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
