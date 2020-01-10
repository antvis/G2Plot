import { Step } from '@antv/g2plot';

fetch('../data/fireworks-sales.json')
  .then((res) => res.json())
  .then((data) => {
    const step = new Step(document.getElementById('container'), {
      title: {
        visible: true,
        text: '单阶梯折线的基础用法',
      },
      description: {
        visible: true,
        text: '最基础简单的阶梯图使用方式，显示一个指标的趋势和变化',
      },
      forceFit: true,
      data,
      padding: 'auto',
      xField: 'Date',
      yField: 'scales',
      xAxis: {
        type: 'dateTime',
        tickCount: 5,
      },
    });

    step.render();
  });
