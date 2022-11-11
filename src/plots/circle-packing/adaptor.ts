import { Types } from '@antv/g2';
import { get } from '@antv/util';
import {
  animation,
  annotation,
  interaction as baseInteraction,
  legend,
  pattern,
  scale,
  theme,
} from '../../adaptor/common';
import { point } from '../../adaptor/geometries/point';
import { Params } from '../../core/adaptor';
import { deepAssign, flow } from '../../utils';
import { getAdjustAppendPadding, resolveAllPadding } from '../../utils/padding';
import { RAW_FIELDS } from './constant';
import { CirclePackingOptions } from './types';
import { resolvePaddingForCircle, transformData } from './utils';

/**
 * 获取默认 option
 * @param params
 */
function defaultOptions(params: Params<CirclePackingOptions>): Params<CirclePackingOptions> {
  const { chart } = params;
  const diameter = Math.min(chart.viewBBox.width, chart.viewBBox.height);

  return deepAssign(
    {
      options: {
        size: ({ r }) => r * diameter, // 当autofit：false时，默认给固定半径
      },
    },
    params
  );
}

/**
 * padding 配置
 * @param params
 */
function padding(params: Params<CirclePackingOptions>): Params<CirclePackingOptions> {
  const { options, chart } = params;
  // 通过改变 padding，修改 coordinate 的绘制区域
  const containerSize = chart.viewBBox;
  const { padding, appendPadding, drilldown } = options;

  let tempAppendPadding = appendPadding;
  if (drilldown?.enabled) {
    const appendPaddingByDrilldown = getAdjustAppendPadding(
      chart.appendPadding,
      get(drilldown, ['breadCrumb', 'position'])
    );
    tempAppendPadding = resolveAllPadding([appendPaddingByDrilldown, appendPadding]);
  }

  const { finalPadding } = resolvePaddingForCircle(padding, tempAppendPadding, containerSize);
  chart.padding = finalPadding;
  chart.appendPadding = 0;

  return params;
}

/**
 * 字段
 * @param params
 */
function geometry(params: Params<CirclePackingOptions>): Params<CirclePackingOptions> {
  const { chart, options } = params;
  const { padding, appendPadding } = chart;
  const { color, colorField, pointStyle, hierarchyConfig, sizeField, rawFields = [], drilldown } = options;

  const data = transformData({
    data: options.data,
    hierarchyConfig,
    enableDrillDown: drilldown?.enabled,
    rawFields,
  });
  chart.data(data);

  const containerSize = chart.viewBBox;
  const { finalSize } = resolvePaddingForCircle(padding, appendPadding, containerSize);
  // 有sizeField的时候，例如 value ，可以选择映射 size 函数，自己计算出映射的半径
  let circleSize = ({ r }) => r * finalSize; // 默认配置

  if (sizeField) {
    circleSize = (d) => d[sizeField] * finalSize; // 目前只有 r 通道映射效果会正常
  }

  // geometry
  point(
    deepAssign({}, params, {
      options: {
        xField: 'x',
        yField: 'y',
        seriesField: colorField,
        sizeField,
        rawFields: [...RAW_FIELDS, ...rawFields],
        point: {
          color,
          style: pointStyle,
          shape: 'circle',
          size: circleSize,
        },
      },
    })
  );

  return params;
}

/**
 * meta 配置
 * @param params
 */
export function meta(params: Params<CirclePackingOptions>): Params<CirclePackingOptions> {
  return flow(
    scale(
      {},
      {
        // 必须强制为 nice
        x: { min: 0, max: 1, minLimit: 0, maxLimit: 1, nice: true },
        y: { min: 0, max: 1, minLimit: 0, maxLimit: 1, nice: true },
      }
    )
  )(params);
}

/**
 * tooltip 配置
 * @param params
 */
function tooltip(params: Params<CirclePackingOptions>): Params<CirclePackingOptions> {
  const { chart, options } = params;
  const { tooltip } = options;

  if (tooltip === false) {
    chart.tooltip(false);
  } else {
    let tooltipOptions = tooltip;
    // 设置了 fields，就不进行 customItems 了; 设置 formatter 时，需要搭配 fields
    if (!get(tooltip, 'fields')) {
      tooltipOptions = deepAssign(
        {},
        {
          customItems: (items: Types.TooltipItem[]) =>
            items.map((item) => {
              const scales = get(chart.getOptions(), 'scales');
              const nameFormatter = get(scales, ['name', 'formatter'], (v) => v);
              const valueFormatter = get(scales, ['value', 'formatter'], (v) => v);
              return {
                ...item,
                name: nameFormatter(item.data.name),
                value: valueFormatter(item.data.value),
              };
            }),
        },
        tooltipOptions
      );
    }
    chart.tooltip(tooltipOptions);
  }

  return params;
}

/**
 * 坐标轴, 默认关闭
 * @param params
 */
function axis(params: Params<CirclePackingOptions>): Params<CirclePackingOptions> {
  const { chart } = params;
  chart.axis(false);
  return params;
}

function adaptorInteraction(options: CirclePackingOptions): CirclePackingOptions {
  const { drilldown, interactions = [] } = options;

  if (drilldown?.enabled) {
    return deepAssign({}, options, {
      interactions: [
        ...interactions,
        {
          type: 'drill-down',
          cfg: { drillDownConfig: drilldown, transformData, enableDrillDown: true },
        },
      ],
    });
  }
  return options;
}

/**
 * 交互配置
 * @param params
 * @returns
 */
function interaction(params: Params<CirclePackingOptions>): Params<CirclePackingOptions> {
  const { chart, options } = params;

  baseInteraction({
    chart,
    options: adaptorInteraction(options),
  });

  return params;
}

/**
 * 矩形树图
 * @param chart
 * @param options
 */
export function adaptor(params: Params<CirclePackingOptions>) {
  return flow(
    pattern('pointStyle'),
    defaultOptions,
    padding,
    theme,
    meta,
    geometry,
    axis,
    legend,
    tooltip,
    interaction,
    animation,
    annotation()
  )(params);
}
