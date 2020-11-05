import { Box } from '../../../../src';
import { createDiv } from '../../../utils/dom';
import { groupBoxData } from '../../../data/box';

describe('box legend', () => {
  it('legend position', () => {
    const box = new Box(createDiv('legend position'), {
      width: 400,
      height: 500,
      data: groupBoxData,
      xField: 'type',
      yField: '_bin',
      groupField: 'Species',
    });

    box.render();

    // @ts-ignore
    expect(box.chart.options.legends['Species'].position).toBe('bottom');

    box.update({
      ...box.options,
      legend: {
        position: 'right',
      },
    });
    // @ts-ignore
    expect(box.chart.options.legends['Species'].position).toBe('right');

    box.destroy();
  });
});
