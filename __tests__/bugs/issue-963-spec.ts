import { Funnel } from '../../src';

describe('#963', () => {
  const div = document.createElement('div');
  div.style.width = '600px';
  div.style.height = '600px';
  div.style.left = '30px';
  div.style.top = '30px';

  it('funnel label 文本显示错误', () => {
    const data = [
      { action: '浏览网站', pv: 50000 },
      { action: '放入购物车', pv: 35000 },
      { action: '生成订单', pv: 25000 },
      { action: '支付', pv: 15000 },
      { action: '成交', pv: 8500 },
    ];

    const funnelPlot = new Funnel(div, {
      data: data,
      xField: 'action',
      yField: 'pv',
    });
    funnelPlot.render();
    const view = funnelPlot.getLayers()[0].view;
    const { labelsContainer } = view.geometries[0];
    const labelShapes = labelsContainer.get('children');
    expect(labelShapes[0].attr('text')).toBe('浏览网站 50000');
  });
});
