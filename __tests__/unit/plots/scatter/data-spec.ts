import { Scatter } from '../../../../src';
import { createDiv } from '../../../utils/dom';

const data = [{ gender: 'female', height: 161.2, weight: 51.6 }];

describe('scatter', () => {
  it('transformOptions & default', () => {
    const scatter = new Scatter(createDiv(), {
      width: 400,
      height: 300,
      appendPadding: 10,
      data,
      xField: 'weight',
      yField: 'height',
      xAxis: {
        nice: false,
      },
      yAxis: {
        nice: false,
      },
    });

    scatter.render();

    const geometry = scatter.chart.geometries[0];
    const elements = geometry.elements;
    expect(elements.length).toBe(1);
    const xScale = scatter.chart.getScaleByField('weight');
    const yScale = scatter.chart.getScaleByField('height');
    // @ts-ignore
    expect(xScale.nice).toBe(false);
    expect(xScale.min).toBe(0);
    expect(xScale.max).toBe(data[0].weight * 2);
    // @ts-ignore
    expect(yScale.nice).toBe(false);
    expect(yScale.min).toBe(0);
    expect(yScale.max).toBe(data[0].height * 2);
  });
  it('transformOptions & axis min max', () => {
    const scatter = new Scatter(createDiv(), {
      width: 400,
      height: 300,
      appendPadding: 10,
      data,
      xField: 'weight',
      yField: 'height',
      xAxis: {
        nice: false,
        max: 200,
        min: -10,
      },
      yAxis: {
        nice: false,
        max: 100,
        min: -20,
      },
    });

    scatter.render();
    const xScale = scatter.chart.getScaleByField('weight');
    const yScale = scatter.chart.getScaleByField('height');
    expect(xScale.min).toBe(-10);
    expect(xScale.max).toBe(200);
    expect(yScale.min).toBe(-20);
    expect(yScale.max).toBe(100);
    scatter.destroy();
  });
  it('transformOptions & meta min max', () => {
    const scatter = new Scatter(createDiv(), {
      width: 400,
      height: 300,
      appendPadding: 10,
      data,
      xField: 'weight',
      yField: 'height',
      meta: {
        weight: {
          max: 200,
          min: -10,
        },
        height: {
          max: 100,
          min: -20,
        },
      },
      xAxis: {
        nice: false,
      },
      yAxis: {
        nice: false,
      },
    });

    scatter.render();
    const xScale = scatter.chart.getScaleByField('weight');
    const yScale = scatter.chart.getScaleByField('height');
    expect(xScale.min).toBe(-10);
    expect(xScale.max).toBe(200);
    expect(yScale.min).toBe(-20);
    expect(yScale.max).toBe(100);
    scatter.destroy();
  });
  it('transformOptions & axis and meta min max', () => {
    const scatter = new Scatter(createDiv(), {
      width: 400,
      height: 300,
      appendPadding: 10,
      data,
      xField: 'weight',
      yField: 'height',
      meta: {
        weight: {
          max: 200,
          min: -10,
        },
        height: {
          max: 100,
          min: -20,
        },
      },
      xAxis: {
        nice: false,
        max: 300,
        min: -30,
      },
      yAxis: {
        nice: false,
        max: 400,
        min: -40,
      },
    });

    scatter.render();
    const xScale = scatter.chart.getScaleByField('weight');
    const yScale = scatter.chart.getScaleByField('height');
    expect(xScale.min).toBe(-30);
    expect(xScale.max).toBe(300);
    expect(yScale.min).toBe(-40);
    expect(yScale.max).toBe(400);
    scatter.destroy();
  });

  it('transformOptions & axis min max', () => {
    const scatter = new Scatter(createDiv(), {
      width: 400,
      height: 300,
      appendPadding: 10,
      data,
      xField: 'weight',
      yField: 'height',
      xAxis: {
        nice: false,
        max: 200,
        min: -10,
      },
      yAxis: {
        nice: false,
        max: 100,
        min: -20,
      },
    });

    scatter.render();
    const xScale = scatter.chart.getScaleByField('weight');
    const yScale = scatter.chart.getScaleByField('height');
    expect(xScale.min).toBe(-10);
    expect(xScale.max).toBe(200);
    expect(yScale.min).toBe(-20);
    expect(yScale.max).toBe(100);
    scatter.destroy();
  });
  it('transformOptions & meta min max', () => {
    const scatter = new Scatter(createDiv(), {
      width: 400,
      height: 300,
      appendPadding: 10,
      data,
      xField: 'weight',
      yField: 'height',
      meta: {
        weight: {
          max: 200,
          min: -10,
        },
        height: {
          max: 100,
          min: -20,
        },
      },
      xAxis: {
        nice: false,
      },
      yAxis: {
        nice: false,
      },
    });

    scatter.render();
    const xScale = scatter.chart.getScaleByField('weight');
    const yScale = scatter.chart.getScaleByField('height');
    expect(xScale.min).toBe(-10);
    expect(xScale.max).toBe(200);
    expect(yScale.min).toBe(-20);
    expect(yScale.max).toBe(100);
    scatter.destroy();
  });
  it('transformOptions & data.length > 1', () => {
    const scatter = new Scatter(createDiv(), {
      width: 400,
      height: 300,
      appendPadding: 10,
      data: [
        { gender: 'female', height: 161.2, weight: 51.6 },
        { gender: 'female', height: 61.2, weight: 151.6 },
      ],
      xField: 'weight',
      yField: 'height',
    });

    scatter.render();
    const xScale = scatter.chart.getScaleByField('weight');
    const yScale = scatter.chart.getScaleByField('height');
    expect(xScale.min).toBe(40);
    expect(xScale.max).toBe(160);
    expect(yScale.min).toBe(50);
    expect(yScale.max).toBe(175);

    scatter.destroy();
  });

  it('changedata: normal', () => {
    const scatter = new Scatter(createDiv(), {
      width: 400,
      height: 300,
      appendPadding: 10,
      data: [],
      xField: 'weight',
      yField: 'height',
    });

    scatter.render();

    scatter.changeData([
      { gender: 'female', height: 161.2, weight: 51.6 },
      { gender: 'female', height: 61.2, weight: 151.6 },
    ]);
    const xScale = scatter.chart.getScaleByField('weight');
    const yScale = scatter.chart.getScaleByField('height');
    expect(xScale.min).toBe(40);
    expect(xScale.max).toBe(160);
    expect(yScale.min).toBe(50);
    expect(yScale.max).toBe(175);

    scatter.changeData([]);
    expect(scatter.options.data).toEqual([]);
    expect(scatter.chart.getOptions().data).toEqual([]);

    scatter.destroy();
  });

  it('changedata, from one data to empty or to more', () => {
    const scatter = new Scatter(createDiv(), {
      width: 400,
      height: 300,
      appendPadding: 10,
      data: [{ gender: 'female', height: 161.2, weight: 51.6 }],
      xField: 'weight',
      yField: 'height',
      xAxis: {
        nice: false,
      },
      yAxis: {
        nice: false,
      },
    });

    scatter.render();
    let xScale = scatter.chart.getScaleByField('weight');
    let yScale = scatter.chart.getScaleByField('height');
    expect(xScale.min).toBe(0);
    expect(xScale.max).toBe(51.6 * 2);
    expect(yScale.min).toBe(0);
    expect(yScale.max).toBe(161.2 * 2);

    scatter.changeData([]);
    expect(scatter.options.data).toEqual([]);
    expect(scatter.chart.getOptions().data).toEqual([]);

    scatter.changeData([{ gender: 'female', height: 61.2, weight: 351.6 }]);
    expect(scatter.options.data).toEqual([{ gender: 'female', height: 61.2, weight: 351.6 }]);
    xScale = scatter.chart.getScaleByField('weight');
    yScale = scatter.chart.getScaleByField('height');
    expect(xScale.min).toBe(0);
    expect(xScale.max).toBe(351.6 * 2);
    expect(yScale.min).toBe(0);
    expect(yScale.max).toBe(61.2 * 2);

    scatter.destroy();
  });
});
