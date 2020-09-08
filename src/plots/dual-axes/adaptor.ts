import { deepMix, map, some } from '@antv/util';
import { theme, animation, scale } from '../../adaptor/common';
import { Interaction } from '../../types/interaction';
import { Params } from '../../core/adaptor';
import { flow } from '../../utils';
import { getOption } from './util/option';
import { drawSingleGeometry } from './util/geometry';
import { DualAxesOption, GeometryConfig } from './types';

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

  // TOFIX: 动态适配坐标轴宽度
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

  // 左轴图形
  drawSingleGeometry({
    chart: leftView,
    options: {
      xField,
      yField: yField[0],
      geometryConfig: geometryOptions[0],
    },
  });

  // 右轴图形
  drawSingleGeometry({
    chart: rightView,
    options: {
      xField,
      yField: yField[1],
      geometryConfig: geometryOptions[1],
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
 * @param params
 */
export function legend(params: Params<DualAxesOption>): Params<DualAxesOption> {
  const { chart, options } = params;
  const { legend, geometryOptions, yField } = options;

  if (legend === false) {
    chart.legend(false);
  } else if (!legend && !some(geometryOptions, (opt) => !!opt.seriesField)) {
    // 没有任何分类字段的时候，内置自定义图例
    chart.legend({
      custom: true,
      // todo 修改类型定义
      // @ts-ignore
      items: map(geometryOptions, (opt: GeometryConfig, idx: number) => {
        const defaultColor = chart.getTheme().defaultColor;
        const geometryType = opt.geometry;
        const marker =
          geometryType === 'line'
            ? { symbol: 'line', style: { stroke: defaultColor, lineWidth: 2 } }
            : { symbol: 'square' };
        return {
          value: yField[idx],
          name: geometryType,
          marker,
        };
      }),
    });

    // 自定义图例交互
    chart.on('legend-item:click', (evt) => {
      const delegateObject = evt.gEvent.delegateObject;
      if (delegateObject && delegateObject.item) {
        const idx = delegateObject.index;
        const view = chart.views[idx];
        const field = yField[idx];
        if (view.getScaleByField(field)) {
          view.filter(field, () => !delegateObject.item.unchecked);
        }
        view.render(true);
      }
    });
  } else if (legend) {
    chart.legend(legend);
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
