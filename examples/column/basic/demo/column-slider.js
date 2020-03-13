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
      xField: '城市',
      xAxis: {
        visible: true,
        label: {
          visible: true,
          autoHide: true,
        },
      },
      yAxis: {
        visible: true,
        formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
      },
      yField: '销售额',
      interactions: [
        {
          type: 'slider',
          cfg: {
            start: 0.4,
            end: 0.45,
          },
        },
      ],
    });
    columnPlot.render();
  });
