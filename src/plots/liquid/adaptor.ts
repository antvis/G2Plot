import { Geometry } from '@antv/g2';
import { get, isNil } from '@antv/util';
import { interaction, animation, theme, scale, pattern } from '../../adaptor/common';
import { Params } from '../../core/adaptor';
import { flow, deepAssign, renderStatistic } from '../../utils';
import { interval } from '../../adaptor/geometries';
import { LiquidOptions, CustomInfo } from './types';
import { getLiquidData } from './utils';

/**
 * geometry 处理
 * @param params
 */
function geometry(params: Params<LiquidOptions>): Params<LiquidOptions> {
  const { chart, options } = params;
  const { percent, liquidStyle, radius, outline, wave, shape, animation } = options;

  chart.scale({
    percent: {
      min: 0,
      max: 1,
    },
  });

  chart.data(getLiquidData(percent));

  const color = options.color || chart.getTheme().defaultColor;

  const p = deepAssign({}, params, {
    options: {
      xField: 'type',
      yField: 'percent',
      // radius 放到 columnWidthRatio 中。
      // 保证横向的大小是根据  radius 生成的
      widthRatio: radius,
      interval: {
        color,
        style: liquidStyle,
        shape: 'liquid-fill-gauge',
      },
    },
  });
  const { ext } = interval(p);
  const geometry = ext.geometry as Geometry;
  const { background } = chart.getTheme();
  const customInfo: CustomInfo = {
    radius,
    outline,
    wave,
    shape,
    background,
    animation,
  };

  // 将 radius 传入到自定义 shape 中
  geometry.customInfo(customInfo);

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
export function statistic(params: Params<LiquidOptions>, updated?: boolean): Params<LiquidOptions> {
  const { chart, options } = params;
  const { statistic, percent, meta } = options;

  // 先清空标注，再重新渲染
  chart.getController('annotation').clear(true);

  const metaFormatter = get(meta, ['percent', 'formatter']) || ((v) => `${(v * 100).toFixed(2)}%`);
  let contentOpt = statistic.content;
  if (contentOpt) {
    contentOpt = deepAssign({}, contentOpt, {
      content: !isNil(contentOpt.content) ? contentOpt.content : metaFormatter(percent),
    });
  }

  renderStatistic(chart, { statistic: { ...statistic, content: contentOpt }, plotType: 'liquid' }, { percent });

  if (updated) {
    chart.render(true);
  }

  return params;
}

/**
 * 水波图适配器
 * @param chart
 * @param options
 */
export function adaptor(params: Params<LiquidOptions>) {
  // flow 的方式处理所有的配置到 G2 API (主题前置，会影响绘制的取色)
  return flow(theme, pattern('liquidStyle'), geometry, statistic, scale({}), animation, interaction)(params);
}
