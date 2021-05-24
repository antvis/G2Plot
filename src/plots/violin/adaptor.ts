import { Params } from '../../core/adaptor';
import { interaction, animation, theme } from '../../adaptor/common';
import { flow, pick, deepAssign } from '../../utils';
import { AXIS_META_CONFIG_KEYS } from '../../constant';
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
  const { seriesField, color, shape = 'violin', violinStyle } = options;

  const view = chart.createView({ id: VIOLIN_VIEW_ID });
  const g = view.violin();
  g.position(`${X_FIELD}*${VIOLIN_Y_FIELD}`)
    .adjust(adjustCfg)
    .shape(shape)
    .color(seriesField ? SERIES_FIELD : X_FIELD, color)
    .size(VIOLIN_SIZE_FIELD)
    .style(violinStyle);

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
  const { seriesField, color, box } = options;

  // 如果配置 `box` 为 false ，不渲染内部箱线图
  if (!box) return params;

  // 边缘线
  const minMaxView = chart.createView({ id: MIN_MAX_VIEW_ID });
  minMaxView
    .interval()
    .position(`${X_FIELD}*${MIN_MAX_FIELD}`)
    .color(seriesField ? SERIES_FIELD : X_FIELD, color)
    .adjust(adjustCfg)
    .size(1)
    .style({
      lineWidth: 0,
    });

  // 四分点位
  const quantileView = chart.createView({ id: QUANTILE_VIEW_ID });
  quantileView
    .interval()
    .position(`${X_FIELD}*${QUANTILE_FIELD}`)
    .color(seriesField ? SERIES_FIELD : X_FIELD, color)
    .adjust(adjustCfg)
    .size(8)
    .style({
      fillOpacity: 1,
    });

  // 中位值
  const medianView = chart.createView({ id: MEDIAN_VIEW_ID });
  medianView
    .point()
    .position(`${X_FIELD}*${MEDIAN_FIELD}`)
    .color(seriesField ? SERIES_FIELD : X_FIELD, color)
    .adjust(adjustCfg)
    .size(1)
    .style({
      fill: 'white',
      lineWidth: 0,
    });

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
        customItems: (originalItems) => {
          const sample = originalItems?.[0];
          if (!sample) return [];

          // 数据
          const [min, max] = sample.data[MIN_MAX_FIELD];
          const [q1, q3] = sample.data[QUANTILE_FIELD];
          const [median] = sample.data[MEDIAN_FIELD];
          return [
            {
              ...sample,
              name: textMap.max,
              title: textMap.max,
              value: max,
              marker: 'circle',
            },
            {
              ...sample,
              name: textMap.q3,
              title: textMap.q3,
              value: q3,
              marker: 'circle',
            },
            {
              ...sample,
              name: textMap.median,
              title: textMap.median,
              value: median,
              marker: 'circle',
            },
            {
              ...sample,
              name: textMap.q1,
              title: textMap.q1,
              value: q1,
              marker: 'circle',
            },
            {
              ...sample,
              name: textMap.min,
              title: textMap.min,
              value: min,
              marker: 'circle',
            },
          ];
        },
      },
      // 用户的配置
      tooltip
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
