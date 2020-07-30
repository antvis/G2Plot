import { deepMix, isFunction } from '@antv/util';
import { Params } from '../../core/adaptor';
import { tooltip, interaction, animation, theme } from '../../common/adaptor';
import { RADAR_XAXIS_OPTIONS, RADAR_YAXIS_OPTIONS } from '../../common/constants';
import { findGeometry } from '../../common/helper';
import { AXIS_META_CONFIG_KEYS } from '../../constant';
import { flow, pick } from '../../utils';
import { RadarOptions } from './types';

/**
 * 字段
 * @param params
 */
function field(params: Params<RadarOptions>): Params<RadarOptions> {
  const { chart, options } = params;
  const { data, xField, yField, seriesField: colorField = '', color, point, area } = options;
  const lineColor = isFunction(color) ? color : color;

  chart.data(data);
  chart.line().position(`${xField}*${yField}`).color(colorField, lineColor);

  if (point) {
    const pointColor = isFunction(point.color) ? point.color : point.color || lineColor;
    chart.point().position(`${xField}*${yField}`).color(colorField, pointColor);
  }

  if (area) {
    chart.area().position(`${xField}*${yField}`).color(colorField, lineColor);
  }

  return params;
}

/**
 * meta 配置
 * @param params
 */
function meta(params: Params<RadarOptions>): Params<RadarOptions> {
  const { chart, options } = params;
  const { meta, xField, yField, xAxis, yAxis } = options;

  // meta 直接是 scale 的信息
  const scales = deepMix(
    {
      [xField]: pick(xAxis, AXIS_META_CONFIG_KEYS),
      [yField]: pick(yAxis, AXIS_META_CONFIG_KEYS),
    },
    meta
  );

  chart.scale(scales);

  return params;
}

/**
 * coord 配置
 * @param params
 */
function coord(params: Params<RadarOptions>): Params<RadarOptions> {
  const { chart, options } = params;
  const { radius } = options;

  chart.coordinate('polar', {
    radius,
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

  chart.axis(xField, deepMix({}, xAxis, RADAR_XAXIS_OPTIONS));
  chart.axis(yField, deepMix({}, yAxis, RADAR_YAXIS_OPTIONS));

  return params;
}

/**
 * legend 配置
 * @param params
 */
function legend(params: Params<RadarOptions>): Params<RadarOptions> {
  return params;
}

/**
 * shape 的配置处理
 * @param params
 */
function shape(params: Params<RadarOptions>): Params<RadarOptions> {
  const { chart, options } = params;
  const { point, xField, yField, seriesField } = options;

  const pointGeom = findGeometry(chart, 'point');
  if (pointGeom && point) {
    const shape = point.shape || 'circle';
    if (isFunction(shape)) {
      // @ts-ignore
      pointGeom.shape(`${xField}*${yField}*${seriesField}`, shape);
    } else {
      pointGeom.shape(shape);
    }

    const size = point.size;
    if (isFunction(size)) {
      // @ts-ignore
      pointGeom.size(`${xField}*${yField}*${seriesField}`, size);
    } else if (size) {
      pointGeom.size(size);
    }
  }
  return params;
}

/**
 * label 配置
 * @param params
 */
function label(params: Params<RadarOptions>): Params<RadarOptions> {
  return params;
}

/**
 * style 配置
 * @param params
 */
function style(params: Params<RadarOptions>): Params<RadarOptions> {
  const { chart, options } = params;
  const { lineStyle, point, area, xField, yField, seriesField } = options;

  const lineGeom = findGeometry(chart, 'line');
  if (lineGeom) {
    if (isFunction(lineStyle)) {
      lineGeom.style(`${xField}*${yField}*${seriesField}`, lineStyle);
    } else {
      lineGeom.style(lineStyle || {});
    }
  }

  const pointGeom = findGeometry(chart, 'point');
  if (pointGeom && point) {
    if (isFunction(point.style)) {
      pointGeom.style(`${xField}*${yField}*${seriesField}`, point.style);
    } else {
      pointGeom.style(point.style || {});
    }
  }

  const areaGeom = findGeometry(chart, 'area');
  if (areaGeom && area) {
    if (isFunction(area.style)) {
      areaGeom.style(`${xField}*${yField}*${seriesField}`, area.style);
    } else {
      areaGeom.style(area.style || {});
    }
  }

  return params;
}

/**
 * 雷达图适配器
 * todo tooltip 支持显示横向对比指标情况
 * @param chart
 * @param options
 */
export function adaptor(params: Params<RadarOptions>) {
  // flow 的方式处理所有的配置到 G2 API
  flow(field, meta, theme, coord, axis, legend, tooltip, shape, label, style, interaction, animation)(params);
}
