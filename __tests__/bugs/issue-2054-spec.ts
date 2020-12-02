import { Pie } from '../../src';
import { createDiv } from '../utils/dom';

describe('#2054', () => {
  it('pie {percentage} label', () => {
    const pie = new Pie(createDiv(), {
      width: 400,
      height: 300,
      data: [
        { type: '1', value: 10 },
        { type: '2', value: 40 },
        { type: '3', value: 0 },
        { type: '4', value: null },
      ],
      angleField: 'value',
      colorField: 'type',
      label: {
        content: '{percentage}',
      },
    });

    pie.render();

    const labels = pie.chart.geometries[0].labelsContainer.getChildren();
    // @ts-ignore
    expect(labels[2].find((shape) => shape.get('type') === 'text')).toEqual('0.00%');
    // @ts-ignore
    expect(labels[3].find((shape) => shape.get('type') === 'text')).toEqual(null);

    pie.destroy();
  });
});
