import { Venn } from '../../src';
import { createDiv } from '../utils/dom';

describe('#2906', () => {
  it('venn plot color callback', () => {
    const plot = new Venn(createDiv(), {
      setsField: 'sets',
      sizeField: 'size',
      data: [
        { sets: ['A'], size: 12, label: 'A' },
        { sets: ['B'], size: 12, label: 'B' },
        { sets: ['C'], size: 12, label: 'C' },
        { sets: ['A', 'B'], size: 2, label: 'A&B' },
        { sets: ['A', 'C'], size: 2, label: 'A&C' },
        { sets: ['B', 'C'], size: 2, label: 'B&C' },
        { sets: ['A', 'B', 'C'], size: 1 },
      ],
      pointStyle: { fillOpacity: 0.85 },
      color: (datum) => (datum.sets?.length === 1 ? 'blue' : 'red'),
    });
    plot.render();

    const legendController = plot.chart.getController('legend');
    const items = legendController.getComponents()[0].component.get('items');
    expect(items[0].marker.style.fill).toBe('blue');
    expect(items[3].marker.style.fill).toBe('red');
  });
});
