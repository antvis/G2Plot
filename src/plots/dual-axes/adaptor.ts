import { each, findIndex, get, isObject } from '@antv/util';
import { Scale } from '@antv/g2/lib/dependents';
import {
  theme as commonTheme,
  animation as commonAnimation,
  scale,
  interaction as commonInteraction,
} from '../../adaptor/common';
import { percent } from '../../utils/transform/percent';
import { Params } from '../../core/adaptor';
import { flow, deepMix } from '../../utils';
import { findViewById } from '../../utils/view';
import { Datum } from '../../types';
import { getOption, isColumn } from './util/option';
import { getViewLegendItems } from './util/legend';
import { drawSingleGeometry } from './util/geometry';
import { DualAxesOptions } from './types';
import { LEFT_AXES_VIEW, RIGHT_AXES_VIEW } from './constant';

/**
 * 获取默认参数设置
 * 双轴图无法使用公共的 getDefaultOption, 因为双轴图存在[lineConfig, lineConfig] 这样的数据，需要根据传入的 option，生成不同的 defaultOption,
 * 并且 deepmix 无法 mix 数组类型数据，因此需要做一次参数的后转换
 * 这个函数针对 yAxis 和 geometryOptions
 * @param params
 */
export function transformOptions(params: Params<DualAxesOptions>): Params<DualAxesOptions> {
  return deepMix({}, params, {
    options: getOption(params.options),
  });
}

/**
 * 绘制图形
 * @param params
 */
function geometry(params: Params<DualAxesOptions>): Params<DualAxesOptions> {
  const { chart, options } = params;
  const { xField, yField, geometryOptions, data, tooltip } = options;

  const SORT_MAP = { line: 0, column: 1 };

  // 包含配置，id，数据的结构
  const geometries = [
    { ...geometryOptions[0], id: LEFT_AXES_VIEW, data: data[0], yField: yField[0] },
    { ...geometryOptions[1], id: RIGHT_AXES_VIEW, data: data[1], yField: yField[1] },
  ];

  // 将线的 view 放置在更上一层，防止线柱遮挡。先柱后先
  geometries
    .sort((a, b) => -SORT_MAP[a.geometry] + SORT_MAP[b.geometry])
    .forEach((geometry) => {
      const { id, data, yField } = geometry;
      // 百分比柱状图需要额外处理一次数据
      const isPercent = isColumn(geometry) && geometry.isPercent;
      const formatData = isPercent ? percent(data, yField, xField, yField) : data;
      const view = chart.createView({ id }).data(formatData);

      const tooltipOptions = deepMix(
        {},
        {
          formatter: isPercent
            ? (datum: Datum) => ({
                name: datum[geometry.seriesField] || datum[xField],
                value: (Number(datum[yField]) * 100).toFixed(2) + '%',
              })
            : undefined,
        },
        tooltip
      );

      // 绘制图形
      drawSingleGeometry({
        chart: view,
        options: {
          xField,
          yField,
          tooltip: tooltipOptions,
          geometryOption: geometry,
        },
      });
    });
  return params;
}

/**
 * meta 配置
 * @param params
 */
export function meta(params: Params<DualAxesOptions>): Params<DualAxesOptions> {
  const { chart, options } = params;
  const { xAxis, yAxis, xField, yField } = options;

  scale({
    [xField]: xAxis,
    [yField[0]]: yAxis[0],
  })(deepMix({}, params, { chart: findViewById(chart, LEFT_AXES_VIEW) }));

  scale({
    [xField]: xAxis,
    [yField[1]]: yAxis[1],
  })(deepMix({}, params, { chart: findViewById(chart, RIGHT_AXES_VIEW) }));

  return params;
}

/**
 * axis 配置
 * @param params
 */
export function axis(params: Params<DualAxesOptions>): Params<DualAxesOptions> {
  const { chart, options } = params;
  const leftView = findViewById(chart, LEFT_AXES_VIEW);
  const rightView = findViewById(chart, RIGHT_AXES_VIEW);
  const { xField, yField, xAxis, yAxis } = options;

  // 固定位置
  if (xAxis) {
    deepMix(xAxis, { position: 'bottom' }); // 直接修改到 xAxis 中
  }

  if (yAxis[0]) {
    yAxis[0] = deepMix({}, yAxis[0], { position: 'left' });
  }

  // 隐藏右轴 grid，留到 g2 解决
  if (yAxis[1]) {
    yAxis[1] = deepMix({}, yAxis[1], { position: 'right', grid: null });
  }

  chart.axis(xField, false);
  chart.axis(yField[0], false);
  chart.axis(yField[1], false);

  // 左 View
  leftView.axis(xField, xAxis);
  leftView.axis(yField[0], yAxis[0]);

  // 右 Y 轴
  rightView.axis(xField, false);
  rightView.axis(yField[1], yAxis[1]);

  return params;
}

/**
 * tooltip 配置
 * @param params
 */
export function tooltip(params: Params<DualAxesOptions>): Params<DualAxesOptions> {
  const { chart, options } = params;
  const { tooltip } = options;
  const leftView = findViewById(chart, LEFT_AXES_VIEW);
  const rightView = findViewById(chart, RIGHT_AXES_VIEW);
  if (tooltip !== undefined) {
    chart.tooltip(tooltip);
    // 在 view 上添加 tooltip，使得 shared 和 interaction active-region 起作用
    // view 应该继承 chart 里的 shared，但是从表现看来，继承有点问题
    leftView.tooltip({
      shared: true,
    });
    rightView.tooltip({
      shared: true,
    });
  }
  return params;
}

/**
 * interaction 配置
 * @param params
 */
export function interaction(params: Params<DualAxesOptions>): Params<DualAxesOptions> {
  const { chart } = params;

  commonInteraction(deepMix({}, params, { chart: findViewById(chart, LEFT_AXES_VIEW) }));
  commonInteraction(deepMix({}, params, { chart: findViewById(chart, RIGHT_AXES_VIEW) }));

  return params;
}

/**
 * theme
 * @param params
 */
export function theme(params: Params<DualAxesOptions>): Params<DualAxesOptions> {
  const { chart } = params;

  commonTheme(deepMix({}, params, { chart: findViewById(chart, LEFT_AXES_VIEW) }));
  commonTheme(deepMix({}, params, { chart: findViewById(chart, RIGHT_AXES_VIEW) }));

  return params;
}

export function animation(params: Params<DualAxesOptions>): Params<DualAxesOptions> {
  const { chart } = params;

  commonAnimation(deepMix({}, params, { chart: findViewById(chart, LEFT_AXES_VIEW) }));
  commonAnimation(deepMix({}, params, { chart: findViewById(chart, RIGHT_AXES_VIEW) }));

  return params;
}

/**
 * legend 配置
 * 使用 custom，便于和类似于分组柱状图-单折线图的逻辑统一
 * @param params
 */
export function legend(params: Params<DualAxesOptions>): Params<DualAxesOptions> {
  const { chart, options } = params;
  const { legend, geometryOptions, yField } = options;
  const leftView = findViewById(chart, LEFT_AXES_VIEW);
  const rightView = findViewById(chart, RIGHT_AXES_VIEW);

  if (legend === false) {
    chart.legend(false);
  } else if (isObject(legend) && legend.custom === true) {
    chart.legend(legend);
  } else {
    // 均使用自定义图例
    chart.once('beforepaint', () => {
      const leftItems = getViewLegendItems({
        view: leftView,
        geometryOption: geometryOptions[0],
        yField: yField[0],
        legend,
      });

      const rightItems = getViewLegendItems({
        view: rightView,
        geometryOption: geometryOptions[1],
        yField: yField[1],
        legend,
      });

      chart.legend(
        deepMix({}, legend, {
          custom: true,
          // todo 修改类型定义
          // @ts-ignore
          items: leftItems.concat(rightItems),
        })
      );
    });

    // 自定义图例交互
    chart.on('legend-item:click', (evt) => {
      const delegateObject = evt.gEvent.delegateObject;
      if (delegateObject && delegateObject.item) {
        const { value: field, isGeometry, viewId } = delegateObject.item;
        // geometry 的时候，直接使用 view.changeVisible
        if (isGeometry) {
          const idx = findIndex(yField, (yF: string) => yF === field);
          if (idx > -1) {
            const geometries = get(findViewById(chart, viewId), 'geometries');
            each(geometries, (g) => {
              g.changeVisible(!delegateObject.item.unchecked);
            });
          }
          return;
        }

        // 分组柱线图
        each(chart.views, (view) => {
          // 单折柱图
          const groupScale = view.getGroupScales();
          each(groupScale, (scale: Scale) => {
            if (scale.values && scale.values.indexOf(field) > -1) {
              view.filter(scale.field, (value) => !delegateObject.item.unchecked || value !== field);
            }
          });
          chart.render(true);
        });
      }
    });
  }

  return params;
}

/**
 * 双折线图适配器
 * @param chart
 * @param options
 */
export function adaptor(params: Params<DualAxesOptions>): Params<DualAxesOptions> {
  // transformOptions 一定在最前面处理
  return flow(transformOptions, geometry, meta, axis, tooltip, interaction, theme, animation, legend)(params);
}
