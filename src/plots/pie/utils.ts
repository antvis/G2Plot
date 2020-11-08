import { View } from '@antv/g2';
import { Data } from '@antv/g2/lib/interface';
import { each, get, isString, memoize, values } from '@antv/util';
import { deepAssign } from '../../utils';
import { PieLabelType } from './types';
import { PieOptions } from '.';

/**
 * 获取总计值
 * @param data
 * @param field
 */
export function getTotalValue(data: Data, field: string) {
  let total = null;
  each(data, (item) => {
    if (typeof item[field] === 'number') {
      total += item[field];
    }
  });
  return total;
}

/**
 * pie label offset adaptor
 */
export function adaptOffset(type: PieLabelType, offset?: string | number): string | number {
  let defaultOffset;
  switch (type) {
    case 'inner':
      defaultOffset = '-30%';
      if (isString(offset) && offset.endsWith('%')) {
        return parseFloat(offset) * 0.01 > 0 ? defaultOffset : offset;
      }
      return offset < 0 ? offset : defaultOffset;
    case 'outer':
      defaultOffset = 12;
      if (isString(offset) && offset.endsWith('%')) {
        return parseFloat(offset) * 0.01 < 0 ? defaultOffset : offset;
      }
      return offset > 0 ? offset : defaultOffset;
    default:
      return offset;
  }
}

/**
 * @desc simple kebabCase like lodash
 *
 * kebabCase('fooBar'); => 'foo-bar'
 */
export function kebabCase(word: string) {
  const result = word.match(/([A-Z]{0,1}[a-z]+[^A-Z])/g);
  return result
    ? result.reduce((a, b) => {
        return `${a ? `${a}-` : ''}` + b.toLowerCase();
      })
    : '';
}

type TextStyle = {
  width: number;
  fontSize: number;
  lineHeight: number;
  [k: string]: string | number;
};

/**
 * @desc 生成中心文本 html 的 style 字符串
 * @param width
 * @param style
 */
export function generateStatisticStyle(style: TextStyle): string {
  let styleStr = `width:${style.width}px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;`;
  each(style, (v, k) => {
    if (['fontSize', 'lineHeight', 'width'].includes(k)) {
      styleStr += `${kebabCase(k)}:${v}px;`;
    } else if (k === 'fill') {
      styleStr += `color:${v};`;
    } else {
      styleStr += `${kebabCase(k)}:${v};`;
    }
  });
  if (style.height) {
    styleStr += `height:${style.height}px;`;
  }
  return styleStr;
}

const ctx = (document.createElement('canvas') as HTMLCanvasElement).getContext('2d');

/**
 * 计算文本在画布中的宽度
 */
export const measureTextWidth = memoize(
  (text: any, font: any = {}): number => {
    const { fontSize, fontFamily = 'sans-serif', fontWeight, fontStyle, fontVariant } = font;
    // @see https://developer.mozilla.org/zh-CN/docs/Web/CSS/font
    ctx!.font = [fontStyle, fontWeight, fontVariant, `${fontSize}px`, fontFamily].join(' ');
    return ctx!.measureText(isString(text) ? text : '').width;
  },
  (text: any, font) => [text, ...values(font)].join('')
);

/**
 * @desc 中心文本 fontSze & lineHeight 自适应
 * @param style
 */
export function adapteStatisticStyle(
  diameter: number,
  statisticOption: PieOptions['statistic']['title' | 'content']
): TextStyle | null {
  let textStyle = null;

  if (statisticOption !== false) {
    textStyle = deepAssign({}, statisticOption?.style);
    const fontSize = textStyle.fontSize;
    const textHeight = parseFloat(get(statisticOption, ['style', 'lineHeight']) || fontSize);
    const dw = Math.pow(diameter / 2, 2) - Math.pow(statisticOption?.offsetY || 0, 2);
    const width = Math.sqrt(dw >= 0 ? dw : 14 /** 默认一个最小宽度 */) * 2;
    textStyle = deepAssign({}, textStyle, { width, lineHeight: textHeight });
  }

  return textStyle;
}

/**
 * 创建 中心文本指标卡的 html 内容
 */
export function createStatisticHTML(
  view: View,
  options: PieOptions,
  statisticOption: PieOptions['statistic']['title' | 'content'],
  field: string,
  styles: TextStyle
) {
  const filteredData = view.getData();
  if (!filteredData.length || statisticOption === false) {
    return null;
  }

  const { meta, angleField } = options;
  const textStyleStr = `${generateStatisticStyle(styles)}`;

  const getText = (data: Data) => {
    const value = field === angleField ? getTotalValue(data, field) : '总计';
    const metaFormatter = get(meta, [field, 'formatter']);
    return statisticOption.formatter
      ? statisticOption.formatter(null, data)
      : metaFormatter
      ? metaFormatter(value)
      : value;
  };

  const text = getText(filteredData);
  const textWidth = measureTextWidth(text, styles);
  const fontSize = `${Math.min((styles.width / textWidth) * 0.9 /** 魔法数字的比例 */, 1)}em`;

  return `<div style="width:${styles.width};font-size:${styles.fontSize}px;"><div style="${textStyleStr};font-size:${fontSize};">${text}</div></div>`;
}
