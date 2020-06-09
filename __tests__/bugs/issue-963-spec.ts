import { Funnel } from '../../src';
import { createDiv } from '../utils/dom';

describe('#963', () => {
  const div = createDiv('funnelPlot');
  document.body.appendChild(div);

  it('funnel label 文本显示错误', () => {
    const data = [
      { action: '浏览网站', pv: 50000 },
      { action: '放入购物车', pv: 35000 },
      { action: '生成订单', pv: 25000 },
      { action: '支付', pv: 15000 },
      { action: '成交', pv: 8500 },
    ];

    const funnelPlot = new Funnel(div, {
      width: 600,
      height: 600,
      forceFit: false,
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
