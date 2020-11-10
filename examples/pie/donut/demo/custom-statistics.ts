import { Pie } from '@antv/g2plot';
import { isString, memoize, values } from '@antv/util';

const ctx = document.createElement('canvas').getContext('2d');
/**
 * 计算文本在画布中的宽度
 */
const measureTextWidth = memoize(
  (text, font) => {
    const { fontSize, fontFamily = 'sans-serif', fontWeight, fontStyle, fontVariant } = font;
    // @see https://developer.mozilla.org/zh-CN/docs/Web/CSS/font
    ctx!.font = [fontStyle, fontWeight, fontVariant, `${fontSize}px`, fontFamily].join(' ');
    const metrics = ctx!.measureText(isString(text) ? text : '');
    return {
      width: metrics.width,
      height: Math.abs(metrics.actualBoundingBoxAscent - metrics.actualBoundingBoxDescent),
    };
  },
  (text: any, font) => [text, ...values(font)].join('')
);

function renderStatistic(containerWidth: number, text: string, style) {
  const { width: textWidth, height: textHeight } = measureTextWidth(text, style);
  const R = containerWidth / 2;
  // r^2 = (w / 2)^2 + (h - offsetY)^2
  let scale = 1;
  if (containerWidth < textWidth) {
    scale = Math.min(Math.sqrt(Math.abs(Math.pow(R, 2) / (Math.pow(textWidth / 2, 2) + Math.pow(textHeight, 2)))), 1);
  }
  const textStyleStr = `width:${containerWidth}px;`;
  return `<div style="${textStyleStr};font-size:${scale}em;line-height:${scale < 1 ? 1 : 'inherit'};">${text}</div>`;
}

const data = [
  { type: '分类一', value: 27 },
  { type: '分类二', value: 25 },
  { type: '分类三', value: 18 },
  { type: '分类四', value: 15 },
  { type: '分类五', value: 10 },
  { type: '其他', value: 5 },
];

const piePlot = new Pie('container', {
  appendPadding: 10,
  data,
  angleField: 'value',
  colorField: 'type',
  radius: 0.8,
  innerRadius: 0.64,
  meta: {
    value: {
      formatter: (v) => `${v} ¥`,
    },
  },
  label: {
    type: 'inner',
    offset: '-50%',
    autoRotate: false,
    content: '{value}',
    style: {
      textAlign: 'center',
    },
  },
  statistic: {
    title: {
      offsetY: -4,
      style: {
        fontSize: 28,
      },
      customHtml: (container, view, datum) => {
        const coordinate = view.getCoordinate();
        const containerWidth = coordinate.getRadius() * coordinate.innerRadius * 2;
        container.style['width'] = `${containerWidth}px`;

        const text = datum ? datum.type : '总计';
        return renderStatistic(containerWidth, text, { fontSize: 28 });
      },
    },
    content: {
      offsetY: 4,
      style: {
        fontSize: '32px',
      },
      customHtml: (container, view, datum, data) => {
        const coordinate = view.getCoordinate();
        const containerWidth = coordinate.getRadius() * coordinate.innerRadius * 2;
        container.style['width'] = `${containerWidth}px`;

        const text = datum ? `¥ ${datum.value}` : `¥ ${data.reduce((r, d) => r + d.value, 0)}`;
        return renderStatistic(containerWidth, text, { fontSize: 32 });
      },
    },
  },
  // 添加 中心统计文本 交互
  interactions: [{ type: 'element-selected' }, { type: 'element-active' }, { type: 'pie-statistic-active' }],
});

piePlot.render();
