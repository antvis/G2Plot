import { Geometry } from '@antv/g2';
import { deepMix, get, isObject } from '@antv/util';
import { Datum } from '@antv/g2/lib/interface';
import { Params } from '../../core/adaptor';
import { tooltip, interaction, animation, theme, state, scale, annotation } from '../../adaptor/common';
import { interval } from '../../adaptor/geometries';
import { findGeometry, flow } from '../../utils';
import { WaterOptions } from './types';
import { processData } from './utils';
import './shape';

const Y_FIELD = '$$yField$$';
const DIFF_FIELD = '$$diffField$$';
const ABSOLUTE_FIELD = '$$absoluteField$$';
const IS_TOTAL = '$$isTotal$$';

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
    risingFill,
    fallingFill,
    color,
  } = options;

  // 数据处理
  let newData = processData(data, xField, yField, Y_FIELD, total);
  newData = newData.map((d, dIdx) => {
    if (!isObject(d)) {
      return d;
    }
    return {
      ...d,
      [ABSOLUTE_FIELD]: d[Y_FIELD][1],
      [DIFF_FIELD]: d[Y_FIELD][1] - d[Y_FIELD][0],
      [IS_TOTAL]: dIdx === data.length,
    };
  });
  chart.data(newData);

  // 瀑布图自带的 colorMapping
  let colorMapping = color;
  if (!color) {
    colorMapping = (datum: Datum) => {
      if (get(datum, [IS_TOTAL])) {
        return get(total, ['style', 'fill'], '');
      }
      return get(datum, [Y_FIELD, 1]) - get(datum, [Y_FIELD, 0]) > 0 ? risingFill : fallingFill;
    };
  }

  const p = deepMix({}, params, {
    options: {
      xField: xField,
      yField: Y_FIELD,
      seriesField: xField,
      rawFields: [yField, DIFF_FIELD, IS_TOTAL],
      widthRatio: columnWidthRatio,
      interval: {
        style: waterfallStyle,
        shape: 'waterfall',
        color: colorMapping,
      },
    },
  });
  const { ext } = interval(p);
  const geometry = ext.geometry as Geometry;

  // tooltip 默认展示 difference
  geometry.tooltip(yField);

  // 将 waterfall leaderLineCfg 传入到自定义 shape 中
  geometry.customInfo({ leaderLine });

  return params;
}

/**
 * meta 配置
 * @param params
 */
function meta(params: Params<WaterOptions>): Params<WaterOptions> {
  const { options } = params;
  const { xAxis, yAxis, xField, yField, meta } = options;

  const Y_FIELD_META = deepMix({}, { alias: yField }, get(meta, yField));

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
 * legend 配置 todo 添加 hover 交互
 * @param params
 */
function legend(params: Params<WaterOptions>): Params<WaterOptions> {
  const { chart, options } = params;
  const { legend, total, risingFill, fallingFill } = options;

  if (legend === false) {
    chart.legend(false);
  } else {
    const items = [
      {
        name: '增加',
        value: 'increase',
        marker: { symbol: 'square', style: { r: 5, fill: risingFill } },
      },
      {
        name: '减少',
        value: 'decrease',
        marker: { symbol: 'square', style: { r: 5, fill: fallingFill } },
      },
    ];
    if (total) {
      items.push({
        name: total.label || '',
        value: 'total',
        marker: {
          symbol: 'square',
          style: deepMix({}, { r: 5 }, get(total, 'style')),
        },
      });
    }
    chart.legend(
      deepMix(
        {},
        {
          custom: true,
          position: 'top',
          items,
        },
        legend
      )
    );
    chart.removeInteraction('legend-filter');
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
