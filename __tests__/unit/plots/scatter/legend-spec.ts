import { Scatter } from '../../../../src';
import { data } from '../../../data/gender';
import { createDiv } from '../../../utils/dom';

describe('scatter', () => {
  it('legend: false', () => {
    const scatter = new Scatter(createDiv(), {
      width: 400,
      height: 300,
      appendPadding: 10,
      data,
      xField: 'weight',
      yField: 'height',
      shapeField: 'gender',
      xAxis: {
        nice: true,
      },
      legend: false,
    });

    scatter.render();
    const legendController = scatter.chart.getController('legend');
    // @ts-ignore
    const { option } = legendController;
    expect(option).toBe(false);
  });

  it('legend: true', () => {
    const scatter = new Scatter(createDiv(), {
      width: 400,
      height: 300,
      appendPadding: 10,
      data,
      xField: 'weight',
      yField: 'height',
      shapeField: 'gender',
      shape: ['circle', 'square'],
      colorField: 'gender',
      xAxis: {
        nice: true,
      },
      legend: true,
    });

    scatter.render();

    const legendController = scatter.chart.getController('legend');
    // @ts-ignore
    const { option } = legendController;
    expect(option).not.toBeUndefined();
    expect(legendController.getComponents().length).toBe(1);
    expect(legendController.getComponents()[0].id).toBe('legend-gender');
  });
  it('legend: postion options', () => {
    const scatter = new Scatter(createDiv(), {
      width: 400,
      height: 300,
      appendPadding: 10,
      data,
      xField: 'weight',
      yField: 'height',
      shapeField: 'gender',
      shape: ['circle', 'square'],
      colorField: 'gender',
      xAxis: {
        nice: true,
      },
      legend: {
        position: 'top-right',
      },
    });

    scatter.render();

    const legendController = scatter.chart.getController('legend');
    // @ts-ignore
    const { option } = legendController;
    expect(option).not.toBeUndefined();
    expect(legendController.getComponents().length).toBe(1);
    expect(legendController.getComponents()[0].id).toBe('legend-gender');
    expect(legendController.getComponents()[0].direction).toBe('top-right');
  });
});
