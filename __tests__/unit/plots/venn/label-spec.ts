import { Venn } from '../../../../src';
import { createDiv } from '../../../utils/dom';

describe('venn: label', () => {
  const data = [
    { sets: ['A'], size: 12, label: 'A' },
    { sets: ['B'], size: 12, label: 'B' },
    { sets: ['C'], size: 12, label: 'C' },
    { sets: ['A', 'B'], size: 2, label: 'A&B' },
    { sets: ['A', 'C'], size: 2, label: 'A&C' },
    { sets: ['B', 'C'], size: 2, label: 'B&C' },
  ];
  const plot = new Venn(createDiv(), {
    data,
    width: 400,
    height: 500,
    setsField: 'sets',
    sizeField: 'size',
  });
  plot.render();

  it('label', () => {
    const geometries = plot.chart.geometries[0];
    // @ts-ignore
    expect(geometries.labelOption.cfg).not.toBeUndefined();
    expect(geometries.labelsContainer.getChildren().length).toBe(6);
  });

  it('label: offset', () => {
    plot.update({
      label: {
        offsetY: 6,
      },
    });

    const geometries = plot.chart.geometries[0];
    // @ts-ignore
    expect(geometries.labelOption.cfg.offsetY).toBe(6);
  });

  it('label: style', () => {
    plot.update({
      label: {
        style: {
          textAlign: 'center',
          fill: 'red',
          lineHeight: 18,
        },
      },
    });

    const geometries = plot.chart.geometries[0];
    // @ts-ignore
    expect(geometries.labelOption.cfg.style.textAlign).toBe('center');
    // @ts-ignore
    expect(geometries.labelOption.cfg.style.fill).toBe('red');
    // @ts-ignore
    expect(geometries.labelOption.cfg.style.lineHeight).toBe(18);
  });

  it('label: formatter', () => {
    const toPercent = (p) => `${(p * 100).toFixed(2)}%`;
    const sum = data.reduce((a, b) => a + b.size, 0);
    const formatter = (datum) => {
      return datum.sets.length > 1
        ? `${datum.size} (${toPercent(datum.size / sum)})`
        : `${datum.id}\n${datum.size} (${toPercent(datum.size / sum)})`;
    };
    plot.update({
      label: {
        formatter,
      },
    });
    const geometries = plot.chart.geometries[0];
    // @ts-ignore
    expect(geometries.labelOption.cfg.formatter).toEqual(formatter);
  });

  it('label: false', () => {
    plot.update({
      label: false,
    });
    const geometries = plot.chart.geometries[0];
    // @ts-ignore
    expect(geometries.labelOption).toEqual(false);
  });

  afterAll(() => {
    plot.destroy();
  });
});
