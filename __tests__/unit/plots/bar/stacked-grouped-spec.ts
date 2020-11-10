import { Bar } from '../../../../src';
import { MultipleData } from '../../../data/common';
import { createDiv } from '../../../utils/dom';

describe('Bar stacked grouped', () => {
  it('stacked grouped', () => {
    const bar = new Bar(createDiv(), {
      width: 400,
      height: 300,
      data: MultipleData,
      xField: 'value',
      yField: 'month',
      isGroup: true,
      isStack: true,
      seriesField: 'type',
      groupField: 'name',
    });

    bar.render();

    const geometry = bar.chart.geometries[0];
    const elements = geometry.elements;
    // @ts-ignore
    const adjusts = geometry.adjusts;
    expect(adjusts.dodge.dodgeBy).toBe('name');
    expect(adjusts.stack.xField).toBe('month');
    expect(elements.length).toBe(17);
    bar.destroy();
  });
});
