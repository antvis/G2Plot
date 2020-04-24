import { Funnel } from '../../../../src';

describe('funnel plot', () => {
  const canvasDiv = document.createElement('div');
  canvasDiv.style.width = '600px';
  canvasDiv.style.height = '600px';
  canvasDiv.style.left = '30px';
  canvasDiv.style.top = '30px';
  canvasDiv.id = 'canvas1';
  document.body.appendChild(canvasDiv);

  it('hide legend', () => {
    const data = [
      { action: '浏览网站', pv: 50000 },
      { action: '放入购物车', pv: 35000 },
      { action: '生成订单', pv: 25000 },
      { action: '支付', pv: 15000 },
      { action: '成交', pv: 8500 },
    ];
    const funnelPlot = new Funnel(canvasDiv, {
      title: {
        visible: true,
        text: 'testtesttesttest',
      },
      data: data,
      xField: 'action',
      yField: 'pv',
      legend: {
        visible: false,
        position: 'top-left',
      },
    });
    funnelPlot.render();
  });
});
