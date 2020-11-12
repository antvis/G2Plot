import { Liquid } from '@antv/g2plot';
import { isString, memoize, values } from '@antv/util';

const ctx = document.createElement('canvas').getContext('2d');
/**
 * 计算文本在画布中的宽度
 */
const measureTextWidth = memoize(
  (text, font) => {
    const { fontSize, fontFamily = 'sans-serif', fontWeight, fontStyle, fontVariant } = font;
    // @see https://developer.mozilla.org/zh-CN/docs/Web/CSS/font
    ctx.font = [fontStyle, fontWeight, fontVariant, `${fontSize}px`, fontFamily].join(' ');
    const metrics = ctx.measureText(isString(text) ? text : '');
    return {
      width: metrics.width,
      height: Math.abs(metrics.actualBoundingBoxAscent - metrics.actualBoundingBoxDescent),
    };
  },
  (text, font) => [text, ...values(font)].join('')
);
const liquidPlot = new Liquid('container', {
  percent: 0.25,
  statistic: {
    content: {
      style: {
        fontSize: 60,
        fill: 'black',
      },
      customHtml: (container, view) => {
        const circle = view.geometries[0].elements[0].shape.find((t) => t.get('type') === 'circle');
        const { width, height } = circle.getCanvasBBox();
        const d = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2));
        const textWidth = measureTextWidth('25%', { fontSize: 60 }).width;
        const scale = Math.min(d / textWidth, 1);
        return `<div style="width:${d}px;height:${d}px;display:flex;align-items:center;justify-content:center;font-size:${scale}em;line-height:${
          scale <= 1 ? 1 : 'inherit'
        }">25%</div>`;
      },
    },
  },
});
liquidPlot.render();
