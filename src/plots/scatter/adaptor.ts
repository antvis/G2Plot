import { isFunction, isNumber, isString, deepMix } from '@antv/util';
import { Params } from '../../core/adaptor';
import { flow } from '../../utils';
import { tooltip, interaction, animation, theme, scale } from '../../adaptor/common';
import { findGeometry } from '../../utils';
import { ScatterOptions } from './types';

/**
 * 字段
 * @param params
 */
function field(params: Params<ScatterOptions>): Params<ScatterOptions> {
  const { chart, options } = params;
  const { data, xField, yField, type, color, colorField, shape, shapeField, size, sizeField } = options;

  // 散点图操作逻辑
  chart.data(data);
  const geometry = chart.point().position(`${xField}*${yField}`);

  // 数据调整
  if (type) {
    geometry.adjust(type);
  }

  // shape
  if (shape) {
    if (isString(shape)) {
      geometry.shape(shape);
    } else {
      geometry.shape(shapeField || xField, shape);
    }
  }

  // color
  if (color) {
    if (isString(color)) {
      geometry.color(color);
    } else {
      geometry.color(colorField || xField, color);
    }
  }

  // size
  if (size) {
    if (isNumber(size)) {
      geometry.size(size);
    } else {
      geometry.size(sizeField || xField, size);
    }
  }

  return params;
}

/**
 * meta 配置
 * @param params
 */
function meta(params: Params<ScatterOptions>): Params<ScatterOptions> {
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
function axis(params: Params<ScatterOptions>): Params<ScatterOptions> {
  const { chart, options } = params;
  const { xAxis, yAxis, xField, yField } = options;

  chart.axis(xField, xAxis);
  chart.axis(yField, yAxis);

  return params;
}

/**
 * legend 配置
 * @param params
 */
function legend(params: Params<ScatterOptions>): Params<ScatterOptions> {
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
function style(params: Params<ScatterOptions>): Params<ScatterOptions> {
  const { chart, options } = params;
  const { xField, yField, pointStyle, colorField } = options;

  const geometry = chart.geometries[0];

  if (pointStyle && geometry) {
    if (isFunction(pointStyle)) {
      geometry.style(`${xField}*${yField}*${colorField}`, pointStyle);
    } else {
      geometry.style(pointStyle);
    }
  }

  return params;
}

/**
 * 数据标签
 * @param params
 */
function label(params: Params<ScatterOptions>): Params<ScatterOptions> {
  const { chart, options } = params;
  const { label, yField } = options;

  const scatterGeometry = findGeometry(chart, 'point');

  // label 为 false, 空 则不显示 label
  if (!label) {
    scatterGeometry.label(false);
  } else {
    const { callback, ...cfg } = label;
    scatterGeometry.label({
      fields: [yField],
      callback,
      cfg,
    });
  }

  return params;
}

/**
 * 四象限
 * @param params
 */
function quadrant(params: Params<ScatterOptions>): Params<ScatterOptions> {
  const { chart, options } = params;
  const { quadrant } = options;

  if (quadrant) {
    const { xBaseline = 0, yBaseline = 0, labels, regionStyle, lineStyle } = quadrant;
    const defaultConfig = getQuadrantDefaultConfig(xBaseline, yBaseline);
    // 仅支持四象限
    const quadrants = new Array(4).join(',').split(',');
    quadrants.forEach((_: string, index: number) => {
      chart.annotation().region({
        top: false,
        ...defaultConfig.regionStyle[index].position,
        style: deepMix({}, defaultConfig.regionStyle[index].style, regionStyle?.[index]),
      });
      chart.annotation().text({
        top: true,
        ...deepMix({}, defaultConfig.labelStyle[index], labels?.[index]),
      });
    });
    // 生成坐标轴
    chart.annotation().line({
      top: false,
      start: ['min', yBaseline],
      end: ['max', yBaseline],
      style: deepMix({}, defaultConfig.lineStyle, lineStyle),
    });
    chart.annotation().line({
      top: false,
      start: [xBaseline, 'min'],
      end: [xBaseline, 'max'],
      style: deepMix({}, defaultConfig.lineStyle, lineStyle),
    });
  }

  return params;
}

/**
 * 获取四象限默认配置
 * @param {number} xBaseline
 * @param {number} yBaseline
 */
function getQuadrantDefaultConfig(xBaseline: number, yBaseline: number) {
  // 文本便宜距离
  const textOffset = 10;
  // 四象限默认样式
  const defaultConfig: { [key: string]: any } = {
    regionStyle: [
      {
        position: {
          start: [xBaseline, 'max'],
          end: ['max', yBaseline],
        },
        style: {
          fill: '#d8d0c0',
          opacity: 0.4,
        },
      },
      {
        position: {
          start: ['min', 'max'],
          end: [xBaseline, yBaseline],
        },
        style: {
          fill: '#a3dda1',
          opacity: 0.4,
        },
      },
      {
        position: {
          start: ['min', yBaseline],
          end: [xBaseline, 'min'],
        },
        style: {
          fill: '#d8d0c0',
          opacity: 0.4,
        },
      },
      {
        position: {
          start: [xBaseline, yBaseline],
          end: ['max', 'min'],
        },
        style: {
          fill: '#a3dda1',
          opacity: 0.4,
        },
      },
    ],
    lineStyle: {
      stroke: '#9ba29a',
      lineWidth: 1,
    },
    labelStyle: [
      {
        position: ['max', yBaseline],
        offsetX: -textOffset,
        offsetY: -textOffset,
        style: {
          textAlign: 'right',
          textBaseline: 'bottom',
          fontSize: 14,
          fill: '#ccc',
        },
      },
      {
        position: ['min', yBaseline],
        offsetX: textOffset,
        offsetY: -textOffset,
        style: {
          textAlign: 'left',
          textBaseline: 'bottom',
          fontSize: 14,
          fill: '#ccc',
        },
      },
      {
        position: ['min', yBaseline],
        offsetX: textOffset,
        offsetY: textOffset,
        style: {
          textAlign: 'left',
          textBaseline: 'top',
          fontSize: 14,
          fill: '#ccc',
        },
      },
      {
        position: ['max', yBaseline],
        offsetX: -textOffset,
        offsetY: textOffset,
        style: {
          textAlign: 'right',
          textBaseline: 'top',
          fontSize: 14,
          fill: '#ccc',
        },
      },
    ],
  };
  return defaultConfig;
}

/**
 * 散点图适配器
 * @param chart
 * @param options
 */
export function adaptor(params: Params<ScatterOptions>) {
  // flow 的方式处理所有的配置到 G2 API
  return flow(field, meta, axis, legend, tooltip, style, label, interaction, quadrant, animation, theme)(params);
}
