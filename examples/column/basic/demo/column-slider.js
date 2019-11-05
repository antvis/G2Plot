import { Column } from '@antv/g2plot';

fetch('../data/sales.json')
  .then((res) => res.json())
  .then((data) => {
    const columnPlot = new Column(document.getElementById('container'), {
      title: {
        visible: true,
        text: '基础柱状图-缩略轴',
      },
      description: {
        visible: true,
        text: '缩略轴 (slider) 交互适用于数据较多，用户希望关注数据集中某个特殊区间的场景。',
      },
      forceFit: true,
      data,
      padding: 'auto',
      data,
      xField: '城市',
      xAxis: {
        visible: true,
        autoHideLabel: true,
      },
      yField: '销售额',
      interactions: [
        {
          type: 'slider',
          cfg: {
            start: 0,
            end: 1,
          },
        },
      ],
    });
    columnPlot.render();
  });
