import { Radar } from '../../../../src';
import { SERIES_DATA, SINGLE_DATA } from '../../../data/radar';
import { createDiv } from '../../../utils/dom';

describe('radar with point', () => {
  it('add point geometry', () => {
    const radar = new Radar(createDiv(), {
      width: 400,
      height: 300,
      data: SINGLE_DATA,
      xField: 'name',
      yField: 'value',
      radius: 0.8,
      point: {},
    });

    radar.render();
    expect(radar.chart).toBeDefined();
    expect(radar.chart.geometries.length).toBe(2);

    radar.destroy();
  });

  it('point shape & size', () => {
    const radar = new Radar(createDiv(), {
      width: 400,
      height: 300,
      data: SINGLE_DATA,
      xField: 'name',
      yField: 'value',
      radius: 0.8,
      point: {
        shape: 'triangle',
        size: 6,
      },
    });

    radar.render();
    expect(radar.chart.geometries[1].type).toBe('point');
    expect(radar.chart.geometries[1].elements[0].getModel().shape).toBe('triangle');
    expect(radar.chart.geometries[1].elements[0].getModel().size).toBe(6);

    radar.destroy();
  });

  it('point shape & size with callback', () => {
    const radar = new Radar(createDiv(), {
      width: 400,
      height: 300,
      data: SINGLE_DATA,
      xField: 'name',
      yField: 'value',
      radius: 0.8,
      point: {},
    });

    radar.render();
    expect(radar.chart).toBeDefined();
    expect(radar.chart.geometries.length).toBe(2);

    radar.update({
      ...radar.options,
      point: {
        shape: 'triangle',
        size: ({ name }) => {
          return name === SINGLE_DATA[0].name ? 6 : 4;
        },
      },
    });

    expect(radar.chart.geometries[1].type).toBe('point');
    expect(radar.chart.geometries[1].elements[0].getModel().shape).toBe('triangle');
    expect(radar.chart.geometries[1].elements[0].getModel().size).toBe(6);
    expect(radar.chart.geometries[1].elements[1].getModel().size).toBe(4);

    radar.destroy();
  });

  it('point color & style', () => {
    const radar = new Radar(createDiv(), {
      width: 400,
      height: 300,
      data: SERIES_DATA,
      xField: 'name',
      yField: 'value',
      seriesField: 'type',
      radius: 0.8,
      color: ['red', 'orange'],
      point: {},
    });

    radar.render();
    let pointGeometry = radar.chart.geometries[1];
    expect(pointGeometry.elements[0].getModel().color).toBe('red');
    expect(pointGeometry.elements[SERIES_DATA.length / 2].getModel().color).toBe('orange');

    radar.update({
      ...radar.options,
      point: {
        color: '#008000',
      },
    });
    pointGeometry = radar.chart.geometries[1];
    expect(pointGeometry.elements[0].getModel().color).toBe('#008000');
    expect(pointGeometry.elements[SERIES_DATA.length / 2].getModel().color).toBe('#008000');

    radar.update({
      ...radar.options,
      point: {
        // 数组
        color: ['#008000', '#008990'],
      },
    });
    pointGeometry = radar.chart.geometries[1];
    expect(pointGeometry.elements[0].getModel().color).toBe('#008000');
    expect(pointGeometry.elements[SERIES_DATA.length / 2].getModel().color).toBe('#008990');

    radar.destroy();
  });

  it('point color & style, with callback', () => {
    const radar = new Radar(createDiv(), {
      width: 400,
      height: 300,
      data: SERIES_DATA,
      xField: 'name',
      yField: 'value',
      seriesField: 'type',
      radius: 0.8,
      color: ['red', 'orange'],
      point: {},
    });

    radar.render();
    const pointGeometry = radar.chart.geometries[1];
    expect(pointGeometry.elements[0].getModel().color).toBe('red');
    expect(pointGeometry.elements[SERIES_DATA.length / 2].getModel().color).toBe('orange');

    radar.update({
      ...radar.options,
      point: {
        color: ({ type }) => {
          if (type === '实际支出') {
            return 'red';
          }
          return 'pink';
        },
        style: ({ name }) => {
          return {
            stroke: name === SINGLE_DATA[0].name ? 'red' : 'rgba(0, 0, 0, 0.85)',
          };
        },
      },
    });
    expect(radar.chart.geometries[1].elements[0].getModel().color).toBe('pink');
    expect(radar.chart.geometries[1].elements[0].getModel().style.stroke).toBe('red');
    expect(radar.chart.geometries[1].elements[2].getModel().style.stroke).toBe('rgba(0, 0, 0, 0.85)');

    radar.destroy();
  });
});
