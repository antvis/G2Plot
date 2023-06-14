import { Types } from '@antv/g2';
import { each, filter, isMatch } from '@antv/util';
import { brushInteraction } from '../../adaptor/brush';
import {
  animation,
  annotation,
  interaction,
  limitInPlot,
  scale,
  scrollbar,
  slider,
  state,
  theme,
  transformations,
} from '../../adaptor/common';
import { connectedArea } from '../../adaptor/connected-area';
import { conversionTag } from '../../adaptor/conversion-tag';
import { interval } from '../../adaptor/geometries';
import { pattern } from '../../adaptor/pattern';
import { Params } from '../../core/adaptor';
import { Datum } from '../../types';
import { adjustYMetaByZero, deepAssign, findGeometry, flow, pick, transformLabel } from '../../utils';
import { getDataWhetherPercentage, getDeepPercent } from '../../utils/transform/percent';
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
  const {
    data,
    columnStyle,
    color,
    columnWidthRatio,
    isPercent,
    isGroup,
    isStack,
    xField,
    yField,
    seriesField,
    groupField,
    tooltip,
    shape,
  } = options;

  const percentData =
    isPercent && isGroup && isStack
      ? getDeepPercent(data, yField, [xField, groupField], yField)
      : getDataWhetherPercentage(data, yField, xField, yField, isPercent);

  let chartData = [];

  // 存在堆叠,并且存在堆叠seriesField分类，并且不存在分组的时候 进行堆叠
  if (isStack && seriesField && !isGroup) {
    percentData.forEach((item) => {
      const stackedItem = chartData.find((v) => v[xField] === item[xField] && v[seriesField] === item[seriesField]);
      if (stackedItem) {
        stackedItem[yField] += item[yField] || 0;
      } else {
        chartData.push({ ...item });
      }
    });
  } else {
    chartData = percentData;
  }

  chart.data(chartData);

  // 百分比堆积图，默认会给一个 % 格式化逻辑, 用户可自定义
  const tooltipOptions = isPercent
    ? {
        formatter: (datum: Datum) => ({
          name:
            isGroup && isStack ? `${datum[seriesField]} - ${datum[groupField]}` : datum[seriesField] ?? datum[xField],
          value: (Number(datum[yField]) * 100).toFixed(2) + '%',
        }),
        ...tooltip,
      }
    : tooltip;

  const p = deepAssign({}, params, {
    options: {
      data: chartData,
      widthRatio: columnWidthRatio,
      tooltip: tooltipOptions,
      interval: {
        shape,
        style: columnStyle,
        color,
      },
    },
  });
  interval(p);

  return p;
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
 * 柱形图 tooltip 配置 (对堆叠、分组做特殊处理)
 * @param params
 */
function columnTooltip(params: Params<ColumnOptions>): Params<ColumnOptions> {
  const { chart, options } = params;
  const { tooltip, isGroup, isStack, groupField, data, xField, yField, seriesField } = options;

  if (tooltip === false) {
    chart.tooltip(false);
  } else {
    let tooltipOptions = tooltip;
    // fix: https://github.com/antvis/G2Plot/issues/2572
    if (isGroup && isStack) {
      const { customItems } = tooltipOptions;
      const tooltipFormatter =
        tooltipOptions?.formatter ||
        ((datum: Datum) => ({ name: `${datum[seriesField]} - ${datum[groupField]}`, value: datum[yField] }));
      tooltipOptions = {
        ...tooltipOptions,
        customItems: (originalItems: Types.TooltipItem[]) => {
          const items: Types.TooltipItem[] = [];
          each(originalItems, (item: Types.TooltipItem) => {
            // Find datas in same cluster
            const datas = filter(data, (d) => isMatch(d, pick(item.data, [xField, seriesField])));
            datas.forEach((datum) => {
              items.push({
                ...item,
                value: datum[yField],
                data: datum,
                mappingData: { _origin: datum },
                ...tooltipFormatter(datum),
              });
            });
          });
          // fix https://github.com/antvis/G2Plot/issues/3367
          return customItems ? customItems(items) : items;
        },
      };
    }
    chart.tooltip(tooltipOptions);
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
    pattern('columnStyle'),
    state,
    transformations('rect'),
    geometry,
    meta,
    axis,
    legend,
    columnTooltip,
    slider,
    scrollbar,
    label,
    brushInteraction,
    interaction,
    animation,
    annotation(),
    conversionTag<ColumnOptions>(options.yField, !isBar, !!seriesField), // 有拆分的时候禁用转化率
    connectedArea<ColumnOptions>(!options.isStack),
    limitInPlot
  )(params);
}
