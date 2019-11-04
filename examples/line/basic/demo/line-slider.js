import { Line } from '@antv/g2plot';

fetch('../data/sales.json')
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
      width: 800,
      height: 600,
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
    linePlot.render();
  });
