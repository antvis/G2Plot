import { Chart } from '@antv/g2';
import { Types } from '@antv/g2';
import { isArray, isFunction, isString } from '@antv/util';
import { normalPadding } from '../../utils/padding';
import { Params } from '../../core/adaptor';
import { Datum } from '../../types';
import { log, LEVEL, getContainerSize } from '../../utils';
import { functor, wordCloud } from '../../utils/transform/word-cloud';
import { Tag, Word, WordCloudOptions, WordStyle } from './types';

/**
 * 用 DataSet 转换词云图数据
 * @param params
 */
export function transform(params: Params<WordCloudOptions>): Tag[] {
  const { options: rawOptions, chart } = params;
  const { width, height, padding: chartPadding, appendPadding, ele } = chart as Chart;
  const {
    data,
    imageMask,
    wordField,
    weightField,
    colorField,
    wordStyle,
    timeInterval,
    random,
    spiral,
    autoFit = true,
    placementStrategy,
  } = rawOptions;
  if (!data || !data.length) {
    return [];
  }
  const { fontFamily, fontWeight, padding, fontSize } = wordStyle;
  const arr = getSingleKeyValues(data, weightField);
  const range = [min(arr), max(arr)] as [number, number];

  // 变换出 text 和 value 字段
  const words = data.map(
    (datum: Datum): Word => ({
      text: datum[wordField],
      value: datum[weightField],
      color: datum[colorField],
      datum, // 存一下原始数据
    })
  );

  const options = {
    imageMask: imageMask as HTMLImageElement,
    font: fontFamily,
    fontSize: getFontSizeMapping(fontSize, range),
    fontWeight: fontWeight,
    // 图表宽高减去 padding 之后的宽高
    size: getSize({
      width,
      height,
      padding: chartPadding,
      appendPadding,
      autoFit,
      container: ele,
    }),
    padding: padding,
    timeInterval,
    random,
    spiral,
    rotate: getRotate(rawOptions),
  };

  // 自定义布局函数
  if (isFunction(placementStrategy)) {
    const result = words.map((word: Word, index: number, words: Word[]) => ({
      ...word,
      hasText: !!word.text,
      font: functor(options.font)(word, index, words),
      weight: functor(options.fontWeight)(word, index, words),
      rotate: functor(options.rotate)(word, index, words),
      size: functor(options.fontSize)(word, index, words),
      style: 'normal',
      ...placementStrategy.call(chart, word, index, words),
    }));

    // 添加两个参照数据，分别表示左上角和右下角
    result.push({
      text: '',
      value: 0,
      x: 0,
      y: 0,
      opacity: 0,
    });
    result.push({
      text: '',
      value: 0,
      x: options.size[0],
      y: options.size[1],
      opacity: 0,
    });

    return result;
  }

  // 数据准备在外部做，wordCloud 单纯就是做布局
  return wordCloud(words, options);
}

/**
 * 获取最终的实际绘图尺寸：[width, height]
 * @param chart
 */
export function getSize(options: {
  width: number;
  height: number;
  padding: Types.ViewPadding;
  appendPadding: Types.ViewAppendPadding;
  autoFit: boolean;
  container: HTMLElement;
}): [number, number] {
  let { width, height } = options;
  const { container, autoFit, padding, appendPadding } = options;

  // 由于词云图每个词语的坐标都是先通过 DataSet 根据图表宽高计算出来的，
  // 也就是说，如果一开始提供给 DataSet 的宽高信息和最终显示的宽高不相同，
  // 那么就会出现布局错乱的情况，所以这里处理的目的就是让一开始提供给 DataSet 的
  // 宽高信息与最终显示的宽高信息相同，避免显示错乱。
  if (autoFit) {
    const containerSize = getContainerSize(container);
    width = containerSize.width;
    height = containerSize.height;
  }

  // 宽高不能为 0，否则会造成死循环
  width = width || 400;
  height = height || 400;

  const [top, right, bottom, left] = resolvePadding({ padding, appendPadding });
  const result = [width - (left + right), height - (top + bottom)];

  return result as [number, number];
}

/**
 * 根据图表的 padding 和 appendPadding 计算出图表的最终 padding
 * @param chart
 */
function resolvePadding(options: { padding: Types.ViewPadding; appendPadding: Types.ViewAppendPadding }) {
  const padding = normalPadding(options.padding);
  const appendPadding = normalPadding(options.appendPadding);
  const top = padding[0] + appendPadding[0];
  const right = padding[1] + appendPadding[1];
  const bottom = padding[2] + appendPadding[2];
  const left = padding[3] + appendPadding[3];

  return [top, right, bottom, left];
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
    log(LEVEL.WARN, img === undefined, 'The type of imageMask option must be String or HTMLImageElement.');
    rej();
  });
}

/**
 * 把用户提供的 fontSize 值转换成符合 DataSet 要求的值
 * @param options
 * @param range
 */
export function getFontSizeMapping(fontSize: WordStyle['fontSize'], range?: [number, number]) {
  if (isFunction(fontSize)) {
    return fontSize;
  }
  if (isArray(fontSize)) {
    const [fMin, fMax] = fontSize;
    if (!range) {
      return () => (fMax + fMin) / 2;
    }
    const [min, max] = range;
    if (max === min) {
      return () => (fMax + fMin) / 2;
    }
    return function fontSize({ value }) {
      return ((fMax - fMin) / (max - min)) * (value - min) + fMin;
    };
  }
  return () => fontSize;
}

export function getSingleKeyValues(data: Datum[], key: string) {
  return data
    .map((v) => v[key])
    .filter((v) => {
      // 过滤非 number
      if (typeof v === 'number' && !isNaN(v)) return true;
      return false;
    });
}

/**
 * 把用户提供的关于旋转角度的字段值转换成符合 DataSet 要求的值
 * @param options
 */
function getRotate(options: WordCloudOptions) {
  const { rotation, rotationSteps } = resolveRotate(options);
  if (!isArray(rotation)) return rotation;
  const min = rotation[0];
  const max = rotation[1];
  // 等于 1 时不旋转，所以把每份大小设为 0
  const perSize = rotationSteps === 1 ? 0 : (max - min) / (rotationSteps - 1);
  return function rotate() {
    if (max === min) return max;
    return Math.floor(Math.random() * rotationSteps) * perSize;
  };
}

/**
 * 确保值在要求范围内
 * @param options
 */
function resolveRotate(options: WordCloudOptions) {
  let { rotationSteps } = options.wordStyle;
  if (rotationSteps < 1) {
    log(LEVEL.WARN, false, 'The rotationSteps option must be greater than or equal to 1.');
    rotationSteps = 1;
  }
  return {
    rotation: options.wordStyle.rotation,
    rotationSteps,
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
