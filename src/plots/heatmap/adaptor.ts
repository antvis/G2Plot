import { deepMix, isFunction, isObject } from '@antv/util';
import { Params } from '../../core/adaptor';
import { findGeometry } from '../../common/helper';
import { flow, pick } from '../../utils';
import { AXIS_META_CONFIG_KEYS, DEFAULT_COLORS } from '../../constant';
import { tooltip, interaction, animation, theme } from '../../adaptor/common';
import { HeatmapOptions } from './types';

/**
 * 数据字段映射
 * @param params
 */
function field(params: Params<HeatmapOptions>): Params<HeatmapOptions> {
  const { chart, options } = params;
  const { data, xField, yField, colorField, sizeField, shape, color } = options;

  chart.data(data);

  const geometry = chart.polygon().position(`${xField}*${yField}`);

  if (colorField) {
    geometry.color(colorField, color || DEFAULT_COLORS.GRADIENT.CONTINUOUS);
  }

  // just to change shape in cell
  if (shape && !sizeField) {
    if (shape === 'circle') {
      geometry.shape('heatmap-circle');
    } else if (shape === 'square') {
      geometry.shape('heatmap-square');
    }
  }

  // square (default) in different size
  if (!shape && sizeField) {
    const field = data.map((row) => row[sizeField]);
    const min = Math.min(...field);
    const max = Math.max(...field);

    geometry.shape(sizeField, (v) => {
      return ['heatmap-square-size', (v - min) / (max - min)];
    });
  }

  // specific shape in different size
  if (shape && sizeField) {
    if (shape === 'circle') {
      const field = data.map((row) => row[sizeField]);
      const min = Math.min(...field);
      const max = Math.max(...field);

      geometry.shape(sizeField, (v) => {
        return ['heatmap-circle-size', (v - min) / (max - min)];
      });
    }
  }

  return params;
}

/**
 * meta 配置
 * @param params
 */
function meta(params: Params<HeatmapOptions>): Params<HeatmapOptions> {
  const { chart, options } = params;
  const { meta, xAxis, yAxis, xField, yField } = options;

  // meta 直接是 scale 的信息
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
function axis(params: Params<HeatmapOptions>): Params<HeatmapOptions> {
  const { chart, options } = params;
  const { xAxis, yAxis, xField, yField } = options;

  chart.axis(
    xField,
    Object.assign(
      {
        tickLine: null,
        line: null,
        grid: {
          alignTick: false,
          line: {
            style: {
              lineWidth: 1,
              lineDash: null,
              stroke: '#f0f0f0',
            },
          },
        },
      },
      xAxis
    )
  );

  chart.axis(
    yField,
    Object.assign(
      {
        grid: {
          alignTick: false,
          line: {
            style: {
              lineWidth: 1,
              lineDash: null,
              stroke: '#f0f0f0',
            },
          },
        },
      },
      yAxis
    )
  );

  return params;
}

/**
 * legend 配置
 * @param params
 */
function legend(params: Params<HeatmapOptions>): Params<HeatmapOptions> {
  const { chart, options } = params;
  const { legend, colorField } = options;

  if (legend && colorField) {
    chart.legend(colorField, legend);
  }

  return params;
}

/**
 * 样式
 * @param params
 */
function style(params: Params<HeatmapOptions>): Params<HeatmapOptions> {
  const { chart, options } = params;
  const { xField, yField, colorField, sizeField, heatmapStyle } = options;

  const geometry = chart.geometries[0];
  if (heatmapStyle && geometry) {
    if (isFunction(heatmapStyle)) {
      geometry.style(`${xField}*${yField}*${colorField}*${sizeField}`, heatmapStyle);
    } else if (isObject(heatmapStyle)) {
      geometry.style(heatmapStyle);
    }
  }
  return params;
}

/**
 * 数据标签
 * @param params
 */
function label(params: Params<HeatmapOptions>): Params<HeatmapOptions> {
  const { chart, options } = params;
  const { label, colorField } = options;

  const geometry = findGeometry(chart, 'polygon');

  if (!label) {
    geometry.label(false);
  } else {
    const { callback, ...cfg } = label;
    geometry.label({
      fields: [colorField],
      callback,
      cfg,
    });
  }

  return params;
}

/**
 * 热力图适配器
 * @param chart
 * @param options
 */
export function adaptor(params: Params<HeatmapOptions>) {
  // flow 的方式处理所有的配置到 G2 API
  flow(field, meta, theme, axis, legend, tooltip, style, label, interaction, animation)(params);
}
