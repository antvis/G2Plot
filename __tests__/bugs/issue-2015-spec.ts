import { Scatter } from '../../src';
import { data } from '../data/gender';
import { createDiv } from '../utils/dom';

describe('issue 2015', () => {
  it('scatter fields', () => {
    const scatter = new Scatter(createDiv(), {
      width: 400,
      height: 300,
      data,
      xField: 'weight',
      yField: 'height',
      size: 10,
      colorField: 'gender',
      shape: 'circle',
      xAxis: {
        nice: true,
      },
      tooltip: {
        title: 'scatter',
        showCrosshairs: true,
        crosshairs: {
          type: 'xy',
        },
      },
    });

    scatter.render();
    const { geometries } = scatter.chart;
    // @ts-ignore
    expect(geometries[0].tooltipOption.fields).toEqual(['weight', 'height', 'gender', '', '']);
    scatter.update({
      tooltip: false,
    });
    // @ts-ignore
    expect(scatter.chart.geometries[0].tooltipOption).toBeUndefined();
    scatter.destroy();
  });
});
