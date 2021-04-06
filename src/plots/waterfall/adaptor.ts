import { Geometry } from '@antv/g2';
import { get } from '@antv/util';
import { Datum } from '../../types';
import { Params } from '../../core/adaptor';
import { interaction, animation, theme, state, scale, annotation } from '../../adaptor/common';
import { interval } from '../../adaptor/geometries';
import { findGeometry, flow, transformLabel, deepAssign } from '../../utils';
import { Y_FIELD, ABSOLUTE_FIELD, DIFF_FIELD, IS_TOTAL } from './constant';
import { WaterfallOptions } from './types';
import { transformData } from './utils';
import './shape';

/**
 * 字段
 * @param params
 */
function geometry(params: Params<WaterfallOptions>): Params<WaterfallOptions> {
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
  chart.data(transformData(data, xField, yField, total));

  // 瀑布图自带的 colorMapping
  const colorMapping =
    color ||
    function (datum: Datum) {
      if (get(datum, [IS_TOTAL])) {
        return get(total, ['style', 'fill'], '');
      }
      return get(datum, [Y_FIELD, 1]) - get(datum, [Y_FIELD, 0]) > 0 ? risingFill : fallingFill;
    };

  const p = deepAssign({}, params, {
    options: {
      xField: xField,
      yField: Y_FIELD,
      seriesField: xField,
      rawFields: [yField, DIFF_FIELD, IS_TOTAL, Y_FIELD],
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

  // 将 waterfall leaderLineCfg 传入到自定义 shape 中
  geometry.customInfo({ leaderLine });

  return params;
}

/**
 * meta 配置
 * @param params
 */
function meta(params: Params<WaterfallOptions>): Params<WaterfallOptions> {
  const { options } = params;
  const { xAxis, yAxis, xField, yField, meta } = options;

  const Y_FIELD_META = deepAssign({}, { alias: yField }, get(meta, yField));

  return flow(
    scale(
      {
        [xField]: xAxis,
        [yField]: yAxis,
        [Y_FIELD]: yAxis,
      },
      deepAssign({}, meta, { [Y_FIELD]: Y_FIELD_META, [DIFF_FIELD]: Y_FIELD_META, [ABSOLUTE_FIELD]: Y_FIELD_META })
    )
  )(params);
}

/**
 * axis 配置
 * @param params
 */
function axis(params: Params<WaterfallOptions>): Params<WaterfallOptions> {
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
    chart.axis(Y_FIELD, false);
  } else {
    chart.axis(yField, yAxis);
    chart.axis(Y_FIELD, yAxis);
  }

  return params;
}

/**
 * legend 配置 todo 添加 hover 交互
 * @param params
 */
function legend(params: Params<WaterfallOptions>): Params<WaterfallOptions> {
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
          style: deepAssign({}, { r: 5 }, get(total, 'style')),
        },
      });
    }
    chart.legend(
      deepAssign(
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
function label(params: Params<WaterfallOptions>): Params<WaterfallOptions> {
  const { chart, options } = params;
  const { label, labelMode, xField } = options;

  const geometry = findGeometry(chart, 'interval');

  if (!label) {
    geometry.label(false);
  } else {
    const { callback, ...cfg } = label;
    geometry.label({
      fields: labelMode === 'absolute' ? [ABSOLUTE_FIELD, xField] : [DIFF_FIELD, xField],
      callback,
      cfg: transformLabel(cfg),
    });
  }

  return params;
}

/**
 * tooltip 配置
 * @param params
 */
export function tooltip(params: Params<WaterfallOptions>): Params<WaterfallOptions> {
  const { chart, options } = params;
  const { tooltip, xField, yField } = options;

  if (tooltip !== false) {
    chart.tooltip({
      showCrosshairs: false,
      showMarkers: false,
      shared: true,
      // tooltip 默认展示 y 字段值
      fields: [yField],
      ...tooltip,
    });
    // 瀑布图默认以 yField 作为 tooltip 内容
    const geometry = chart.geometries[0];
    tooltip?.formatter ? geometry.tooltip(`${xField}*${yField}`, tooltip.formatter) : geometry.tooltip(yField);
  } else {
    chart.tooltip(false);
  }

  return params;
}

/**
 * 瀑布图适配器
 * @param params
 */
export function adaptor(params: Params<WaterfallOptions>) {
  return flow(geometry, meta, axis, legend, tooltip, label, state, theme, interaction, animation, annotation())(params);
}
