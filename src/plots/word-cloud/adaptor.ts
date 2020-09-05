import DataSet from '@antv/data-set';
import { isArray, isFunction } from '@antv/util';
import { Params } from '../../core/adaptor';
import { WordCloudOptions } from './types';
import { flow, log, LEVEL, findGeometry } from '../../utils';
import { tooltip, interaction, animation, theme, scale } from '../../adaptor/common';

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
  const { seriesField, wordField, color } = options;
  const geometry = findGeometry(chart, 'point');

  geometry.color(seriesField || wordField, color);

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

  chart.axis('x', false);
  chart.axis('y', false);

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

function transform(params: Params<WordCloudOptions>) {
  const { chart, options } = params;
  const { data, imageMask, wordField, weightField, wordStyle, timeInterval, spiral } = options;
  const { fontFamily, padding } = wordStyle || {};
  const dv = new DataSet.View().source(data);
  const range = dv.range(weightField);

  // TODO: g2 需添加 fontWeight 选项
  // TODO: 去掉 any , 需 g2 修改类型信息
  dv.transform({
    type: 'tag-cloud',
    fields: [wordField, weightField],
    imageMask: getImageMask(imageMask),
    font: fontFamily as any,
    fontSize: getFontSize(options, range) as any,
    size: [(chart as any).width, (chart as any).height],
    padding: padding as any,
    timeInterval,
    spiral,
    rotate: getRotate(options) as any,
  });

  return dv.rows;
}

function getImageMask(img: HTMLImageElement) {
  return img;
}

function getFontSize(options: WordCloudOptions, range: [number, number]) {
  const { fontSize = [10, 60] } = options.wordStyle || {};
  const [min, max] = range;
  if (isFunction(fontSize)) {
    return fontSize;
  }
  if (isArray(fontSize)) {
    const [fMin, fMax] = fontSize;
    return function fontSize({ value }) {
      return ((fMax - fMin) / (max - min)) * (value - min) + fMin;
    };
  }
  return fontSize;
}

function getRotate(options: WordCloudOptions) {
  const { rotateRatio, rotation, rotationSteps } = resolveRotate(options);
  const min = rotation[0];
  const max = rotation[1];
  // 等于 1 时不旋转，所以把每份大小设为 0
  const perSize = rotationSteps === 1 ? 0 : (max - min) / (rotationSteps - 1);
  return function rotate() {
    return ~~(Math.random() * rotationSteps) * perSize * probability(rotateRatio);
  };
}

// 确保值在要求范围内
function resolveRotate(options: WordCloudOptions) {
  let { rotation = [0, 90], rotationSteps = 2, rotateRatio = 0.5 } = options.wordStyle || {};
  if (!isArray(rotation)) {
    log(LEVEL.WARN, false, 'the rotation option must be an Array in wordStyle option.');
    rotation = [0, 90];
  }
  if (rotationSteps === 0) {
    log(LEVEL.WARN, false, 'the rotationSteps option must be greater than or equal to 1.');
    rotationSteps = 1;
  }
  if (rotateRatio < 0) {
    log(LEVEL.WARN, false, 'the rotateRatio option must be greater than or equal to 0 and less than or equal to 1.');
    rotateRatio = 0;
  }
  if (rotateRatio > 1) {
    log(LEVEL.WARN, false, 'the rotateRatio option must be greater than or equal to 0 and less than or equal to 1.');
    rotateRatio = 1;
  }
  return {
    rotation,
    rotationSteps,
    rotateRatio,
  };
}

// 根据传入的数字推断是否发生，返回 1 表示发生，0 表示未发生
function probability(n: number): 1 | 0 {
  return Math.random() < n ? 1 : 0;
}

/**
 * 词云图适配器
 * @param chart
 * @param options
 */
export function adaptor(params: Params<WordCloudOptions>) {
  // flow 的方式处理所有的配置到 G2 API
  flow<Params<WordCloudOptions>>(
    geometry,
    meta,
    coord,
    axis,
    label,
    color,
    legend,
    tooltip,
    interaction,
    animation,
    theme
  )(params);
}
