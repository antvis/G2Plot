import { Liquid, measureTextWidth } from '@antv/g2plot';

const liquidPlot = new Liquid('container', {
  percent: 0.25,
  statistic: {
    content: {
      style: {
        fontSize: 60,
        fill: 'black',
      },
      customHtml: (container, view, { percent }) => {
        const { width, height } = container.getBoundingClientRect();
        const d = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2));
        const text = `${(percent * 100).toFixed(0)}%`;
        const textWidth = measureTextWidth(text, { fontSize: 60 });
        const scale = Math.min(d / textWidth, 1);
        return `<div style="width:${d}px;height:${d}px;display:flex;align-items:center;justify-content:center;font-size:${scale}em;line-height:${
          scale <= 1 ? 1 : 'inherit'
        }">${text}</div>`;
      },
    },
  },
});
liquidPlot.render();
