import { get } from '@antv/util';
import { Types } from '@antv/g2';
import { point } from '../../adaptor/geometries/point';
import { Params } from '../../core/adaptor';
import { interaction as baseInteraction, animation, theme, legend, annotation, scale } from '../../adaptor/common';
import { flow, deepAssign } from '../../utils';
import { getAdjustAppendPadding } from '../../utils/padding';
import { transformData } from './utils';
import { CirclePackingOptions } from './types';
import { RAW_FIELDS } from './constant';

/**
 * 获取默认 option
 * @param params
 */
function defaultOptions(params: Params<CirclePackingOptions>): Params<CirclePackingOptions> {
  const { options } = params;
  const { colorField } = options;

  return deepAssign(
    {
      options: {
        tooltip: {
          fields: ['name', 'value', colorField],
          formatter: (data) => {
            return {
              name: data.name,
              value: data.value,
            };
          },
        },
      },
    },
    params
  );
}

/**
 * 字段
 * @param params
 */
function geometry(params: Params<CirclePackingOptions>): Params<CirclePackingOptions> {
  const { chart, options } = params;
  const { color, colorField, pointStyle, hierarchyConfig, sizeField, size, rawFields = [], drilldown } = options;

  const data = transformData({
    data: options.data,
    hierarchyConfig,
    enableDrillDown: drilldown?.enabled,
    rawFields,
  });
  chart.data(data);

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
          size,
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
        x: { nice: true },
        y: { nice: true },
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
              const pathFormatter = get(scales, ['path', 'formatter'], (v) => v);
              const valueFormatter = get(scales, ['value', 'formatter'], (v) => v);
              return {
                ...item,
                name: pathFormatter(item.data.value),
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
          cfg: { drillDownConfig: drilldown, transformData },
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

  const { drilldown } = options;

  baseInteraction({
    chart,
    options: adaptorInteraction(options),
  });

  // 适应下钻交互面包屑
  if (drilldown?.enabled) {
    // 为面包屑留出 25px 的空间
    chart.appendPadding = getAdjustAppendPadding(chart.appendPadding, get(drilldown, ['breadCrumb', 'position']));
  }

  return params;
}

/**
 * 矩形树图
 * @param chart
 * @param options
 */
export function adaptor(params: Params<CirclePackingOptions>) {
  return flow(
    defaultOptions,
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
