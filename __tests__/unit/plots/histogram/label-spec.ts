import { Histogram } from '../../../../src';
import { histogramData } from '../../../data/histogram-data';
import { createDiv } from '../../../utils/dom';

describe('Histogram: label', () => {
  const histogram = new Histogram(createDiv(), {
    width: 400,
    height: 300,
    appendPadding: 10,
    data: histogramData,
    binField: 'value',
    binWidth: 2,
  });

  histogram.render();

  it('position: top', () => {
    histogram.update({
      ...histogram.options,
      label: {
        position: 'top',
      },
    });
    const geometry = histogram.chart.geometries[0];

    // @ts-ignore
    expect(geometry.labelOption.cfg).toEqual({
      position: 'top',
    });
  });

  it('position: middle', () => {
    histogram.update({
      ...histogram.options,
      label: {
        position: 'middle',
      },
    });
    const geometry = histogram.chart.geometries[0];

    // @ts-ignore
    expect(geometry.labelOption.cfg).toEqual({
      position: 'middle',
    });
  });

  it('position: bottom', () => {
    histogram.update({
      ...histogram.options,
      label: {
        position: 'bottom',
      },
    });
    const geometry = histogram.chart.geometries[0];

    // @ts-ignore
    expect(geometry.labelOption.cfg).toEqual({
      position: 'bottom',
    });
  });

  afterAll(() => {
    histogram.destroy();
  });
});
