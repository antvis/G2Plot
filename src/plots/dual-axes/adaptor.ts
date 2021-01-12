import { each, findIndex, get, find, isObject, every } from '@antv/util';
import { Scale, Types } from '@antv/g2';
import {
  theme,
  animation as commonAnimation,
  scale,
  interaction as commonInteraction,
  annotation as commonAnnotation,
  limitInPlot as commonLimitInPlot,
} from '../../adaptor/common';
import { percent } from '../../utils/transform/percent';
import { Params } from '../../core/adaptor';
import { Datum } from '../../types';
import { flow, deepAssign } from '../../utils';
import { findViewById } from '../../utils/view';
import { isColumn, getYAxisWithDefault, getGeometryOption, transformObjectToArray } from './util/option';
import { getViewLegendItems } from './util/legend';
import { drawSingleGeometry } from './util/geometry';
import { DualAxesOptions, AxisType, DualAxesGeometry } from './types';
import { LEFT_AXES_VIEW, RIGHT_AXES_VIEW } from './constant';

/**
 * transformOptions，双轴图整体的取参逻辑如下
 * 1. get index getOptions: 对应的是默认的图表参数，如 appendPadding，syncView 等
 * 2. get adpator transformOption: 对应的是双轴图的默认参数，deepAssign 优先级从低到高如下
 *    2.1 defaultoption，如 tooltip，legend
 *    2.2 用户填写 options
 *    2.3 根据用户填写的 options 补充的数组型 options，如 yaxis，GeometryOption，因为 deepAssign 无法 assign 数组
 *
 * @param params
 */
export function transformOptions(params: Params<DualAxesOptions>): Params<DualAxesOptions> {
  const { options } = params;
  const { geometryOptions = [], xField, yField } = options;
  const allLine = every(
    geometryOptions,
    ({ geometry }) => geometry === DualAxesGeometry.Line || geometry === undefined
  );
  return deepAssign(
    {},
    {
      options: {
        geometryOptions: [],
        meta: {
          [xField]: {
            // 默认为 cat 类型
            type: 'cat',
            // x 轴一定是同步 scale 的
            sync: true,
            // 如果有没有柱子，则
            range: allLine ? [0, 1] : undefined,
          },
        },
        tooltip: {
          showMarkers: allLine,
          // 存在柱状图，不显示 crosshairs
          showCrosshairs: allLine,
          shared: true,
          crosshairs: {
            type: 'x',
          },
        },
        interactions: !allLine
          ? [{ type: 'legend-visible-filter' }, { type: 'active-region' }]
          : [{ type: 'legend-visible-filter' }],
        legend: {
          position: 'top-left',
        },
      },
    },
    params,
    {
      options: {
        // yAxis
        yAxis: transformObjectToArray(yField, options.yAxis),
        // geometryOptions
        geometryOptions: [
          getGeometryOption(xField, yField[0], geometryOptions[0]),
          getGeometryOption(xField, yField[1], geometryOptions[1]),
        ],
        // annotations
        annotations: transformObjectToArray(yField, options.annotations),
      },
    }
  );
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

      const tooltipOptions = isPercent
        ? {
            formatter: (datum: Datum) => ({
              name: datum[geometry.seriesField] || yField,
              value: (Number(datum[yField]) * 100).toFixed(2) + '%',
            }),
            ...tooltip,
          }
        : tooltip;

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

export function color(params: Params<DualAxesOptions>): Params<DualAxesOptions> {
  const { chart, options } = params;
  const { geometryOptions } = options;
  const themeColor = chart.getTheme()?.colors10 || [];

  let start = 0;
  /* 为 geometry 添加默认 color。
   * 1. 若 geometryOptions 存在 color，则在 drawGeometry 时已处理
   * 2. 若 不存在 color，获取 Geometry group scales个数，在 theme color 10 中提取
   * 3. 为防止 group 过多导致右色板无值或值很少，右 view 面板在依次提取剩下的 N 个 后再 concat 一次 themeColor
   * 4. 为简便获取 Geometry group scales个数，在绘制完后再执行 color
   * 5. 考虑之后将不同 view 使用同一个色板的需求沉淀到 g2
   */
  chart.once('beforepaint', () => {
    each(geometryOptions, (geometryOption, index) => {
      const view = findViewById(chart, index === 0 ? LEFT_AXES_VIEW : RIGHT_AXES_VIEW);
      if (geometryOption.color) return;
      const groupScale = view.getGroupScales();
      const count = get(groupScale, [0, 'values', 'length'], 1);
      const color = themeColor.slice(start, start + count).concat(index === 0 ? [] : themeColor);
      view.geometries.forEach((geometry) => {
        if (geometryOption.seriesField) {
          geometry.color(geometryOption.seriesField, color);
        } else {
          geometry.color(color[0]);
        }
      });
      start += count;
    });
    chart.render(true);
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
  })(deepAssign({}, params, { chart: findViewById(chart, LEFT_AXES_VIEW) }));

  scale({
    [xField]: xAxis,
    [yField[1]]: yAxis[1],
  })(deepAssign({}, params, { chart: findViewById(chart, RIGHT_AXES_VIEW) }));

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

  chart.axis(xField, false);
  chart.axis(yField[0], false);
  chart.axis(yField[1], false);

  // 左 View
  leftView.axis(xField, xAxis);
  leftView.axis(yField[0], getYAxisWithDefault(yAxis[0], AxisType.Left));

  // 右 Y 轴
  rightView.axis(xField, false);
  rightView.axis(yField[1], getYAxisWithDefault(yAxis[1], AxisType.Right));

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
  // tooltip 经过 getDefaultOption 处理后，一定不为 undefined
  chart.tooltip(tooltip);
  // 在 view 上添加 tooltip，使得 shared 和 interaction active-region 起作用
  // view 应该继承 chart 里的 shared，但是从表现看来，继承有点问题
  leftView.tooltip({
    shared: true,
  });
  rightView.tooltip({
    shared: true,
  });
  return params;
}

/**
 * interaction 配置
 * @param params
 */
export function interaction(params: Params<DualAxesOptions>): Params<DualAxesOptions> {
  const { chart } = params;

  commonInteraction(deepAssign({}, params, { chart: findViewById(chart, LEFT_AXES_VIEW) }));
  commonInteraction(deepAssign({}, params, { chart: findViewById(chart, RIGHT_AXES_VIEW) }));

  return params;
}

/**
 * annotation 配置
 * @param params
 */
export function annotation(params: Params<DualAxesOptions>): Params<DualAxesOptions> {
  const { chart, options } = params;
  const { annotations } = options;

  const a1 = get(annotations, [0]);
  const a2 = get(annotations, [1]);

  commonAnnotation(a1)(
    deepAssign({}, params, {
      chart: findViewById(chart, LEFT_AXES_VIEW),
      options: {
        annotations: a1,
      },
    })
  );
  commonAnnotation(a2)(
    deepAssign({}, params, {
      chart: findViewById(chart, RIGHT_AXES_VIEW),
      options: {
        annotations: a2,
      },
    })
  );
  return params;
}

export function animation(params: Params<DualAxesOptions>): Params<DualAxesOptions> {
  const { chart } = params;

  commonAnimation(deepAssign({}, params, { chart: findViewById(chart, LEFT_AXES_VIEW) }));
  commonAnimation(deepAssign({}, params, { chart: findViewById(chart, RIGHT_AXES_VIEW) }));

  return params;
}

/**
 * 双轴图 limitInPlot
 * @param params
 */
export function limitInPlot(params: Params<DualAxesOptions>): Params<DualAxesOptions> {
  const { chart, options } = params;
  const { yAxis } = options;

  commonLimitInPlot(
    deepAssign({}, params, {
      chart: findViewById(chart, LEFT_AXES_VIEW),
      options: {
        yAxis: yAxis[0],
      },
    })
  );

  commonLimitInPlot(
    deepAssign({}, params, {
      chart: findViewById(chart, RIGHT_AXES_VIEW),
      options: {
        yAxis: yAxis[1],
      },
    })
  );

  return params;
}

/**
 * legend 配置
 * 使用 custom，便于和类似于分组柱状图-单折线图的逻辑统一
 * @param params
 */
export function legend(params: Params<DualAxesOptions>): Params<DualAxesOptions> {
  const { chart, options } = params;
  const { legend, geometryOptions, yField, data } = options;
  const leftView = findViewById(chart, LEFT_AXES_VIEW);
  const rightView = findViewById(chart, RIGHT_AXES_VIEW);

  if (legend === false) {
    chart.legend(false);
  } else if (isObject(legend) && legend.custom === true) {
    chart.legend(legend);
  } else {
    // 均使用自定义图例
    chart.once('beforepaint', () => {
      const leftItems = data[0].length
        ? getViewLegendItems({
            view: leftView,
            geometryOption: geometryOptions[0],
            yField: yField[0],
            legend,
          })
        : [];

      const rightItems = data[1].length
        ? getViewLegendItems({
            view: rightView,
            geometryOption: geometryOptions[1],
            yField: yField[1],
            legend,
          })
        : [];

      chart.legend(
        deepAssign({}, legend, {
          custom: true,
          // todo 修改类型定义
          // @ts-ignore
          items: leftItems.concat(rightItems),
        })
      );
    });

    // 自定义图例交互
    chart.on('legend-item:click', (evt) => {
      const delegateObject = get(evt, 'gEvent.delegateObject', {});
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
        } else {
          const legendItem = get(chart.getController('legend'), 'option.items', []);
          // 分组柱线图
          each(chart.views, (view) => {
            // 单折柱图
            const groupScale = view.getGroupScales();
            each(groupScale, (scale: Scale) => {
              if (scale.values && scale.values.indexOf(field) > -1) {
                view.filter(scale.field, (value) => {
                  const curLegendItem: Types.LegendItem = find(
                    legendItem,
                    (item: Types.LegendItem) => item.value === value
                  );
                  // 使用 legend 中的 unchecked 来判断，使得支持关闭多个图例
                  return !curLegendItem.unchecked;
                });
              }
            });
            chart.render(true);
          });
        }
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
  // transformOptions 一定在最前面处理；color legend 使用了 beforepaint，为便于理解放在最后面
  return flow(
    transformOptions,
    geometry,
    meta,
    axis,
    limitInPlot,
    tooltip,
    interaction,
    annotation,
    theme,
    animation,
    color,
    legend
  )(params);
}
