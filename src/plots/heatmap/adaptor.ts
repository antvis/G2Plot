import { isFunction, isObject } from '@antv/util';
import { Geometry } from '@antv/g2';
import { Params } from '../../core/adaptor';
import { findGeometry } from '../../utils';
import { flow, transformLabel } from '../../utils';
import { DEFAULT_COLORS } from '../../constant';
import { tooltip, interaction, animation, theme, scale, annotation } from '../../adaptor/common';
import { HeatmapOptions, Shape, SHAPES } from './types';

/**
 * 数据字段映射
 * @param params
 */
function field(params: Params<HeatmapOptions>): Params<HeatmapOptions> {
  const { chart, options } = params;
  const { data, type, reflect, xField, yField, colorField, sizeField, sizeRatio, shape, color } = options;

  chart.data(data);
  let geometry: Geometry;

  if (type === 'gaussian') {
    geometry = chart.heatmap().position(`${xField}*${yField}`);
  } else {
    geometry = chart.polygon().position(`${xField}*${yField}`);
  }

  if (colorField) {
    geometry.color(colorField, color || DEFAULT_COLORS.GRADIENT.CONTINUOUS);
  }

  if (reflect) {
    chart.coordinate().reflect(reflect);
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

  /**
   * The type of shape in each cell of heatmap.
   *
   * If a valid type is specified with `shape` attribute, the shape would be that type.
   * If `shape` specifies an invalid type, the type would be set to `square` as default.
   *
   * If the `shape` is undefined but the `sizeField` attribute is specified,
   * the type would be set to `square` as default since the original shape 'rectangle' can hardly
   * be mapped with size.
   */
  let checkedShapeType: Shape;
  if (shape) {
    if (!(SHAPES as string[]).includes(shape)) {
      console.warn(`Invalid shape: Must be one of ${SHAPES}, new set to default 'square'`);
      checkedShapeType = 'square';
    } else {
      checkedShapeType = shape as Shape;
    }
  } else if (sizeField) {
    checkedShapeType = 'square';
  }

  // when it has to change shape from original rect
  if (checkedShapeType) {
    // just to change shape in cell
    if (!sizeField) {
      geometry.shape('', () => {
        return [`heatmap-${checkedShapeType}-size`, 1, checkedSizeRatio];
      });
    }

    // specific shape in different size
    if (sizeField) {
      const field = data.map((row) => row[sizeField]);
      const min = Math.min(...field);
      const max = Math.max(...field);

      geometry.shape(sizeField, (v) => {
        return [`heatmap-${checkedShapeType}-size`, (v - min) / (max - min), checkedSizeRatio];
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
  const { chart } = params;
  // legends overrided with color and size mapped with the same field,
  // requre support from G2
  chart.legend(false);

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

  const geometry = findGeometry(chart, type === 'gaussian' ? 'heatmap' : 'polygon');

  if (!label) {
    geometry.label(false);
  } else {
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
 * 热力图适配器
 * @param chart
 * @param options
 */
export function adaptor(params: Params<HeatmapOptions>) {
  // flow 的方式处理所有的配置到 G2 API
  return flow(field, meta, theme, axis, legend, tooltip, style, label, annotation(), interaction, animation)(params);
}
