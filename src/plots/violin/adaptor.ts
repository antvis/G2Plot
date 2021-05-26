import { Params } from '../../core/adaptor';
import { interaction, animation, theme } from '../../adaptor/common';
import { interval, point, violin } from '../../adaptor/geometries';
import { flow, pick, deepAssign } from '../../utils';
import { AXIS_META_CONFIG_KEYS } from '../../constant';
import { Datum } from '../../types';
import { ViolinOptions } from './types';
import { transformViolinData } from './utils';
import {
  MEDIAN_FIELD,
  MEDIAN_VIEW_ID,
  MIN_MAX_FIELD,
  MIN_MAX_VIEW_ID,
  QUANTILE_FIELD,
  QUANTILE_VIEW_ID,
  SERIES_FIELD,
  VIOLIN_SIZE_FIELD,
  VIOLIN_VIEW_ID,
  VIOLIN_Y_FIELD,
  X_FIELD,
} from './constant';

const ALL_FIELDS = [
  X_FIELD,
  SERIES_FIELD,
  VIOLIN_Y_FIELD,
  VIOLIN_SIZE_FIELD,
  MIN_MAX_FIELD,
  QUANTILE_FIELD,
  MEDIAN_FIELD,
];

const adjustCfg = [
  {
    type: 'dodge',
    marginRatio: 1 / 32,
  } as const,
];

/** 处理数据 */
function data(params: Params<ViolinOptions>): Params<ViolinOptions> {
  const { chart, options } = params;
  chart.data(transformViolinData(options));
  return params;
}

/** 小提琴轮廓 */
function violinView(params: Params<ViolinOptions>): Params<ViolinOptions> {
  const { chart, options } = params;
  const { seriesField, color, shape = 'violin', violinStyle, tooltip } = options;

  const view = chart.createView({ id: VIOLIN_VIEW_ID });
  violin({
    chart: view,
    options: {
      xField: X_FIELD,
      yField: VIOLIN_Y_FIELD,
      seriesField: seriesField ? SERIES_FIELD : X_FIELD,
      sizeField: VIOLIN_SIZE_FIELD,
      tooltip: {
        fields: ALL_FIELDS,
        ...tooltip,
      },
      violin: {
        style: violinStyle,
        color,
        shape,
      },
    },
  });
  view.geometries[0].adjust(adjustCfg);

  view.axis(VIOLIN_Y_FIELD, {
    grid: {
      line: null,
    },
    tickLine: {
      alignTick: false,
    },
  });
  view.axis(VIOLIN_Y_FIELD, {
    grid: {
      line: {
        style: {
          lineWidth: 0.5,
          // TODO: 为什么是 dash ？
          lineDash: [4, 4],
        },
      },
    },
  });

  return params;
}

/** 箱线 */
function boxView(params: Params<ViolinOptions>): Params<ViolinOptions> {
  const { chart, options } = params;
  const { seriesField, color, box, tooltip } = options;

  // 如果配置 `box` 为 false ，不渲染内部箱线图
  if (!box) return params;

  // 边缘线
  const minMaxView = chart.createView({ id: MIN_MAX_VIEW_ID });
  interval({
    chart: minMaxView,
    options: {
      xField: X_FIELD,
      yField: MIN_MAX_FIELD,
      seriesField: seriesField ? SERIES_FIELD : X_FIELD,
      tooltip: {
        fields: ALL_FIELDS,
        ...tooltip,
      },
      interval: {
        color,
        size: 1,
        style: {
          lineWidth: 0,
        },
      },
    },
  });
  minMaxView.geometries[0].adjust(adjustCfg);

  // 四分点位
  const quantileView = chart.createView({ id: QUANTILE_VIEW_ID });
  interval({
    chart: quantileView,
    options: {
      xField: X_FIELD,
      yField: QUANTILE_FIELD,
      seriesField: seriesField ? SERIES_FIELD : X_FIELD,
      tooltip: {
        fields: ALL_FIELDS,
        ...tooltip,
      },
      interval: {
        color,
        size: 8,
        style: {
          fillOpacity: 1,
        },
      },
    },
  });
  quantileView.geometries[0].adjust(adjustCfg);

  // 中位值
  const medianView = chart.createView({ id: MEDIAN_VIEW_ID });
  point({
    chart: medianView,
    options: {
      xField: X_FIELD,
      yField: MEDIAN_FIELD,
      seriesField: seriesField ? SERIES_FIELD : X_FIELD,
      tooltip: {
        fields: ALL_FIELDS,
        ...tooltip,
      },
      point: {
        color,
        size: 1,
        style: {
          fill: 'white',
          lineWidth: 0,
        },
      },
    },
  });
  medianView.geometries[0].adjust(adjustCfg);

  return params;
}

/**
 * meta 配置
 */
function meta(params: Params<ViolinOptions>): Params<ViolinOptions> {
  const { chart, options } = params;
  const { meta, xAxis, yAxis } = options;

  const baseMeta = {};

  const scales = deepAssign(baseMeta, meta, {
    [X_FIELD]: {
      sync: true,
      ...pick(xAxis, AXIS_META_CONFIG_KEYS),
    },
    [VIOLIN_Y_FIELD]: {
      sync: 'y',
      ...pick(yAxis, AXIS_META_CONFIG_KEYS),
    },
    [MIN_MAX_FIELD]: {
      sync: 'y',
      ...pick(yAxis, AXIS_META_CONFIG_KEYS),
    },
    [QUANTILE_FIELD]: {
      sync: 'y',
      ...pick(yAxis, AXIS_META_CONFIG_KEYS),
    },
    [MEDIAN_FIELD]: {
      sync: 'y',
      ...pick(yAxis, AXIS_META_CONFIG_KEYS),
    },
  });

  chart.scale(scales);

  return params;
}

/**
 * axis 配置
 */
function axis(params: Params<ViolinOptions>): Params<ViolinOptions> {
  const { chart, options } = params;
  const { xAxis, yAxis, xField, yField, tooltip } = options;

  // 为 false 则是不显示轴
  if (xAxis === false) {
    chart.axis(xField, false);
  } else {
    chart.axis(xField, xAxis);
  }

  chart.axis(yField, yAxis);

  return params;
}

function tooltip(params: Params<ViolinOptions>): Params<ViolinOptions> {
  const { chart, options } = params;
  const { box } = options;
  if (!box) return params;

  const textMap = box.textMap;
  chart.tooltip(
    deepAssign(
      {},
      // 内置的配置
      {
        showMarkers: false,
        // 默认 formatter 把 datum 转换为 { value: { min, max, q1, q3, median } } 的结构体。
        formatter: (datum: Datum) => {
          return {
            value: {
              min: datum.minMax[0],
              max: datum.minMax[1],
              q1: datum.quantile[0],
              q3: datum.quantile[1],
              median: datum.median[0],
            },
          };
        },
        // 默认 customItems 消费上述结构体。
        customItems: (originalItems) => {
          const sample = originalItems?.[0];
          if (!sample) return [];

          return [
            {
              ...sample,
              name: textMap.max,
              title: textMap.max,
              value: sample.value.max,
              marker: 'circle',
            },
            {
              ...sample,
              name: textMap.q3,
              title: textMap.q3,
              value: sample.value.q3,
              marker: 'circle',
            },
            {
              ...sample,
              name: textMap.median,
              title: textMap.median,
              value: sample.value.median,
              marker: 'circle',
            },
            {
              ...sample,
              name: textMap.q1,
              title: textMap.q1,
              value: sample.value.q1,
              marker: 'circle',
            },
            {
              ...sample,
              name: textMap.min,
              title: textMap.min,
              value: sample.value.min,
              marker: 'circle',
            },
          ];
        },
      },
      // 用户的配置
      options.tooltip
    )
  );

  return params;
}

/**
 * 箱型图适配器
 * @param params
 */
export function adaptor(params: Params<ViolinOptions>) {
  return flow(data, violinView, boxView, meta, tooltip, axis, interaction, animation, theme)(params);
}
