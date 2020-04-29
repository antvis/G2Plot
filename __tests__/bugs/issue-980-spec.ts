import { Funnel } from '../../src';

describe('#980', () => {
  const div = document.createElement('div');
  div.style.width = '500px';
  div.style.height = '500px';
  div.style.left = '30px';
  div.style.top = '30px';
  document.body.appendChild(div);

  it('funnel padding', () => {
    const data = [
      {
        text: '复杂应用总数',
        value: 132,
      },
      {
        text: '30 日活跃',
        value: 59,
      },
      {
        text: '7 日活跃',
        value: 50,
      },
    ];
    const funnelPlot = new Funnel(div, {
      data,
      xField: 'text',
      yField: 'value',
      legend: {
        visible: false,
      },
      label: {
        visible: true,
      },
      title: {
        visible: true,
        text: '活跃复杂应用',
      },
      description: {
        visible: true,
        text: '2020-3-29 的复杂应用数据：',
      },
    });
    funnelPlot.render();
    console.log(funnelPlot.getLayers()[0].options.padding);
  });
});
