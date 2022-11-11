import { Geometry } from '@antv/g2';
import { get, isString } from '@antv/util';
import { animation, annotation, interaction, scale, theme } from '../../adaptor/common';
import { interval } from '../../adaptor/geometries';
import { AXIS_META_CONFIG_KEYS } from '../../constant';
import { Params } from '../../core/adaptor';
import { deepAssign, flow, pick, renderGaugeStatistic } from '../../utils';
import { DEFAULT_COLOR, INDICATEOR_VIEW_ID, PERCENT, RANGE_TYPE, RANGE_VALUE, RANGE_VIEW_ID } from './constants';
import { GaugeOptions } from './types';
import { getIndicatorData, getRangeData } from './utils';

/**
 * geometry 处理
 * @param params
 */
function geometry(params: Params<GaugeOptions>): Params<GaugeOptions> {
  const { chart, options } = params;
  const { percent, range, radius, innerRadius, startAngle, endAngle, axis, indicator, gaugeStyle, type, meter } =
    options;
  const { color, width: rangeWidth } = range;

  // 指标 & 指针
  // 如果开启在应用
  if (indicator) {
    const indicatorData = getIndicatorData(percent);

    const v1 = chart.createView({ id: INDICATEOR_VIEW_ID });
    v1.data(indicatorData);

    v1.point()
      .position(`${PERCENT}*1`)
      .shape(indicator.shape || 'gauge-indicator')
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

  const { ext } = interval({
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
        shape: type === 'meter' ? 'meter-gauge' : null,
      },
      args: {
        zIndexReversed: true,
        sortZIndex: true,
      },
      minColumnWidth: rangeWidth,
      maxColumnWidth: rangeWidth,
    },
  });

  const geometry = ext.geometry as Geometry;
  // 传入到自定义 shape 中
  geometry.customInfo({ meter });

  v2.coordinate('polar', {
    innerRadius,
    radius,
    startAngle,
    endAngle,
  }).transpose();

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
    const { content: contentOption } = statistic;
    let transformContent;
    // 当设置 content 的时候，设置默认样式
    if (contentOption) {
      transformContent = deepAssign(
        {},
        {
          content: `${(percent * 100).toFixed(2)}%`,
          style: {
            opacity: 0.75,
            fontSize: '30px',
            lineHeight: 1,
            textAlign: 'center',
            color: 'rgba(44,53,66,0.85)',
          },
        },
        contentOption
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
 * tooltip 配置
 */
function tooltip(params: Params<GaugeOptions>): Params<GaugeOptions> {
  const { chart, options } = params;
  const { tooltip } = options;

  if (tooltip) {
    chart.tooltip(
      deepAssign(
        {
          showTitle: false,
          showMarkers: false,
          containerTpl: '<div class="g2-tooltip"><div class="g2-tooltip-list"></div></div>',
          domStyles: {
            'g2-tooltip': {
              padding: '4px 8px',
              fontSize: '10px',
            },
          },
          customContent: (x: string, data: any[]) => {
            const percent = get(data, [0, 'data', PERCENT], 0);
            return `${(percent * 100).toFixed(2)}%`;
          },
        },
        tooltip
      )
    );
  } else {
    // 默认，不展示 tooltip
    chart.tooltip(false);
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
    tooltip,
    statistic,
    interaction,
    annotation(),
    other
    // ... 其他的 adaptor flow
  )(params);
}
