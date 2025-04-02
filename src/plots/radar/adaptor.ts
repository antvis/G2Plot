import { animation, annotation, interaction, legend, scale, theme, tooltip } from '../../adaptor/common';
import { area, line, point } from '../../adaptor/geometries';
import { Params } from '../../core/adaptor';
import { deepAssign, findGeometry, flow, transformLabel } from '../../utils';
import { RadarOptions } from './types';

/**
 * geometry 配置处理
 * @param params
 */
function geometry(params: Params<RadarOptions>): Params<RadarOptions> {
  const { chart, options } = params;
  const { data, lineStyle, color, point: pointOptions, area: areaOptions } = options;

  chart.data(data);

  // 雷达图 主 geometry
  const primary = deepAssign({}, params, {
    options: {
      line: {
        style: lineStyle,
        color,
      },
      point: pointOptions
        ? {
            color,
            ...pointOptions,
          }
        : pointOptions,
      area: areaOptions
        ? {
            color,
            ...areaOptions,
          }
        : areaOptions,
      // label 不传递给各个 geometry adaptor，由 label adaptor 处理
      label: undefined,
    },
  });
  // 副 Geometry
  const second = deepAssign({}, primary, {
    options: {
      tooltip: false,
    },
  });
  // 优先使用 point.state, 其次取主元素的 state 状态样式配置
  const pointState = pointOptions?.state || options.state;
  const pointParams = deepAssign({}, primary, { options: { tooltip: false, state: pointState } });

  line(primary);
  point(pointParams);
  area(second);

  return params;
}

/**
 * meta 配置
 * @param params
 */
function meta(params: Params<RadarOptions>): Params<RadarOptions> {
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
 * coord 配置
 * @param params
 */
function coord(params: Params<RadarOptions>): Params<RadarOptions> {
  const { chart, options } = params;
  const { radius, startAngle, endAngle } = options;

  chart.coordinate('polar', {
    radius,
    startAngle,
    endAngle,
  });
  return params;
}

/**
 * axis 配置
 * @param params
 */
function axis(params: Params<RadarOptions>): Params<RadarOptions> {
  const { chart, options } = params;
  const { xField, xAxis, yField, yAxis } = options;

  chart.axis(xField, xAxis);
  chart.axis(yField, yAxis);

  return params;
}

/**
 * label 配置
 * @param params
 */
function label(params: Params<RadarOptions>): Params<RadarOptions> {
  const { chart, options } = params;
  const { label, yField } = options;

  const geometry = findGeometry(chart, 'line');

  if (!label) {
    geometry.label(false);
  } else {
    const { fields, callback, ...cfg } = label;
    geometry.label({
      fields: fields || [yField],
      callback,
      cfg: transformLabel(cfg),
    });
  }

  return params;
}

/**
 * 雷达图适配器
 * @param chart
 * @param options
 */
export function adaptor(params: Params<RadarOptions>) {
  // flow 的方式处理所有的配置到 G2 API
  return flow(geometry, meta, theme, coord, axis, legend, tooltip, label, interaction, animation, annotation())(params);
}
