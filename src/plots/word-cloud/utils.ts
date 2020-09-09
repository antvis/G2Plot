import { View } from '@antv/g2';
import DataSet from '@antv/data-set';
import { isArray, isFunction, isNumber } from '@antv/util';
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
    size: getSize(chart),
    padding: padding,
    timeInterval,
    spiral,
    rotate: getRotate(options),
  } as any);

  return dv.rows;
}

/**
 * 获取最终的实际绘图尺寸：[width, height]
 * @param chart
 */
function getSize(chart: View) {
  const { width, height } = chart.viewBBox;
  const [top, right, bottom, left] = resolvePadding(chart);
  const result = [width - (left + right), height - (top + bottom)];

  return result;
}

/**
 * 根据图表的 padding 和 appendPadding 计算出图表的最终 padding
 * @param chart
 */
function resolvePadding(chart: View) {
  const padding = normalPadding(chart.padding);
  const appendPadding = normalPadding(chart.appendPadding);
  const top = padding[0] + appendPadding[0];
  const right = padding[1] + appendPadding[1];
  const bottom = padding[2] + appendPadding[2];
  const left = padding[3] + appendPadding[3];

  return [top, right, bottom, left];
}

/**
 * 把 padding 转换成统一的数组写法
 * @param padding
 */
function normalPadding(padding: number | number[] | 'auto'): [number, number, number, number] {
  if (isNumber(padding)) {
    return [padding, padding, padding, padding];
  }
  if (isArray(padding)) {
    const length = padding.length;

    if (length === 1) {
      return [padding[0], padding[0], padding[0], padding[0]];
    }
    if (length === 2) {
      return [padding[0], padding[1], padding[0], padding[1]];
    }
    if (length === 3) {
      return [padding[0], padding[1], padding[2], padding[1]];
    }
    if (length === 4) {
      return padding as [number, number, number, number];
    }
  }

  return [0, 0, 0, 0];
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
    return Math.ceil(Math.random() * (rotationSteps - 1)) * perSize * isHappen(rotateRatio);
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
