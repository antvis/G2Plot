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
  const { percent, color, liquidStyle } = options;

  const data = [{ percent, type: CAT_VALUE }];

  chart.data(data);

  chart.scale({
    percent: {
      min: 0,
      max: 1,
    },
  });

  const geometry = chart.interval().position('type*percent').shape('liquid-fill-gauge');

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
 * 折线图适配器
 * @param chart
 * @param options
 */
export function adaptor(params: Params<LiquidOptions>) {
  // flow 的方式处理所有的配置到 G2 API
  return flow(geometry, statistic, scale({}), animation, theme, interaction)(params);
}
