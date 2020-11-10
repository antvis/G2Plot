import { Column } from '../../../../src';
import { MultipleData } from '../../../data/common';
import { createDiv } from '../../../utils/dom';

describe('column stacked grouped', () => {
  it('stacked grouped', () => {
    const column = new Column(createDiv(), {
      width: 400,
      height: 300,
      data: MultipleData,
      xField: 'month',
      yField: 'value',
      isGroup: true,
      isStack: true,
      seriesField: 'type',
      groupField: 'name',
    });

    column.render();

    const geometry = column.chart.geometries[0];
    const elements = geometry.elements;
    // @ts-ignore
    const adjusts = geometry.adjusts;
    expect(adjusts.dodge.dodgeBy).toBe('name');
    expect(adjusts.stack.xField).toBe('month');
    expect(elements.length).toBe(19);
    column.destroy();
  });
});
