import { point } from '../../adaptor/geometries/point';
import { Params } from '../../core/adaptor';
import { interaction, animation, theme, legend, annotation, tooltip, scale } from '../../adaptor/common';
import { flow, deepAssign } from '../../utils';
import { transformData } from './utils';
import { CirclePackingOptions } from './types';

/**
 * 获取默认 option
 * @param params
 */
function defaultOptions(params: Params<CirclePackingOptions>): Params<CirclePackingOptions> {
  const { options } = params;
  const { colorField } = options;

  return deepAssign(
    {
      options: {
        tooltip: {
          showMarkers: false,
          showTitle: false,
          fields: ['name', 'value', colorField],
          formatter: (data) => {
            return {
              name: data.name,
              value: data.value,
            };
          },
        },
      },
    },
    params
  );
}

/**
 * 字段
 * @param params
 */
function geometry(params: Params<CirclePackingOptions>): Params<CirclePackingOptions> {
  const { chart, options } = params;
  const { color, colorField, pointStyle, hierarchyConfig, sizeField, size, rawFields } = options;

  const data = transformData({
    data: options.data,
    hierarchyConfig,
  });
  chart.data(data);

  // geometry
  point(
    deepAssign({}, params, {
      options: {
        xField: 'x',
        yField: 'y',
        seriesField: colorField,
        sizeField,
        rawFields: ['x', 'y', 'r', 'name', 'value', ...(rawFields || [])],
        point: {
          color,
          style: pointStyle,
          shape: 'circle',
          size,
        },
      },
    })
  );

  return params;
}

/**
 * meta 配置
 * @param params
 */
export function meta(params: Params<CirclePackingOptions>): Params<CirclePackingOptions> {
  return flow(
    scale(
      {},
      {
        // 必须强制为 nice
        x: { nice: true },
        y: { nice: true },
      }
    )
  )(params);
}

/**
 * 坐标轴, 默认关闭
 * @param params
 */
function axis(params: Params<CirclePackingOptions>): Params<CirclePackingOptions> {
  const { chart } = params;
  chart.axis(false);
  return params;
}

/**
 * 矩形树图
 * @param chart
 * @param options
 */
export function adaptor(params: Params<CirclePackingOptions>) {
  return flow(
    defaultOptions,
    meta,
    geometry,
    axis,
    theme,
    legend,
    tooltip,
    interaction,
    animation,
    annotation()
  )(params);
}
