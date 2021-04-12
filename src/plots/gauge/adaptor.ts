import { isString } from '@antv/util';
import { interaction, animation, theme, scale, annotation } from '../../adaptor/common';
import { interval } from '../../adaptor/geometries';
import { AXIS_META_CONFIG_KEYS } from '../../constant';
import { Params } from '../../core/adaptor';
import { deepAssign, flow, pick, renderGaugeStatistic } from '../../utils';
import {
  RANGE_TYPE,
  RANGE_VALUE,
  PERCENT,
  DEFAULT_COLOR,
  INDICATEOR_VIEW_ID,
  RANGE_VIEW_ID,
  MASK_VIEW_ID,
} from './constants';
import { GaugeCustomInfo, GaugeOptions } from './types';
import { getIndicatorData, getRangeData } from './utils';

/**
 * geometry 处理
 * @param params
 */
function geometry(params: Params<GaugeOptions>): Params<GaugeOptions> {
  const { chart, options } = params;
  const { percent, range, radius, innerRadius, startAngle, endAngle, axis, indicator, gaugeStyle } = options;
  const { color, width: rangeWidth } = range;

  // 指标 & 指针
  // 如果开启在应用
  if (indicator) {
    const indicatorData = getIndicatorData(percent);

    const v1 = chart.createView({ id: INDICATEOR_VIEW_ID });
    v1.data(indicatorData);

    v1.point()
      .position(`${PERCENT}*1`)
      .shape('gauge-indicator')
      // 传入指针的样式到自定义 shape 中
      .customInfo({
        defaultColor: chart.getTheme().defaultColor,
        indicator,
      });

    v1.coordinate('polar', {
      startAngle,
      endAngle,
      radius: innerRadius * radius, // 外部的 innerRadius * radius = 这里的 radius
    });

    v1.axis(PERCENT, axis);
    // 一部分应用到 scale 中
    v1.scale(PERCENT, pick(axis, AXIS_META_CONFIG_KEYS));
  }

  // 辅助 range
  // [{ range: 1, type: '0', percent: 原始进度百分比 }]
  const rangeData = getRangeData(percent, options.range);
  const v2 = chart.createView({ id: RANGE_VIEW_ID });
  v2.data(rangeData);

  const rangeColor = isString(color) ? [color, DEFAULT_COLOR] : color;

  interval({
    chart: v2,
    options: {
      xField: '1',
      yField: RANGE_VALUE,
      seriesField: RANGE_TYPE,
      rawFields: [PERCENT],
      isStack: true,
      interval: {
        color: rangeColor,
        style: gaugeStyle,
      },
      args: {
        zIndexReversed: true,
      },
      minColumnWidth: rangeWidth,
      maxColumnWidth: rangeWidth,
    },
  });

  v2.coordinate('polar', {
    innerRadius,
    radius,
    startAngle,
    endAngle,
  }).transpose();

  return params;
}

/**
 * meter 类型的仪表盘 有一层 mask
 * @param params
 */
function meterView(params: Params<GaugeOptions>): Params<GaugeOptions> {
  const { chart, options } = params;

  const { type, meter } = options;
  if (type === 'meter') {
    const { innerRadius, radius, startAngle, endAngle, range } = options;
    const minColumnWidth = range?.width;
    const maxColumnWidth = range?.width;

    const { background } = chart.getTheme();

    let color = background;
    if (!color || color === 'transparent') {
      color = '#fff';
    }

    const v3 = chart.createView({ id: MASK_VIEW_ID });
    v3.data([{ [RANGE_TYPE]: '1', [RANGE_VALUE]: 1 }]);
    const customInfo: GaugeCustomInfo = { meter };
    v3.interval({ minColumnWidth, maxColumnWidth })
      .position(`1*${RANGE_VALUE}`)
      .color(color)
      .adjust('stack')
      .shape('meter-gauge')
      .customInfo(customInfo);
    v3.coordinate('polar', { innerRadius, radius, startAngle, endAngle }).transpose();
  }

  return params;
}

/**
 * meta 配置
 * @param params
 */
function meta(params: Params<GaugeOptions>): Params<GaugeOptions> {
  return flow(
    scale({
      range: {
        min: 0,
        max: 1,
        maxLimit: 1,
        minLimit: 0,
      },
      [PERCENT]: {},
    })
  )(params);
}

/**
 * 统计指标文档
 * @param params
 */
function statistic(params: Params<GaugeOptions>, updated?: boolean): Params<GaugeOptions> {
  const { chart, options } = params;
  const { statistic, percent } = options;

  // 先清空标注，再重新渲染
  chart.getController('annotation').clear(true);
  if (statistic) {
    const { content } = statistic;
    let transformContent;
    // 当设置 content 的时候，设置默认样式
    if (content) {
      transformContent = deepAssign(
        {},
        {
          formatter: ({ percent }) => `${(percent * 100).toFixed(2)}%`,
          style: {
            opacity: 0.75,
            fontSize: '30px',
            lineHeight: 1,
            textAlign: 'center',
            color: 'rgba(44,53,66,0.85)',
          },
        },
        content
      );
    }
    renderGaugeStatistic(chart, { statistic: { ...statistic, content: transformContent } }, { percent });
  }

  if (updated) {
    chart.render(true);
  }

  return params;
}

/**
 * other 配置
 * @param params
 */
function other(params: Params<GaugeOptions>): Params<GaugeOptions> {
  const { chart } = params;

  chart.legend(false);
  chart.tooltip(false);

  return params;
}

/**
 * 对外暴露的 adaptor
 */
export { statistic };

/**
 * 图适配器
 * @param chart
 * @param options
 */
export function adaptor(params: Params<GaugeOptions>) {
  // flow 的方式处理所有的配置到 G2 API
  return flow(
    theme,
    // animation 配置必须在 createView 之前，不然无法让子 View 生效
    animation,
    geometry,
    meta,
    statistic,
    interaction,
    // meterView 需要放到主题之后
    meterView,
    annotation(),
    other
    // ... 其他的 adaptor flow
  )(params);
}
