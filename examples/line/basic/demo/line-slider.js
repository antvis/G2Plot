import { Line } from '@antv/g2plot';

fetch('../data/fireworks-sales.json')
  .then((res) => res.json())
  .then((data) => {
    const linePlot = new Line(document.getElementById('container'), {
      title: {
        visible: true,
        text: '为折线添加缩略轴交互',
      },
      description: {
        visible: true,
        text: '缩略轴 (slider) 交互适用于折线数据较多，用户希望关注数据集中某个特殊区间的场景。',
      },
      forceFit: true,
      padding: 'auto',
      data,
      xField: 'Date',
      xAxis: {
        type: 'dateTime',
        tickCount: 5,
      },
      yField: 'scales',
      yAxis: {
        label: {
          // 数值格式化为千分位
          formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
        },
      },
      interactions: [
        {
          type: 'slider',
          cfg: {
            start: 0.2,
            end: 0.7,
          },
        },
      ],
    });
    linePlot.render();
  });
