import { isFunction, isObject } from '@antv/util';
import { Geometry } from '@antv/g2';
import { Params } from '../../core/adaptor';
import { findGeometry } from '../../utils';
import { flow, transformLabel } from '../../utils';
import { DEFAULT_COLORS } from '../../constant';
import { tooltip, interaction, animation, theme, scale, annotation, state } from '../../adaptor/common';
import { HeatmapOptions } from './types';

/**
 * 数据字段映射
 * @param params
 */
function field(params: Params<HeatmapOptions>): Params<HeatmapOptions> {
  const { chart, options } = params;
  const { data, type, xField, yField, colorField, sizeField, sizeRatio, shape, color } = options;

  chart.data(data);
  let geometry: Geometry;

  if (type === 'density') {
    geometry = chart.heatmap().position(`${xField}*${yField}`);
  } else {
    geometry = chart.polygon().position(`${xField}*${yField}`);
  }

  if (colorField) {
    geometry.color(colorField, color || DEFAULT_COLORS.GRADIENT.CONTINUOUS);
  }

  /**
   * The ratio between the actual size and the max available size, must be in range `[0,1]`.
   *
   * If the `sizeRatio` attribute is undefined or it exceeds the range,
   * `checkedSizeRatio` would be set to 1 as default.
   */
  let checkedSizeRatio = 1;
  if (sizeRatio || sizeRatio === 0) {
    if (!shape && !sizeField) {
      console.warn('sizeRatio is not in effect: Must define shape or sizeField first');
    } else if (sizeRatio < 0 || sizeRatio > 1) {
      console.warn('sizeRatio is not in effect: It must be a number in [0,1]');
    } else {
      checkedSizeRatio = sizeRatio;
    }
  }

  // when it has to change shape from original rect
  if (shape) {
    // just to change shape in cell
    if (!sizeField) {
      geometry.shape('', () => {
        return [shape, 1, checkedSizeRatio];
      });
    }

    // specific shape in different size
    if (sizeField) {
      const field = data.map((row) => row[sizeField]);
      const min = Math.min(...field);
      const max = Math.max(...field);

      geometry.shape(sizeField, (v) => {
        return [shape, (v - min) / (max - min), checkedSizeRatio];
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
function axis(params: Params<HeatmapOptions>): Params<HeatmapOptions> {
  const { chart, options } = params;
  const { xAxis, yAxis, xField, yField } = options;

  // 为 false 则是不显示轴
  if (xAxis === false) {
    chart.axis(xField, false);
  } else {
    chart.axis(xField, xAxis);
  }

  if (yAxis === false) {
    chart.axis(yField, false);
  } else {
    chart.axis(yField, yAxis);
  }

  return params;
}

/**
 * legend 配置
 * @param params
 */
function legend(params: Params<HeatmapOptions>): Params<HeatmapOptions> {
  const { chart, options } = params;
  const { legend, colorField } = options;

  if (legend) {
    chart.legend(colorField, legend);
  } else {
    chart.legend(false);
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
  const { label, colorField, type } = options;

  const geometry = findGeometry(chart, type === 'density' ? 'heatmap' : 'polygon');

  if (!label) {
    geometry.label(false);
  } else if (colorField) {
    const { callback, ...cfg } = label;
    geometry.label({
      fields: [colorField],
      callback,
      cfg: transformLabel(cfg),
    });
  }

  return params;
}

/**
 * 极坐标
 * @param params
 */
function coordinate(params: Params<HeatmapOptions>): Params<HeatmapOptions> {
  const { chart, options } = params;
  const { coordinate, reflect } = options;

  if (coordinate) {
    chart.coordinate({
      type: coordinate.type || 'rect',
      cfg: coordinate.cfg,
    });
  }

  if (reflect) {
    chart.coordinate().reflect(reflect);
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
  return flow(
    field,
    meta,
    theme,
    axis,
    legend,
    tooltip,
    style,
    label,
    annotation(),
    interaction,
    animation,
    state,
    coordinate
  )(params);
}
