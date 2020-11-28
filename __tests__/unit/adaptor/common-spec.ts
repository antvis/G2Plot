import { limitInPlot } from '../../../src/adaptor/common';

describe('limit-in-plot', () => {
  it('limitInPlot: limitinplot config, yaxis undefined', () => {
    const params = {
      chart: {},
      options: {
        limitInPlot: true,
      },
    };
    // @ts-ignore
    expect(limitInPlot(params).chart.limitInPlot).toBeTruthy();
  });
  it('limitInPlot: limitinplot config, yaxis {}', () => {
    const params = {
      chart: {},
      options: {
        limitInPlot: false,
        yAxis: {
          test: 5,
        },
      },
    };
    // @ts-ignore
    expect(limitInPlot(params).chart.limitInPlot).toBeFalsy();
  });
  it('limitInPlot: limitinplot config, yaxis {} with min max', () => {
    const params = {
      chart: {},
      options: {
        limitInPlot: false,
        yAxis: {
          min: 5,
        },
      },
    };
    // @ts-ignore
    expect(limitInPlot(params).chart.limitInPlot).toBeFalsy();
  });
  it('limitInPlot: limitinplot undefined, yaxis undefined', () => {
    const params = {
      chart: {},
      options: {},
    };
    // @ts-ignore
    expect(limitInPlot(params).chart.limitInPlot).toBeUndefined();
  });

  it('limitInPlot: limitinplot undefined, yaxis {}', () => {
    const params = {
      chart: {},
      options: {
        yAxis: {},
      },
    };
    // @ts-ignore
    expect(limitInPlot(params).chart.limitInPlot).toBeFalsy();
  });

  it('limitInPlot: limitinplot undefined, yaxis {min}', () => {
    const params = {
      chart: {},
      options: {
        yAxis: {
          min: 5,
        },
      },
    };
    // @ts-ignore
    expect(limitInPlot(params).chart.limitInPlot).toBeTruthy();
  });
});
