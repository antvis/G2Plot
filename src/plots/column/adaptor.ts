import { Params } from '../../core/adaptor';
import { findGeometry } from '../../utils';
import {
  tooltip,
  slider,
  interaction,
  animation,
  theme,
  scale,
  annotation,
  scrollbar,
  limitInPlot,
  state,
} from '../../adaptor/common';
import { conversionTag } from '../../adaptor/conversion-tag';
import { connectedArea } from '../../adaptor/connected-area';
import { interval } from '../../adaptor/geometries';
import { flow, transformLabel, deepAssign } from '../../utils';
import { getDataWhetherPecentage } from '../../utils/transform/percent';
import { adjustYMetaByZero } from '../../utils/data';
import { Datum } from '../../types';
import { ColumnOptions } from './types';

/**
 * defaultOptions
 * @param params
 */
function defaultOptions(params: Params<ColumnOptions>): Params<ColumnOptions> {
  const { options } = params;
  // 默认 legend 位置
  let { legend } = options;
  const { seriesField, isStack } = options;

  if (seriesField) {
    if (legend !== false) {
      legend = {
        position: isStack ? 'right-top' : 'top-left',
        ...legend,
      };
    }
  } else {
    legend = false;
  }

  // @ts-ignore 直接改值
  params.options.legend = legend;
  return params;
}

/**
 * 字段
 * @param params
 */
function geometry(params: Params<ColumnOptions>): Params<ColumnOptions> {
  const { chart, options } = params;
  const { data, columnStyle, color, columnWidthRatio, isPercent, xField, yField, seriesField, tooltip } = options;

  chart.data(getDataWhetherPecentage(data, yField, xField, yField, isPercent));

  // 百分比堆积图，默认会给一个 % 格式化逻辑, 用户可自定义
  const tooltipOptions = isPercent
    ? {
        formatter: (datum: Datum) => ({
          name: datum[seriesField] || datum[xField],
          value: (Number(datum[yField]) * 100).toFixed(2) + '%',
        }),
        ...tooltip,
      }
    : tooltip;

  const p = deepAssign({}, params, {
    options: {
      widthRatio: columnWidthRatio,
      tooltip: tooltipOptions,
      interval: {
        style: columnStyle,
        color,
      },
    },
  });
  interval(p);

  return params;
}

/**
 * meta 配置
 * @param params
 */
export function meta(params: Params<ColumnOptions>): Params<ColumnOptions> {
  const { options } = params;
  const { xAxis, yAxis, xField, yField, data, isPercent } = options;

  const percentYMeta = isPercent ? { max: 1, min: 0, minLimit: 0, maxLimit: 1 } : {};

  return flow(
    scale(
      {
        [xField]: xAxis,
        [yField]: yAxis,
      },
      {
        [xField]: {
          type: 'cat',
        },
        [yField]: {
          ...adjustYMetaByZero(data, yField),
          ...percentYMeta,
        },
      }
    )
  )(params);
}

/**
 * axis 配置
 * @param params
 */
function axis(params: Params<ColumnOptions>): Params<ColumnOptions> {
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
export function legend(params: Params<ColumnOptions>): Params<ColumnOptions> {
  const { chart, options } = params;
  const { legend, seriesField } = options;

  if (legend && seriesField) {
    chart.legend(seriesField, legend);
  } else if (legend === false) {
    chart.legend(false);
  }

  return params;
}

/**
 * 数据标签
 * @param params
 */
function label(params: Params<ColumnOptions>): Params<ColumnOptions> {
  const { chart, options } = params;
  const { label, yField, isRange } = options;

  const geometry = findGeometry(chart, 'interval');

  if (!label) {
    geometry.label(false);
  } else {
    const { callback, ...cfg } = label;
    geometry.label({
      fields: [yField],
      callback,
      cfg: {
        // 配置默认的 label layout： 如果用户没有指定 layout 和 position， 则自动配置 layout
        layout: cfg?.position
          ? undefined
          : [
              { type: 'interval-adjust-position' },
              { type: 'interval-hide-overlap' },
              { type: 'adjust-color' },
              { type: 'limit-in-plot', cfg: { action: 'hide' } },
            ],
        ...transformLabel(
          isRange
            ? {
                content: (item: object) => {
                  return item[yField]?.join('-');
                },
                ...cfg,
              }
            : cfg
        ),
      },
    });
  }

  return params;
}

/**
 * 柱形图适配器
 * @param params
 */
export function adaptor(params: Params<ColumnOptions>, isBar = false) {
  const { options } = params;
  const { seriesField } = options;
  return flow(
    defaultOptions, // 处理默认配置
    theme, // theme 需要在 geometry 之前
    state,
    geometry,
    meta,
    axis,
    legend,
    tooltip,
    slider,
    scrollbar,
    label,
    interaction,
    animation,
    annotation(),
    conversionTag<ColumnOptions>(options.yField, !isBar, !!seriesField), // 有拆分的时候禁用转化率
    connectedArea<ColumnOptions>(!options.isStack),
    limitInPlot
  )(params);
}
