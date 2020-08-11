import { deepMix, isFunction, isObject } from '@antv/util';
import { Params } from '../../core/adaptor';
import { findGeometry } from '../../common/helper';
import { flow, pick } from '../../utils';
import { AXIS_META_CONFIG_KEYS, DEFAULT_COLORS } from '../../constant';
import { tooltip, interaction, animation, theme } from '../../adaptor/common';
import { HeatmapOptions, ShapeType, SHAPE_TYPES } from './types';

/**
 * 数据字段映射
 * @param params
 */
function field(params: Params<HeatmapOptions>): Params<HeatmapOptions> {
  const { chart, options } = params;
  const { data, xField, yField, colorField, sizeField, sizeRatio, shapeType, color } = options;

  chart.data(data);

  const geometry = chart.polygon().position(`${xField}*${yField}`);

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
    if (!shapeType && !sizeField) {
      console.warn('sizeRatio is not in effect: Must define shapeType or sizeField first');
    } else if (sizeRatio < 0 || sizeRatio > 1) {
      console.warn('sizeRatio is not in effect: It must be a number in [0,1]');
    } else {
      checkedSizeRatio = sizeRatio;
    }
  }

  /**
   * The type of shape in each cell of heatmap.
   *
   * If a valid type is specified with `shapeType` attribute, the shape would be that type.
   * If `shapeType` specifies an invalid type, the type would be set to `square` as default.
   *
   * If the `shapeType` is undefined but the `sizeField` attribute is specified,
   * the type would be set to `square` as default since the original shape 'rectangle' can hardly
   * be mapped with size.
   */
  let checkedShapeType: ShapeType;
  if (shapeType) {
    if (!(SHAPE_TYPES as string[]).includes(shapeType)) {
      console.warn(`Invalid shapeType: Must be one of ${SHAPE_TYPES}, new set to default 'square'`);
      checkedShapeType = 'square';
    } else {
      checkedShapeType = shapeType as ShapeType;
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
  const { chart } = params;

  // TODO: chart legend
  // legends overrided with color and size mapped with the same field,
  // requre support from G2

  // const { legend, colorField, sizeField } = params.options;

  // if (legend && colorField) {
  //   chart.legend(colorField, legend);
  // }

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
