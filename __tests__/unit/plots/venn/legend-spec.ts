import { Venn } from '../../../../src';
import { createDiv } from '../../../utils/dom';

describe('venn: legend', () => {
  const plot = new Venn(createDiv(), {
    data: [
      { sets: ['A'], size: 12, label: 'A' },
      { sets: ['B'], size: 12, label: 'B' },
      { sets: ['C'], size: 12, label: 'C' },
      { sets: ['A', 'B'], size: 2, label: 'A&B' },
      { sets: ['A', 'C'], size: 2, label: 'A&C' },
      { sets: ['B', 'C'], size: 2, label: 'B&C' },
    ],
    width: 400,
    height: 500,
    setsField: 'sets',
    sizeField: 'size',
  });
  plot.render();

  it('legend: default', () => {
    const legendController = plot.chart.getController('legend');

    expect(legendController.getComponents().length).toBe(1);
    expect(legendController.getComponents()[0].component.get('items').length).toBe(6);
  });

  it('legend: false', () => {
    plot.update({
      legend: false,
    });

    const legendController = plot.chart.getController('legend');
    expect(legendController.getComponents().length).toBe(0);
  });

  it('legend: true', () => {
    plot.update({
      legend: {},
    });

    const legendController = plot.chart.getController('legend');
    expect(legendController.getComponents().length).toBe(1);
    expect(legendController.getComponents()[0].component.get('items').length).toBe(6);
  });

  it('legend: position', () => {
    plot.update({
      legend: {
        position: 'top',
      },
    });

    const legendController = plot.chart.getController('legend');
    expect(legendController.getComponents().length).toBe(1);
    expect(legendController.getComponents()[0].id).toBe('legend-id');
    expect(legendController.getComponents()[0].direction).toBe('top');
  });

  afterAll(() => {
    plot.destroy();
  });
});
