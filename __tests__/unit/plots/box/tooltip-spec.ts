import { Box } from '../../../../src';
import { boxData, groupBoxData } from '../../../data/box';
import { createDiv } from '../../../utils/dom';

describe('box tooltip', () => {
  it('x*y and tooltip', () => {
    const box = new Box(createDiv('box tooltip'), {
      width: 400,
      height: 500,
      data: boxData,
      xField: 'x',
      yField: ['low', 'q1', 'median', 'q3', 'high'],
      tooltip: {
        title: 'hello world',
      },
    });

    box.render();
    // @ts-ignore
    expect(box.chart.options.tooltip.title).toBe('hello world');

    box.update({
      ...box.options,
      tooltip: false,
    });
    // @ts-ignore
    expect(box.chart.options.tooltip).toBe(false);
    expect(box.chart.getComponents().find((co) => co.type === 'tooltip')).toBe(undefined);
  });

  it('default toolip', () => {
    const box = new Box(createDiv('default tooltip'), {
      width: 400,
      height: 500,
      data: groupBoxData,
      xField: 'type',
      yField: '_bin',
      groupField: 'Species',
    });

    box.render();
    // @ts-ignore
    expect(box.chart.options.tooltip.shared).toBe(true);
    // @ts-ignore
    expect(box.chart.options.tooltip.showCrosshairs).toBe(true);
  });
});
