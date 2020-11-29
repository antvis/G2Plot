import { Scatter } from '../../../../src';
import { data } from '../../../data/gender';
import { createDiv } from '../../../utils/dom';

describe('scatter', () => {
  it('legend: default', () => {
    const scatter = new Scatter(createDiv(), {
      width: 400,
      height: 300,
      appendPadding: 10,
      data,
      xField: 'weight',
      yField: 'height',
      xAxis: {
        nice: true,
      },
    });

    scatter.render();
    const legendController = scatter.chart.getController('legend');
    // @ts-ignore
    const { option } = legendController;
    expect(option).toBe(false);
    scatter.update({
      shapeField: 'gender',
    });
    // @ts-ignore
    expect(scatter.chart.getController('legend').option).toEqual({
      gender: undefined,
      height: false,
      weight: false,
    });
    scatter.update({
      shapeField: '',
      colorField: 'g',
    });
    // @ts-ignore
    expect(scatter.chart.getController('legend').option).toEqual({
      g: undefined,
      height: false,
      weight: false,
    });
    scatter.update({
      sizeField: 'gender',
    });
    // @ts-ignore
    expect(scatter.chart.getController('legend').option).toEqual({
      g: undefined,
      gender: false,
      height: false,
      weight: false,
    });
    scatter.destroy();
  });
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

    scatter.destroy();
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
      legend: {},
    });

    scatter.render();

    const legendController = scatter.chart.getController('legend');
    // @ts-ignore
    const { option } = legendController;
    expect(option).not.toBeUndefined();
    expect(legendController.getComponents().length).toBe(1);
    expect(legendController.getComponents()[0].id).toBe('legend-gender');

    scatter.destroy();
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

    scatter.destroy();
  });

  it('legend: legend * sizeField * false', () => {
    const scatter = new Scatter(createDiv(), {
      width: 400,
      height: 300,
      appendPadding: 10,
      data,
      xField: 'weight',
      yField: 'height',
      shapeField: 'gender',
      size: [2, 8],
      sizeField: 'weight',
      color: ['red', 'blue'],
      colorField: 'gender',
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

    scatter.destroy();
  });

  it('legend: legend * sizeField * true', () => {
    const scatter = new Scatter(createDiv(), {
      width: 400,
      height: 300,
      appendPadding: 10,
      data,
      xField: 'weight',
      yField: 'height',
      shapeField: 'gender',
      size: [2, 8],
      sizeField: 'weight',
      color: ['red', 'blue'],
      colorField: 'gender',
      xAxis: {
        nice: true,
      },
      legend: {},
    });

    scatter.render();
    const legendController = scatter.chart.getController('legend');
    // @ts-ignore
    const {
      // @ts-ignore
      option: { weight, height, gender },
    } = legendController;
    expect(weight).toBe(false);
    expect(height).toBe(false);
    expect(gender).toBeTruthy();

    scatter.destroy();
  });
});
