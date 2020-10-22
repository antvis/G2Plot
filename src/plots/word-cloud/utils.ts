import { Chart, View } from '@antv/g2';
import { isArray, isFunction, isNumber, isString } from '@antv/util';
import { Params } from '../../core/adaptor';
import { Datum } from '../../types';
import { log, LEVEL, getContainerSize } from '../../utils';
import { wordCloud } from '../../utils/transform/word-cloud';
import { Tag, Word, WordCloudOptions } from './types';

/**
 * 用 DataSet 转换词云图数据
 * @param params
 */
export function transform(params: Params<WordCloudOptions>): Tag[] {
  const { options } = params;
  const { data, imageMask, wordField, weightField, colorField, wordStyle, timeInterval } = options;
  if (!data || !data.length) {
    return [];
  }
  const { fontFamily, fontWeight, padding } = wordStyle;
  const arr = data.map((v) => v[weightField]) as number[];
  const range = [min(arr), max(arr)] as [number, number];

  // 校验
  if (!isString(wordField) || !isString(weightField)) {
    throw new TypeError('Invalid fields: must be an array with 2 strings (e.g. [ "text", "value" ])!');
  }

  // 变换出 text 和 value 字段
  const words = data.map(
    (datum: Datum): Word => ({
      text: datum[wordField],
      value: datum[weightField],
      color: datum[colorField],
      datum, // 存一下原始数据
    })
  );

  // 数据准备在外部做，wordCloud 单纯就是做布局
  return wordCloud(words, {
    imageMask: imageMask as HTMLImageElement,
    font: fontFamily,
    fontSize: getFontSize(options, range),
    fontWeight: fontWeight,
    // 图表宽高减去 padding 之后的宽高
    size: getSize(params as any),
    padding: padding,
    timeInterval,
    rotate: getRotate(options),
  });
}

/**
 * 获取最终的实际绘图尺寸：[width, height]
 * @param chart
 */
function getSize(params: Params<WordCloudOptions> & { chart: Chart }): [number, number] {
  const { chart, options } = params;
  const { autoFit = true } = options;
  let { width, height } = chart;

  // 由于词云图每个词语的坐标都是先通过 DataSet 根据图表宽高计算出来的，
  // 也就是说，如果一开始提供给 DataSet 的宽高信息和最终显示的宽高不相同，
  // 那么就会出现布局错乱的情况，所以这里处理的目的就是让一开始提供给 DataSet 的
  // 宽高信息与最终显示的宽高信息相同，避免显示错乱。
  if (autoFit) {
    const containerSize = getContainerSize(chart.ele);
    width = containerSize.width || 0;
    height = containerSize.height || 0;
  }

  const [top, right, bottom, left] = resolvePadding(chart);
  const result = [width - (left + right), height - (top + bottom)];

  return result as [number, number];
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

/**
 * 处理 imageMask 可能为 url 字符串的情况
 * @param  {HTMLImageElement | string} img
 * @return {Promise}
 */
export function processImageMask(img: HTMLImageElement | string): Promise<HTMLImageElement> {
  return new Promise((res, rej) => {
    if (img instanceof HTMLImageElement) {
      res(img);
      return;
    }
    if (isString(img)) {
      const image = new Image();
      image.crossOrigin = 'anonymous';
      image.src = img;
      image.onload = () => {
        res(image);
      };
      image.onerror = () => {
        log(LEVEL.ERROR, false, 'image %s load failed !!!', img);
        rej();
      };
      return;
    }
    log(LEVEL.WARN, img === undefined, 'the type of imageMask option must be String or HTMLImageElement.');
    rej();
  });
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

/**
 * 传入一个元素为数字的数组，
 * 返回该数组中值最小的数字。
 * @param numbers
 */
function min(numbers: number[]) {
  return Math.min(...numbers);
}

/**
 * 传入一个元素为数字的数组，
 * 返回该数组中值最大的数字。
 * @param numbers
 */
function max(numbers: number[]) {
  return Math.max(...numbers);
}
