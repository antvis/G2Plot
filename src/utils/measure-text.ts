import { isString, memoize, values } from '@antv/util';
import { getCanvasContext } from './context';

/**
 * 计算文本在画布中的宽度
 * @param text 文本
 * @param font 字体
 */
export const measureTextWidth = memoize(
  (text: string, font: any = {}): number => {
    const { fontSize, fontFamily = 'sans-serif', fontWeight, fontStyle, fontVariant } = font;
    const ctx = getCanvasContext();
    // @see https://developer.mozilla.org/zh-CN/docs/Web/CSS/font
    ctx.font = [fontStyle, fontWeight, fontVariant, `${fontSize}px`, fontFamily].join(' ');
    const metrics = ctx.measureText(isString(text) ? text : '');
    return metrics.width;
  },
  (text: string, font = {}) => [text, ...values(font)].join('')
);
