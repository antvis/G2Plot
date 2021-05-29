import { group } from '@antv/util';
import { Violin } from '../../../../src';
import { VIOLIN_VIEW_ID } from '../../../../src/plots/violin/constant';
import { BASE_VIOLIN_DATA } from '../../../data/violin';
import { createDiv } from '../../../utils/dom';

describe('violin', () => {
  it('没有 seriesField', () => {
    const violin = new Violin(createDiv(), {
      width: 400,
      height: 500,
      data: BASE_VIOLIN_DATA,
      xField: 'type',
      yField: 'value',
    });

    violin.render();
    const g = violin.chart.views.find((view) => view.id === VIOLIN_VIEW_ID).geometries[0];

    // 个数
    expect(g.elements.length).toBe(group(BASE_VIOLIN_DATA, 'type').length);
    // 类型
    expect(g.type).toBe('violin');

    const legendItems = violin.chart.getController('legend').getComponents()[0].component.get('items');
    expect(legendItems.length).toBe(4);

    violin.destroy();
  });
});
