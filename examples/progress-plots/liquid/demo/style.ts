import { Liquid, measureTextWidth } from '@antv/g2plot';

const liquidPlot = new Liquid(document.getElementById('container'), {
  percent: 0.26,
  statistic: {
    title: {
      formatter: () => '盈利率',
      style: ({ percent }) => ({
        fill: percent > 0.65 ? 'white' : 'rgba(44,53,66,0.85)',
      }),
    },
    content: {
      style: ({ percent }) => ({
        fontSize: 60,
        lineHeight: 1,
        fill: percent > 0.65 ? 'white' : 'rgba(44,53,66,0.85)',
      }),
      customHtml: (container, view, { percent }) => {
        const { width, height } = container.getBoundingClientRect();
        const d = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2));
        const text = `占比 ${(percent * 100).toFixed(0)}%`;
        const textWidth = measureTextWidth(text, { fontSize: 60 });
        const scale = Math.min(d / textWidth, 1);
        return `<div style="width:${d}px;display:flex;align-items:center;justify-content:center;font-size:${scale}em;line-height:${
          scale <= 1 ? 1 : 'inherit'
        }">${text}</div>`;
      },
    },
  },
  liquidStyle: ({ percent }) => {
    return {
      fill: percent > 0.45 ? '#5B8FF9' : '#FAAD14',
      stroke: percent > 0.45 ? '#5B8FF9' : '#FAAD14',
    };
  },
  color: () => '#5B8FF9',
});
liquidPlot.render();

let data = 0.25;
const interval = setInterval(() => {
  data += Math.min(Math.random() * 0.1, 0.1);
  if (data < 0.75) {
    liquidPlot.changeData(data);
  } else {
    clearInterval(interval);
  }
}, 500);
