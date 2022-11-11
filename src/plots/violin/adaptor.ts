import { each, get, omit, set } from '@antv/util';
import { annotation as baseAnnotation, interaction, theme, tooltip } from '../../adaptor/common';
import { interval, point, violin } from '../../adaptor/geometries';
import { AXIS_META_CONFIG_KEYS } from '../../constant';
import { Params } from '../../core/adaptor';
import { deepAssign, findViewById, flow, pick } from '../../utils';
import { addViewAnimation } from '../../utils/view';
import {
  MEDIAN_FIELD,
  MEDIAN_VIEW_ID,
  MIN_MAX_FIELD,
  MIN_MAX_VIEW_ID,
  QUANTILE_FIELD,
  QUANTILE_VIEW_ID,
  VIOLIN_SIZE_FIELD,
  VIOLIN_VIEW_ID,
  VIOLIN_Y_FIELD,
  X_FIELD,
} from './constant';
import { ViolinOptions } from './types';
import { transformViolinData } from './utils';

const TOOLTIP_FIELDS = ['low', 'high', 'q1', 'q3', 'median'];

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
  const { seriesField, color, shape = 'violin', violinStyle, tooltip, state } = options;

  const view = chart.createView({ id: VIOLIN_VIEW_ID });
  violin({
    chart: view,
    options: {
      xField: X_FIELD,
      yField: VIOLIN_Y_FIELD,
      seriesField: seriesField ? seriesField : X_FIELD,
      sizeField: VIOLIN_SIZE_FIELD,
      tooltip: {
        fields: TOOLTIP_FIELDS,
        ...tooltip,
      },
      violin: {
        style: violinStyle,
        color,
        shape,
      },
      state,
    },
  });
  view.geometries[0].adjust(adjustCfg);

  return params;
}

/** 箱线 */
function boxView(params: Params<ViolinOptions>): Params<ViolinOptions> {
  const { chart, options } = params;
  const { seriesField, color, tooltip, box } = options;

  // 如果配置 `box` 为 false ，不渲染内部箱线图
  if (box === false) return params;

  // 边缘线
  const minMaxView = chart.createView({ id: MIN_MAX_VIEW_ID });
  interval({
    chart: minMaxView,
    options: {
      xField: X_FIELD,
      yField: MIN_MAX_FIELD,
      seriesField: seriesField ? seriesField : X_FIELD,
      tooltip: {
        fields: TOOLTIP_FIELDS,
        ...tooltip,
      },
      state: typeof box === 'object' ? box.state : {},
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
      seriesField: seriesField ? seriesField : X_FIELD,
      tooltip: {
        fields: TOOLTIP_FIELDS,
        ...tooltip,
      },
      state: typeof box === 'object' ? box.state : {},
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
      seriesField: seriesField ? seriesField : X_FIELD,
      tooltip: {
        fields: TOOLTIP_FIELDS,
        ...tooltip,
      },
      state: typeof box === 'object' ? box.state : {},
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

  // 关闭辅助 view 的轴
  quantileView.axis(false);
  minMaxView.axis(false);
  medianView.axis(false);

  // 关闭辅助 view 的图例
  medianView.legend(false);
  minMaxView.legend(false);
  quantileView.legend(false);

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
      // fix:  dodge is not support linear attribute, please use category attribute!
      // 强制 x 轴类型为分类类型
      type: 'cat',
    },
    [VIOLIN_Y_FIELD]: {
      sync: true,
      ...pick(yAxis, AXIS_META_CONFIG_KEYS),
    },
    [MIN_MAX_FIELD]: {
      sync: VIOLIN_Y_FIELD,
      ...pick(yAxis, AXIS_META_CONFIG_KEYS),
    },
    [QUANTILE_FIELD]: {
      sync: VIOLIN_Y_FIELD,
      ...pick(yAxis, AXIS_META_CONFIG_KEYS),
    },
    [MEDIAN_FIELD]: {
      sync: VIOLIN_Y_FIELD,
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
  const { xAxis, yAxis } = options;

  const view = findViewById(chart, VIOLIN_VIEW_ID);

  // 为 false 则是不显示轴
  if (xAxis === false) {
    view.axis(X_FIELD, false);
  } else {
    view.axis(X_FIELD, xAxis);
  }

  if (yAxis === false) {
    view.axis(VIOLIN_Y_FIELD, false);
  } else {
    view.axis(VIOLIN_Y_FIELD, yAxis);
  }

  chart.axis(false);

  return params;
}

/**
 *
 * @param params
 * @returns
 */
function legend(params: Params<ViolinOptions>): Params<ViolinOptions> {
  const { chart, options } = params;
  const { legend, seriesField, shape } = options;

  if (legend === false) {
    chart.legend(false);
  } else {
    const legendField = seriesField ? seriesField : X_FIELD;
    // fixme 暂不明为啥有描边
    const legendOptions = omit(legend as any, ['selected']);
    if (!shape || !shape.startsWith('hollow')) {
      if (!get(legendOptions, ['marker', 'style', 'lineWidth'])) {
        set(legendOptions, ['marker', 'style', 'lineWidth'], 0);
      }
    }
    chart.legend(legendField, legendOptions);
    // 特殊的处理 fixme G2 层得解决这个问题
    if (get(legend, 'selected')) {
      each(chart.views, (view) => view.legend(legendField, legend));
    }
  }

  return params;
}

/**
 * annotation, apply to violin view.
 * @param params
 * @returns
 */
function annotation(params: Params<ViolinOptions>): Params<ViolinOptions> {
  const { chart } = params;

  const violinView = findViewById(chart, VIOLIN_VIEW_ID);
  baseAnnotation()({ ...params, chart: violinView });

  return params;
}

/**
 * 动画
 * @param params
 */
export function animation(params: Params<ViolinOptions>): Params<ViolinOptions> {
  const { chart, options } = params;
  const { animation } = options;

  // 所有的 Geometry 都使用同一动画（各个图形如有区别，自行覆盖）
  each(chart.views, (view) => {
    addViewAnimation(view, animation);
  });

  return params;
}

/**
 * 小提琴图适配器
 * @param params
 */
export function adaptor(params: Params<ViolinOptions>) {
  return flow(
    theme,
    data,
    violinView,
    boxView,
    meta,
    tooltip,
    axis,
    legend,
    interaction,
    annotation,
    animation
  )(params);
}
