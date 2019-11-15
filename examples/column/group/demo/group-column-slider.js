import { GroupColumn } from '@antv/g2plot';
fetch('../data/subsales.json')
  .then((res) => res.json())
  .then((data) => {
    const columnPlot = new GroupColumn(document.getElementById('container'), {
      title: {
        visible: true,
        text: '分组柱状图-缩略轴',
      },
      description: {
        visible: true,
        text: '缩略轴 (slider) 交互适用于数据较多，用户希望关注数据集中某个特殊区间的场景。',
      },
      forceFit: true,
      data,
      xField: '城市',
      yField: '销售额',
      groupField: '细分',
      xAxis: {
        visible: true,
        autoHideLabel: true,
      },
      interactions: [
        {
          type: 'slider',
          cfg: {
            start: 0.4,
            end: 0.42,
          },
        },
      ],
    });

    columnPlot.render();
  });
