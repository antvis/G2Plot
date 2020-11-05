import { Scatter } from '../../../../src';
import { data } from '../../../data/gender';
import { createDiv } from '../../../utils/dom';

describe('scatter', () => {
  it('size: number options', () => {
    const scatter = new Scatter(createDiv(), {
      width: 400,
      height: 300,
      appendPadding: 10,
      data,
      xField: 'weight',
      yField: 'height',
      sizeField: 'weight',
      size: [5, 10],
      xAxis: {
        nice: true,
      },
      quadrant: {
        xBaseline: 80,
        yBaseline: 170,
        labels: [
          {
            content: 'Male decrease,\nfemale increase',
          },
          {
            content: 'Female decrease,\nmale increase',
          },
          {
            content: 'Female & male decrease',
          },
          {
            content: 'Female &\n male increase',
          },
        ],
      },
    });

    scatter.render();

    // @ts-ignore
    const { option } = scatter.chart.annotation();
    expect(option.length).toBe(10);
    const regions = option.filter((item) => item.type === 'region');
    const texts = option.filter((item) => item.type === 'text');
    const lines = option.filter((item) => item.type === 'line');
    expect(regions.length).toBe(4);
    expect(texts.length).toBe(4);
    expect(lines.length).toBe(2);
    // @ts-ignore
    expect(regions[0].style.opacity).toBe(0.4);
    expect(regions[0].top).not.toBeTruthy();
    expect(texts[0].top).toBeTruthy();
    // @ts-ignore
    const hasLabel = texts.find((item) => item.content === 'Female & male decrease');
    expect(hasLabel).toBeTruthy();
    // @ts-ignore
    expect(lines[0].style.lineWidth).toBe(1);
    // @ts-ignore
    expect(lines[0].end).toEqual(['max', 170]);

    scatter.destroy();
  });
});
