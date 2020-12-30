import { polygon as basePolygon } from '../../adaptor/geometries/polygon';
import { Params } from '../../core/adaptor';
import { interaction, animation, theme, legend, annotation, tooltip } from '../../adaptor/common';
import { flow, deepAssign } from '../../utils';
import { transformData } from './utils';
import { TreemapOptions } from './types';

/**
 * 获取默认 option
 * @param params
 */
function defaultOptions(params: Params<TreemapOptions>): Params<TreemapOptions> {
  const { options } = params;
  const { colorField } = options;

  return deepAssign(
    {
      options: {
        label: {
          fields: ['name'],
          layout: {
            type: 'limit-in-shape',
          },
        },
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
function geometry(params: Params<TreemapOptions>): Params<TreemapOptions> {
  const { chart, options } = params;
  const { color, colorField } = options;
  const data = transformData(options);
  chart.data(data);

  // geometry
  basePolygon(
    deepAssign({}, params, {
      options: {
        xField: 'x',
        yField: 'y',
        seriesField: colorField,
        polygon: {
          color,
          style: {
            lineWidth: 1,
            stroke: '#fff',
          },
        },
      },
    })
  );

  return params;
}

/**
 * 坐标轴
 * @param params
 */
function axis(params: Params<TreemapOptions>): Params<TreemapOptions> {
  const { chart } = params;
  chart.axis(false);
  return params;
}

/**
 * 矩形树图
 * @param chart
 * @param options
 */
export function adaptor(params: Params<TreemapOptions>) {
  return flow(defaultOptions, geometry, axis, theme, legend, tooltip, interaction, animation, annotation())(params);
}
