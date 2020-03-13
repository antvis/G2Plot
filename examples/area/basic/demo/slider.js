import { Area } from '@antv/g2plot';

fetch('../data/sales.json')
  .then((res) => res.json())
  .then((data) => {
    const areaPlot = new Area(document.getElementById('container'), {
      title: {
        visible: true,
        text: '基础面积图 - 缩略轴',
      },
      description: {
        visible: true,
        text: '缩略轴 (slider) 交互适用于数据较多，用户希望关注数据集中某个特殊区间的场景。',
      },
      data,
      xField: '城市',
      xAxis: {
        visible: true,
        label: {
          visible: true,
          autoHide: true,
        },
      },
      yField: '销售额',
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
            start: 0.5,
            end: 0.55,
          },
        },
      ],
    });
    areaPlot.render();
  });
