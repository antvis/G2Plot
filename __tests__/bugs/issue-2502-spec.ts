import { BidirectionalBar } from '../../src';
import { createDiv, removeDom } from '../utils/dom';

describe('#2502', () => {
  it('对称条形图 xAxis position 在 bottom 中间的时候，两个 view 都存在 axis', () => {
    const div = createDiv('#2502: 对称条形图 axis');
    const data = [
      { country: '乌拉圭', '2016年耕地总面积': 13.4, '2016年转基因种植面积': 12.3 },
      { country: '巴拉圭', '2016年耕地总面积': 14.4, '2016年转基因种植面积': 6.3 },
      { country: '南非', '2016年耕地总面积': 18.4, '2016年转基因种植面积': 8.3 },
      { country: '巴基斯坦', '2016年耕地总面积': 34.4, '2016年转基因种植面积': 13.8 },
      { country: '阿根廷', '2016年耕地总面积': 44.4, '2016年转基因种植面积': 19.5 },
      { country: '巴西', '2016年耕地总面积': 24.4, '2016年转基因种植面积': 18.8 },
      { country: '加拿大', '2016年耕地总面积': 54.4, '2016年转基因种植面积': 24.7 },
      { country: '中国', '2016年耕地总面积': 104.4, '2016年转基因种植面积': 5.3 },
      { country: '美国', '2016年耕地总面积': 165.2, '2016年转基因种植面积': 72.9 },
    ];
    const plot = new BidirectionalBar(div, {
      data,
      width: 400,
      height: 400,
      layout: 'vertical',
      xField: 'country',
      yField: ['2016年耕地总面积', '2016年转基因种植面积'],
      xAxis: {
        position: 'top',
      },
      yAxis: false,
    });

    plot.render();

    expect(plot.chart.views[1].getController('axis').getComponents().length).toBe(0);

    plot.update({ xAxis: { position: 'bottom' } });
    const axes = plot.chart.views[1].getController('axis').getComponents();
    expect(axes.length).toBe(1);

    const view1XAxis = axes[0];
    // @ts-ignore
    const labels = view1XAxis.component.getElementByLocalId('label-group').getChildren();
    expect(labels.length).toBe(data.length);
    // view2 不展示 axis-label
    expect(labels[0].attr('text')).toBe('');

    const view0XAxis = plot.chart.views[0].getController('axis').getComponents()[0];
    // @ts-ignore
    expect(view0XAxis.component.getElementByLocalId('label-group').getChildren()[0].attr('text')).not.toBe('');

    // 除了 axis label, 其他保持一致
    expect(view1XAxis.component.get('tickLine')).toEqual(view0XAxis.component.get('tickLine'));

    plot.destroy();
    removeDom(div);
  });
});
