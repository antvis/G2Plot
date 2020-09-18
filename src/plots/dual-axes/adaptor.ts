import { deepMix, each, findIndex } from '@antv/util';
import { Scale } from '@antv/g2/lib/dependents';
import { theme, animation, scale } from '../../adaptor/common';
import { Interaction } from '../../types/interaction';
import { Params } from '../../core/adaptor';
import { flow } from '../../utils';
import { getOption } from './util/option';
import { getViewLegendItems } from './util/legend';
import { drawSingleGeometry } from './util/geometry';
import { DualAxesOption } from './types';

/**
 * 获取默认参数设置
 * 双轴图无法使用公共的 getDefaultOption, 因为双轴图存在[lineConfig, lineConfig] 这样的数据，需要根据传入的 option，生成不同的 defaultOption,
 * 并且 deepmix 无法 mix 数组类型数据，因此需要做一次参数的后转换
 * 这个函数针对 yAxis 和 geometryOptions
 * @param params
 */
export function transformOptions(params: Params<DualAxesOption>): Params<DualAxesOption> {
  return deepMix({}, params, {
    options: getOption(params.options),
  });
}

/**
 * 绘制图形
 * @param params
 */
function geometry(params: Params<DualAxesOption>): Params<DualAxesOption> {
  const { chart, options } = params;
  const { xField, yField, geometryOptions, data } = options;

  const PADDING = [20, 40];

  // 绘制左轴对应数据
  const leftView = chart
    .createView({
      padding: PADDING,
    })
    .data(data[0]);

  // 绘制右轴对应数据
  const rightView = chart
    .createView({
      padding: PADDING,
    })
    .data(data[1]);

  // TOFIX: g2 更新 updateOptions 未重新渲染，待 g2 修复后验证, 暂时先写死 PADDING
  // chart.on('afterpaint', ()=>{
  //   const { autoPadding: leftAutoPadding } = leftView;
  //   const { autoPadding: rightAutoPadding } = rightView;

  //   const maxPaddingX = Math.max(leftAutoPadding[1], leftAutoPadding[3], rightAutoPadding[1], rightAutoPadding[3]);
  //   const maxPaddingY = Math.max(leftAutoPadding[0], leftAutoPadding[2], rightAutoPadding[0], rightAutoPadding[2]);

  //   const padding = [maxPaddingY, maxPaddingX];

  //   chart.updateOptions({
  //     views: [{
  //       padding,
  //     }, {
  //       padding,
  //     }]
  //   })

  // });

  // 左轴图形
  drawSingleGeometry({
    chart: leftView,
    options: {
      xField,
      yField: yField[0],
      geometryOption: geometryOptions[0],
    },
  });

  // 右轴图形
  drawSingleGeometry({
    chart: rightView,
    options: {
      xField,
      yField: yField[1],
      geometryOption: geometryOptions[1],
    },
  });
  return params;
}

/**
 * meta 配置
 * @param params
 */
export function meta(params: Params<DualAxesOption>): Params<DualAxesOption> {
  const { options } = params;
  const { xAxis, yAxis, xField, yField } = options;

  return flow(
    scale({
      [xField]: xAxis,
      [yField[0]]: yAxis[0],
      [yField[1]]: yAxis[1],
    })
  )(params);
}

/**
 * axis 配置
 * @param params
 */
export function axis(params: Params<DualAxesOption>): Params<DualAxesOption> {
  const { chart, options } = params;
  const [leftView, rightView] = chart.views;
  const { xField, yField, yAxis } = options;

  let { xAxis } = options;

  // 固定位置
  if (xAxis) {
    xAxis = deepMix({}, xAxis, { position: 'bottom' });
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
  leftView.axis(yField[1], false);

  // 右 Y 轴
  rightView.axis(xField, false);
  rightView.axis(yField[0], false);
  rightView.axis(yField[1], yAxis[1]);

  return params;
}

/**
 * tooltip 配置
 * @param params
 */
export function tooltip(params: Params<DualAxesOption>): Params<DualAxesOption> {
  const { chart, options } = params;
  const { tooltip } = options;
  const [leftView, rightView] = chart.views;
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
export function interaction(params: Params<DualAxesOption>): Params<DualAxesOption> {
  const { chart, options } = params;
  const { interactions } = options;
  const [leftView, rightView] = chart.views;
  each(interactions, (i: Interaction) => {
    if (i.enable === false) {
      leftView.removeInteraction(i.type);
      rightView.removeInteraction(i.type);
    } else {
      leftView.interaction(i.type, i.cfg || {});
      rightView.interaction(i.type, i.cfg || {});
    }
  });
  return params;
}

/**
 * legend 配置
 * 使用 custom，便于和类似于分组柱状图-单折线图的逻辑统一
 * @param params
 */
export function legend(params: Params<DualAxesOption>): Params<DualAxesOption> {
  const { chart, options } = params;
  const { legend, geometryOptions, yField } = options;
  const [leftView, rightView] = chart.views;

  if (legend === false) {
    chart.legend(false);
  } else {
    // 存在单折线图或多折线图时，使用自定义图例
    // let customItem = getLegendItems(chart, );

    chart.on('beforepaint', () => {
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

    // // 自定义图例交互
    chart.on('legend-item:click', (evt) => {
      const delegateObject = evt.gEvent.delegateObject;
      if (delegateObject && delegateObject.item) {
        const field = delegateObject.item.value;
        const idx = findIndex(yField, (yF) => yF === field);
        if (idx > -1) {
          // 单折柱图
          chart.views[idx].filter(field, () => !delegateObject.item.unchecked);
          chart.views[idx].render(true);
          return;
        }

        // 分组柱线图
        each(chart.views, (view) => {
          // 单折柱图
          const groupScale = view.getGroupScales();
          each(groupScale, (scale: Scale) => {
            if (scale.values && scale.values.indexOf(field) > -1) {
              view.filter(scale.field, (value) => !delegateObject.item.unchecked || value !== field);
              view.render(true);
            }
          });
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
export function adaptor(params: Params<DualAxesOption>): Params<DualAxesOption> {
  // flow 的方式处理所有的配置到 G2 API
  return flow(transformOptions, geometry, meta, axis, tooltip, interaction, theme, animation, legend)(params);
}
