import { isNumber } from '@antv/util';
import { brushInteraction } from '../../adaptor/brush';
import { animation, annotation, interaction, scale, scrollbar, slider, theme } from '../../adaptor/common';
import { point } from '../../adaptor/geometries';
import { Params } from '../../core/adaptor';
import { deepAssign, findGeometry, flow, pick, transformLabel } from '../../utils';
import { ScatterOptions } from './types';
import { getMeta, getPath, getQuadrantDefaultConfig } from './util';

/**
 * 散点图默认美观
 * ① data.length === 1 ② 所有数据 y 值相等 ③ 所有数据 x 值相等
 * @param params
 * @returns params
 */
export function transformOptions(options: ScatterOptions): ScatterOptions {
  const { data = [], xField, yField } = options;

  if (data.length) {
    // x y 字段知否只有一个值，如果只有一个值，则进行优化
    let isOneX = true;
    let isOneY = true;

    let prev = data[0];
    let curr;

    for (let i = 1; i < data.length; i++) {
      curr = data[i];

      if (prev[xField] !== curr[xField]) {
        isOneX = false;
      }

      if (prev[yField] !== curr[yField]) {
        isOneY = false;
      }

      // 如果都不是 oneValue，那么可提前跳出循环
      if (!isOneX && !isOneY) {
        break;
      }

      prev = curr;
    }

    const keys = [];
    isOneX && keys.push(xField);
    isOneY && keys.push(yField);

    const meta = pick(getMeta(options), keys);

    return deepAssign({}, options, { meta });
  }

  return options;
}

/**
 * 字段
 * @param params
 */
function geometry(params: Params<ScatterOptions>): Params<ScatterOptions> {
  const { chart, options } = params;
  const { data, type, color, shape, pointStyle, shapeField, colorField, xField, yField, sizeField } = options;
  let { size } = options;

  let { tooltip } = options;

  if (sizeField) {
    if (!size) {
      size = [2, 8];
    }
    if (isNumber(size)) {
      size = [size, size];
    }
  }

  if (tooltip && !tooltip.fields) {
    tooltip = {
      ...tooltip,
      fields: [xField, yField, colorField, sizeField, shapeField],
    };
  }
  // 数据
  chart.data(data);

  // geometry
  point(
    deepAssign({}, params, {
      options: {
        seriesField: colorField,
        point: {
          color,
          shape,
          size,
          style: pointStyle,
        },
        tooltip,
      },
    })
  );

  const geometry = findGeometry(chart, 'point');

  // 数据调整
  if (type) {
    geometry.adjust(type);
  }

  return params;
}

/**
 * meta 配置
 * @param params
 */
export function meta(params: Params<ScatterOptions>): Params<ScatterOptions> {
  const { options } = params;
  const { xAxis, yAxis, xField, yField } = options;

  const newOptions = transformOptions(options);
  return flow(
    scale({
      [xField]: xAxis,
      [yField]: yAxis,
    })
  )(deepAssign({}, params, { options: newOptions }));
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
  const { legend, colorField, shapeField, sizeField, shapeLegend, sizeLegend } = options;

  /** legend 不为 false, 则展示图例, 优先展示 color 分类图例 */
  const showLegend = legend !== false;

  if (colorField) {
    chart.legend(colorField, showLegend ? legend : false);
  }

  // 优先取 shapeLegend, 否则取 legend
  if (shapeField) {
    if (shapeLegend) {
      chart.legend(shapeField, shapeLegend);
    } else {
      chart.legend(shapeField, shapeLegend === false ? false : legend);
    }
  }

  if (sizeField) {
    chart.legend(sizeField, sizeLegend ? sizeLegend : false);
  }

  /** 默认不展示 shape 图例，当 shapeLegend 为 undefined 也不展示图例 */
  /** 默认没有 sizeField，则隐藏连续图例 */
  if (!showLegend && !shapeLegend && !sizeLegend) {
    chart.legend(false);
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
      cfg: transformLabel(cfg),
    });
  }

  return params;
}

/**
 * annotation 配置
 * - 特殊 annotation: quadrant(四象限)
 * @param params
 */
function scatterAnnotation(params: Params<ScatterOptions>): Params<ScatterOptions> {
  const { options } = params;
  const { quadrant } = options;

  const annotationOptions = [];

  if (quadrant) {
    const { xBaseline = 0, yBaseline = 0, labels, regionStyle, lineStyle } = quadrant;
    const defaultConfig = getQuadrantDefaultConfig(xBaseline, yBaseline);
    // 仅支持四象限
    const quadrants = new Array(4).join(',').split(',');
    quadrants.forEach((_: string, index: number) => {
      annotationOptions.push(
        {
          type: 'region',
          top: false,
          ...defaultConfig.regionStyle[index].position,
          style: deepAssign({}, defaultConfig.regionStyle[index].style, regionStyle?.[index]),
        },
        {
          type: 'text',
          top: true,
          ...deepAssign({}, defaultConfig.labelStyle[index], labels?.[index]),
        }
      );
    });
    // 生成坐标轴
    annotationOptions.push(
      {
        type: 'line',
        top: false,
        start: ['min', yBaseline],
        end: ['max', yBaseline],
        style: deepAssign({}, defaultConfig.lineStyle, lineStyle),
      },
      {
        type: 'line',
        top: false,
        start: [xBaseline, 'min'],
        end: [xBaseline, 'max'],
        style: deepAssign({}, defaultConfig.lineStyle, lineStyle),
      }
    );
  }

  return flow(annotation(annotationOptions))(params);
}

// 趋势线
function regressionLine(params: Params<ScatterOptions>): Params<ScatterOptions> {
  const { options, chart } = params;
  const { regressionLine } = options;
  if (regressionLine) {
    const { style, equationStyle = {}, top = false, showEquation = false } = regressionLine;
    const defaultStyle = {
      stroke: '#9ba29a',
      lineWidth: 2,
      opacity: 0.5,
    };
    const defaulEquationStyle = {
      x: 20,
      y: 20,
      textAlign: 'left' as const,
      textBaseline: 'middle' as const,
      fontSize: 14,
      fillOpacity: 0.5,
    };
    chart.annotation().shape({
      top,
      render: (container, view) => {
        const group = container.addGroup({
          id: `${chart.id}-regression-line`,
          name: 'regression-line-group',
        });
        const [path, equation] = getPath({
          view,
          options,
        });
        group.addShape('path', {
          name: 'regression-line',
          attrs: {
            path,
            ...defaultStyle,
            ...style,
          },
        });
        if (showEquation) {
          group.addShape('text', {
            name: 'regression-equation',
            attrs: {
              ...defaulEquationStyle,
              ...equationStyle,
              text: equation,
            },
          });
        }
      },
    });
  }

  return params;
}

/**
 * tooltip 配置
 * @param params
 */
export function tooltip(params: Params<ScatterOptions>): Params<ScatterOptions> {
  const { chart, options } = params;
  const { tooltip } = options;

  if (tooltip) {
    chart.tooltip(tooltip);
  } else if (tooltip === false) {
    chart.tooltip(false);
  }

  return params;
}

/**
 * 散点图适配器
 * @param chart
 * @param options
 */
export function adaptor(params: Params<ScatterOptions>) {
  // flow 的方式处理所有的配置到 G2 API
  return flow(
    geometry,
    meta,
    axis,
    legend,
    tooltip,
    label,
    // 需要在 interaction 前面
    brushInteraction,
    slider,
    scrollbar,
    interaction,
    scatterAnnotation,
    animation,
    theme,
    regressionLine
  )(params);
}
