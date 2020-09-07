import DataSet from '@antv/data-set';
import { isArray, isFunction } from '@antv/util';
import { Params } from '../../core/adaptor';
import { log, LEVEL } from '../../utils';
import { WordCloudOptions } from './types';

/**
 * 用 DataSet 转换词云图数据
 * @param params
 */
export function transform(params: Params<WordCloudOptions>) {
  const { chart, options } = params;
  const { data, imageMask, wordField, weightField, wordStyle, timeInterval, spiral } = options;
  const { fontFamily, fontWeight, padding } = wordStyle;
  const dv = new DataSet.View().source(data);
  const range = dv.range(weightField);

  // TODO: 去掉 any , 需 DataSet 修改类型信息
  dv.transform({
    type: 'tag-cloud',
    fields: [wordField, weightField],
    imageMask: getImageMask(imageMask),
    font: fontFamily,
    fontSize: getFontSize(options, range),
    fontWeight: fontWeight,
    // 图表宽高减去 padding 之后的宽高
    size: [chart.coordinateBBox.width, chart.coordinateBBox.height],
    padding: padding,
    timeInterval,
    spiral,
    rotate: getRotate(options),
  } as any);

  return dv.rows;
}

function getImageMask(img: HTMLImageElement) {
  return img;
}

/**
 * 把用户提供的 fontSize 值转换成符合 DataSet 要求的值
 * @param options
 * @param range
 */
function getFontSize(options: WordCloudOptions, range: [number, number]) {
  const { fontSize } = options.wordStyle;
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

/**
 * 把用户提供的关于旋转角度的字段值转换成符合 DataSet 要求的值
 * @param options
 */
function getRotate(options: WordCloudOptions) {
  const { rotateRatio, rotation, rotationSteps } = resolveRotate(options);
  const min = rotation[0];
  const max = rotation[1];
  // 等于 1 时不旋转，所以把每份大小设为 0
  const perSize = rotationSteps === 1 ? 0 : (max - min) / (rotationSteps - 1);
  return function rotate() {
    return Math.floor(Math.random() * rotationSteps) * perSize * isHappen(rotateRatio);
  };
}

/**
 * 根据传入的数字推断是否发生，返回 1 表示发生，0 表示未发生
 * @param n 概率值，可以是从 0 到 1 的数字
 */
function isHappen(n: number): 1 | 0 {
  return Math.random() < n ? 1 : 0;
}

/**
 * 确保值在要求范围内
 * @param options
 */
function resolveRotate(options: WordCloudOptions) {
  let { rotation, rotationSteps, rotateRatio } = options.wordStyle;
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
