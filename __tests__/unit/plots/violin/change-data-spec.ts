import { group } from '@antv/util';
import { Violin } from '../../../../src';
import { VIOLIN_VIEW_ID } from '../../../../src/plots/violin/constant';
import { BASE_VIOLIN_DATA } from '../../../data/violin';
import { createDiv } from '../../../utils/dom';

describe('violin change data', () => {
  it('renders new violins when data changed', () => {
    const violin = new Violin(createDiv(), {
      width: 400,
      height: 500,
      data: BASE_VIOLIN_DATA,
      xField: 'type',
      yField: 'value',
    });

    violin.render();
    const g = violin.chart.views.find((view) => view.id === VIOLIN_VIEW_ID).geometries[0];
    expect(g.elements.length).toBe(group(BASE_VIOLIN_DATA, 'type').length);

    const newData = BASE_VIOLIN_DATA.filter((data) => data.type !== 'PetalWidth');

    violin.changeData(newData);
    const newG = violin.chart.views.find((view) => view.id === VIOLIN_VIEW_ID).geometries[0];
    expect(violin.options.data).toEqual(newData);
    expect(newG.elements.length).toBe(group(newData, 'type').length);

    violin.destroy();
  });
});
