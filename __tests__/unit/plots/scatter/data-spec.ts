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

    const data1 = [{ gender: 'female', height: -161.2, weight: -51.6 }];
    scatter.changeData(data1);
    const c1_xScale = scatter.chart.getScaleByField('weight');
    const c1_yScale = scatter.chart.getScaleByField('height');
    expect(c1_xScale.max).toBe(0);
    expect(c1_xScale.min).toBe(data1[0].weight * 2);
    expect(c1_yScale.max).toBe(0);
    expect(c1_yScale.min).toBe(data1[0].height * 2);

    const data2 = [{ gender: 'female', height: 161.2, weight: -51.6 }];
    scatter.changeData(data2);
    const c2_xScale = scatter.chart.getScaleByField('weight');
    const c2_yScale = scatter.chart.getScaleByField('height');
    expect(c2_xScale.max).toBe(0);
    expect(c2_xScale.min).toBe(data2[0].weight * 2);
    expect(c2_yScale.min).toBe(0);
    expect(c2_yScale.max).toBe(data2[0].height * 2);

    const data3 = [{ gender: 'female', height: -161.2, weight: 51.6 }];
    scatter.changeData(data3);
    const c3_xScale = scatter.chart.getScaleByField('weight');
    const c3_yScale = scatter.chart.getScaleByField('height');
    expect(c3_xScale.min).toBe(0);
    expect(c3_xScale.max).toBe(data3[0].weight * 2);
    expect(c3_yScale.max).toBe(0);
    expect(c3_yScale.min).toBe(data3[0].height * 2);

    const data4 = [{ gender: 'female', height: 0, weight: 0 }];
    scatter.changeData(data4);
    const c4_xScale = scatter.chart.getScaleByField('weight');
    const c4_yScale = scatter.chart.getScaleByField('height');
    expect(c4_xScale.min).toBe(0);
    expect(c4_xScale.max).toBe(0);
    expect(c4_yScale.max).toBe(0);
    expect(c4_yScale.min).toBe(0);
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
});
