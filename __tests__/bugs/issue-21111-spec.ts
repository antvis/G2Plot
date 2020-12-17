import { Column } from '../../src';
import { createDiv } from '../utils/dom';
import { delay } from '../utils/delay';

describe('#2111', () => {
  test('appendPadding update', async () => {
    const plot = new Column(createDiv(), {
      data: [
        { name: 'A', value: 1 },
        { name: 'B', value: 2 },
        { name: 'C', value: 3 },
      ],
      xField: 'name',
      yField: 'value',
      appendPadding: 8,
    });

    plot.render();

    expect(plot.chart.appendPadding).toBe(8);

    await delay(30);

    plot.update({
      appendPadding: 16,
    });

    expect(plot.chart.appendPadding).toBe(16);

    plot.destroy();
  });
});
