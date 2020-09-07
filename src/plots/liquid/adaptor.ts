import { isFunction } from '@antv/util';
import { interaction, animation, theme, scale } from '../../adaptor/common';
import { Params } from '../../core/adaptor';
import { flow } from '../../utils';
import { LiquidOptions } from './types';

const CAT_VALUE = 'liquid';

/**
 * geometry 处理
 * @param params
 */
function geometry(params: Params<LiquidOptions>): Params<LiquidOptions> {
  const { chart, options } = params;
  const { percent, color, liquidStyle, radius } = options;

  const data = [{ percent, type: CAT_VALUE }];

  chart.data(data);

  chart.scale({
    percent: {
      min: 0,
      max: 1,
    },
  });

  // @ts-ignore
  const geometry = chart.interval().position('type*percent').shape('liquid-fill-gauge');

  // 只能通过这样的方式，将 radius 传入到自定义 shape 中，最好是 Geometry 提供传入自定义数据的能力
  geometry.style({
    liquidRadius: radius,
  });

  // radius 放到 columnWidthRatio 中。
  // 保证横向的大小是根据  redius 生成的
  chart.theme({
    columnWidthRatio: radius,
  });

  if (color) {
    geometry.color('percent', color);
  }

  if (liquidStyle) {
    geometry.style('percent', (v: number) => {
      return isFunction(liquidStyle) ? liquidStyle(v) : liquidStyle;
    });
  }

  // 关闭组件
  chart.legend(false);
  chart.axis(false);
  chart.tooltip(false);

  return params;
}

/**
 * 统计指标文档
 * @param params
 */
function statistic(params: Params<LiquidOptions>): Params<LiquidOptions> {
  const { chart, options } = params;
  const { statistic, percent } = options;

  const { style, formatter } = statistic;

  // annotation
  chart.annotation().text({
    top: true,
    position: {
      type: CAT_VALUE,
      percent: 0.5,
    },
    content: isFunction(formatter) ? formatter(percent) : `${percent}`,
    style: isFunction(style) ? style(percent) : style,
  });

  return params;
}

/**
 * 水波图适配器
 * @param chart
 * @param options
 */
export function adaptor(params: Params<LiquidOptions>) {
  // flow 的方式处理所有的配置到 G2 API
  return flow(geometry, statistic, scale({}), animation, theme, interaction)(params);
}
