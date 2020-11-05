import { Pie } from '../../../../src';
import { createDiv } from '../../../utils/dom';

describe('pie legend', () => {
  const pie = new Pie(createDiv(), {
    width: 400,
    height: 400,
    data: [
      { type: '分类一', value: 10 },
      { type: '分类二', value: 20 },
      { type: '分类三', value: 15 },
      { type: '其他', value: 23 },
    ],
    angleField: 'value',
    colorField: 'type',
  });

  pie.render();

  it('移除 legend', () => {
    const legendController = pie.chart.getController('legend');
    const legendComponent = legendController.getComponents()[0].component;
    expect(legendComponent.get('items').length).toBe(4);

    pie.update({
      ...pie.options,
      legend: false,
    });
    expect(legendComponent.get('items')).toBeUndefined();

    pie.destroy();
  });
});
