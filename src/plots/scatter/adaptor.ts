import { isBoolean } from '@antv/util';
import { Params } from '../../core/adaptor';
import { flow, deepAssign } from '../../utils';
import { point } from '../../adaptor/geometries';
import { interaction, animation, theme, scale, annotation } from '../../adaptor/common';
import { findGeometry, transformLabel } from '../../utils';
import { getQuadrantDefaultConfig, getPath } from './util';
import { ScatterOptions } from './types';

/**
 * 字段
 * @param params
 */
function geometry(params: Params<ScatterOptions>): Params<ScatterOptions> {
  const { chart, options } = params;
  const { data, type, color, shape, size, pointStyle, shapeField, colorField, xField, yField, sizeField } = options;

  let { tooltip } = options;

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
  const { legend, colorField, shapeField, sizeField } = options;
  // legend 没有指定时根据 shapeField 和 colorField 来设置默认值
  const showLegend = isBoolean(legend) ? legend : legend || !!(shapeField || colorField);
  if (showLegend) {
    chart.legend(colorField || shapeField, legend);
    // 隐藏连续图例
    if (sizeField) {
      chart.legend(sizeField, false);
    }
  } else {
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
    const { style, top = false } = regressionLine;
    const defaultStyle = {
      stroke: '#9ba29a',
      lineWidth: 2,
      opacity: 0.5,
    };
    chart.annotation().shape({
      top,
      render: (container, view) => {
        const group = container.addGroup({
          id: `${chart.id}-regression-line`,
          name: 'regression-line-group',
        });
        const path = getPath({
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
    interaction,
    scatterAnnotation,
    animation,
    theme,
    regressionLine
  )(params);
}
