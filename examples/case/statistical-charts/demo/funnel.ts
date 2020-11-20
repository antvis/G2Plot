import { Funnel } from '@antv/g2plot';

const data = [
  { stage: '触达次数', times: 789, uv: 1000, conversionUV: 0 },
  { stage: '响应次数', times: 453, uv: 800, conversionUV: 600 },
  { stage: '分享次数', times: 193, uv: 600, conversionUV: 200 },
];

const containerStyle = 'margin: 16px -8px; display: flex;';
const boxStyle = 'padding: 0px 16px;';
const titleStyle = 'font-weight: bold;';
const tooltipItemStyle = 'margin-top: 12px; display: flex; width: 120px; justify-content: space-between;';
const linkStyle = 'display: inline-block; margin-top: 12px; color: #5B8FF9; text-decoration: none;';

const funnelPlot = new Funnel('container', {
  data: data,
  xField: 'stage',
  yField: 'times',
  legend: false,
  conversionTag: false,
  interactions: [
    {
      type: 'element-active',
    },
  ],
  tooltip: {
    follow: true,
    enterable: true,
    offset: 5,
    customContent: (value, items) => {
      if (!items || items.length <= 0) return;
      const { data: itemData } = items[0];

      return (
        `<div style='${containerStyle}'>` +
        `<div style='${boxStyle} border-right: 1px solid #c2c2c2'>` +
        `<div style='${titleStyle}'>转化</div>` +
        `<div style='${tooltipItemStyle}'><span>转化人数</span><span>${itemData.conversionUV}</span></div>` +
        `<div style='${tooltipItemStyle}'><span>转化率</span><span>${(
          (itemData.conversionUV / itemData.uv) *
          100
        ).toFixed(0)}%</span></div>` +
        `<a href="https://g2plot.antv.vision/zh" target='_blank' style='${linkStyle}'>查看转化详情</a>` +
        `</div>` +
        `<div style='${boxStyle}'>` +
        `<div style='${titleStyle}'>未转化</div>` +
        `<div style='${tooltipItemStyle}'><span>未转化人数</span><span>${
          itemData.uv - itemData.conversionUV
        }</span></div>` +
        `<div style='${tooltipItemStyle}'><span>未转化率</span><span>${(
          (1 - itemData.conversionUV / itemData.uv) *
          100
        ).toFixed(0)}%</span></div>` +
        `<a href="https://g2plot.antv.vision/zh" target='_blank' style='${linkStyle}'>查看未转化详情</a>` +
        `</div>` +
        `</div>`
      );
    },
  },
});

funnelPlot.render();
