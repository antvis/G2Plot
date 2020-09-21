import { Params } from '../../core/adaptor';
import { tooltip, interaction, animation, theme, scale, state } from '../../adaptor/common';
import { flow, findGeometry } from '../../utils';
import { WordCloudOptions } from './types';
import { transform } from './utils';

/**
 * geometry 配置处理
 * @param params
 */
function geometry(params: Params<WordCloudOptions>): Params<WordCloudOptions> {
  const { chart } = params;
  const data = transform(params);

  chart.data(data);
  chart.point().position('x*y').shape('word-cloud');

  return params;
}

/**
 * color 配置处理
 * @param params
 */
function color(params: Params<WordCloudOptions>): Params<WordCloudOptions> {
  const { chart, options } = params;
  const { wordField, color } = options;
  const geometry = findGeometry(chart, 'point');

  geometry.color(wordField, color);

  return params;
}

/**
 * meta 配置
 * @param params
 */
function meta(params: Params<WordCloudOptions>): Params<WordCloudOptions> {
  return flow(
    scale({
      x: { nice: false },
      y: { nice: false },
    })
  )(params);
}

/**
 * coord 配置
 * @param params
 */
function coord(params: Params<WordCloudOptions>): Params<WordCloudOptions> {
  const { chart } = params;

  chart.coordinate().reflect('y');

  return params;
}

/**
 * axis 配置
 * 词云图不显示轴信息
 * @param params
 */
function axis(params: Params<WordCloudOptions>): Params<WordCloudOptions> {
  const { chart } = params;

  chart.axis(false);

  return params;
}

/**
 * label 配置
 * 词云图不显示 label 信息
 * @param params
 */
function label(params: Params<WordCloudOptions>): Params<WordCloudOptions> {
  const { chart } = params;
  const geometry = findGeometry(chart, 'point');

  geometry.label(false);

  return params;
}

/**
 * legend 配置
 * 词云图不显示 legend 信息
 * @param params
 */
function legend(params: Params<WordCloudOptions>): Params<WordCloudOptions> {
  const { chart } = params;

  chart.legend(false);

  return params;
}

/**
 * 词云图适配器
 * @param chart
 * @param options
 */
export function adaptor(params: Params<WordCloudOptions>) {
  // flow 的方式处理所有的配置到 G2 API
  flow(geometry, meta, coord, axis, label, color, legend, tooltip, interaction, animation, theme, state)(params);
}
