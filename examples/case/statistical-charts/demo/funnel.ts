import { Funnel } from '@antv/g2plot';

const originData = [
  { stage: '触达次数', number: 789 },
  { stage: '响应次数', number: 253 },
  { stage: '分享次数', number: 163 },
];

const data = originData.map((item, index, arr) => {
  if (index === 0)
    return {
      ...item,
      unConversation: undefined,
      conversionPec: undefined,
      unConversionPec: undefined,
    };
  return {
    ...item,
    unConversation: arr[index - 1].number - item.number,
    conversionPec: item.number / arr[index - 1].number,
    unConversionPec: 1 - item.number / arr[index - 1].number,
  };
});

const containerStyle = 'margin: 16px -8px; display: flex;';
const boxStyle = 'padding: 0px 16px;';
const titleStyle = 'font-weight: bold;';
const tooltipItemStyle = 'margin-top: 12px; display: flex; width: 120px; justify-content: space-between;';

const funnelPlot = new Funnel('container', {
  data: data,
  xField: 'stage',
  yField: 'number',
  legend: false,
  conversionTag: false,
  tooltip: {
    follow: true,
    enterable: true,
    offset: 5,
    customContent: (value, items) => {
      console.log(value, items);
      if (!items || items.length <= 0) return;
      const { data: itemData } = items[0];

      if (itemData.stage === '触达次数') {
        return `<div style='${tooltipItemStyle} margin-bottom: 12px'><span>待转化人数</span><span>${itemData.number}</span></div>`;
      }

      return (
        `<div style='${containerStyle}'>` +
        `<div style='${boxStyle} border-right: 1px solid #c2c2c2'>` +
        `<div style='${titleStyle}'>转化</div>` +
        `<div style='${tooltipItemStyle}'><span>转化人数</span><span>${itemData.number}</span></div>` +
        `<div style='${tooltipItemStyle}'><span>转化率</span><span>${(itemData.conversionPec * 100).toFixed(
          0
        )}%</span></div>` +
        `</div>` +
        `<div style='${boxStyle}'>` +
        `<div style='${titleStyle}'>未转化</div>` +
        `<div style='${tooltipItemStyle}'><span>未转化人数</span><span>${itemData.unConversation}</span></div>` +
        `<div style='${tooltipItemStyle}'><span>未转化率</span><span>${(itemData.unConversionPec * 100).toFixed(
          0
        )}%</span></div>` +
        `</div>` +
        `</div>`
      );
    },
  },
});

funnelPlot.render();
