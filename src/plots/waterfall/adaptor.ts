import { Geometry } from '@antv/g2';
import { deepMix, get } from '@antv/util';
import { Params } from '../../core/adaptor';
import { findGeometry, flow } from '../../utils';
import { tooltip, interaction, animation, theme, state, scale, annotation } from '../../adaptor/common';
import { interval } from '../../adaptor/geometries';
import { DEFAULT_COLORS } from '../../constant';
import { WaterOptions } from './types';
import { processData } from './utils';
import './shape';

const Y_FIELD = '$$yField$$';
const DIFF_FIELD = '$$diffField$$';
const ABSOLUTE_FIELD = '$$absoluteField$$';

/**
 * 字段
 * @param params
 */
function geometry(params: Params<WaterOptions>): Params<WaterOptions> {
  const { chart, options } = params;
  const {
    data,
    xField,
    yField,
    total,
    leaderLine,
    columnWidthRatio,
    waterfallStyle,
    color = DEFAULT_COLORS.BRAND_COLOR,
  } = options;

  // 数据处理
  const newData = processData(data, xField, yField, Y_FIELD, !!total && get(total, 'label', '总计'));
  chart.data(
    newData.map((d) => ({ ...d, [ABSOLUTE_FIELD]: d[Y_FIELD][1], [DIFF_FIELD]: d[Y_FIELD][1] - d[Y_FIELD][0] }))
  );

  const p = deepMix({}, params, {
    options: {
      yField: Y_FIELD,
      seriesField: xField,
      widthRatio: columnWidthRatio,
      interval: {
        style: waterfallStyle,
        shape: 'waterfall',
        color,
      },
    },
  });
  const { ext } = interval(p);
  const geometry = ext.geometry as Geometry;

  // 将 waterfall totalCfg & leaderLineCfg 传入到自定义 shape 中
  geometry.customInfo({
    total,
    leaderLine,
  });
  // tooltip 默认展示 difference
  geometry.tooltip(yField);

  return params;
}

/**
 * meta 配置
 * @param params
 */
function meta(params: Params<WaterOptions>): Params<WaterOptions> {
  const { options } = params;
  const { xAxis, yAxis, xField, yField, meta } = options;

  const Y_FIELD_META = deepMix({}, { alias: yField }, meta && meta[yField]);

  return flow(
    scale(
      {
        [xField]: xAxis,
        [yField]: yAxis,
        [Y_FIELD]: yAxis,
      },
      deepMix({}, meta, { [Y_FIELD]: Y_FIELD_META, [DIFF_FIELD]: Y_FIELD_META, [ABSOLUTE_FIELD]: Y_FIELD_META })
    )
  )(params);
}

/**
 * axis 配置
 * @param params
 */
function axis(params: Params<WaterOptions>): Params<WaterOptions> {
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
 * legend 配置 todo
 * @param params
 */
function legend(params: Params<WaterOptions>): Params<WaterOptions> {
  const { chart, options } = params;
  const { legend } = options;
  const geometry = findGeometry(chart, 'interval');
  const colorAttribute = geometry.getAttribute('color');

  if (legend && colorAttribute) {
    const colorFields = colorAttribute.getFields();
    if (colorFields.length > 0) {
      chart.legend(colorFields[0], legend);
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
function label(params: Params<WaterOptions>): Params<WaterOptions> {
  const { chart, options } = params;
  const { label, labelDataMode } = options;

  const geometry = findGeometry(chart, 'interval');

  if (!label) {
    geometry.label(false);
  } else {
    const { callback, ...cfg } = label;
    geometry.label({
      fields: labelDataMode === 'absolute' ? [ABSOLUTE_FIELD] : [DIFF_FIELD],
      callback,
      cfg,
    });
  }

  return params;
}

/**
 * 瀑布图适配器
 * @param params
 */
export function adaptor(params: Params<WaterOptions>) {
  return flow(geometry, meta, axis, legend, tooltip, label, state, theme, interaction, animation, annotation())(params);
}
