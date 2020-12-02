import { Pie } from '../../src';
import { createDiv } from '../utils/dom';

describe('#2054', () => {
  it('pie {percentage} label', () => {
    const pie = new Pie(createDiv(), {
      width: 400,
      height: 400,
      radius: 1,
      innerRadius: 0.3,
      angleField: 'value',
      colorField: 'type',
      data: [
        { type: 'type-1', value: 10 },
        { type: 'type-2', value: 40 },
        { type: 'type-3', value: 0 },
        { type: 'type-4', value: null },
      ],
      label: {
        content: '{percentage}',
      },
    });

    pie.render();

    const labels = pie.chart.geometries[0].labelsContainer.getChildren();
    expect(labels[2].get('children')[0].attr('text')).toBe('0.00%');
    expect(labels[3].get('children')[0].attr('text')).toBe(null);

    pie.destroy();
  });
});
