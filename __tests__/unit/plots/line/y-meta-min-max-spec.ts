import { Line } from '../../../../src';
import { createDiv } from '../../../utils/dom';

describe('line', () => {
  it('y min, max meta', () => {
    const line = new Line(createDiv(), {
      width: 400,
      height: 300,
      xField: 'date',
      yField: 'value',
      data: [
        { date: 'a', value: 10 },
        { date: 'b', value: 20 },
      ],
    });

    line.render();
    // @ts-ignore
    window.line = line;
    expect(line.options.meta.value.min).toBe(0);
    expect(line.options.meta.value.max).toBe(undefined);

    line.update({
      width: 400,
      height: 300,
      xField: 'date',
      yField: 'value',
      data: [
        { date: 'a', value: -10 },
        { date: 'b', value: -20 },
      ],
    });

    expect(line.options.meta.value.min).toBe(undefined);
    expect(line.options.meta.value.max).toBe(0);
  });
});
