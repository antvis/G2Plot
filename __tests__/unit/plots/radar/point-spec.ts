import { Radar } from '../../../../src';
import { SINGLE_DATA, SERIES_DATA } from '../../../data/radar';
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
        size: (x) => {
          return x === SINGLE_DATA[0].name ? 6 : 4;
        },
      },
    });

    expect(radar.chart.geometries[1].type).toBe('point');
    expect(radar.chart.geometries[1].elements[0].getModel().shape).toBe('triangle');
    expect(radar.chart.geometries[1].elements[0].getModel().size).toBe(6);
    expect(radar.chart.geometries[1].elements[1].getModel().size).toBe(4);
  });

  it('point color & style', () => {
    const radar2 = new Radar(createDiv(), {
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

    radar2.render();
    let pointGeometry = radar2.chart.geometries[1];
    expect(pointGeometry.elements[0].getModel().color).toBe('red');
    expect(pointGeometry.elements[SERIES_DATA.length / 2].getModel().color).toBe('orange');

    radar2.update({
      ...radar2.options,
      point: {
        color: '#008000',
      },
    });
    pointGeometry = radar2.chart.geometries[1];
    expect(pointGeometry.elements[0].getModel().color).toBe('#008000');
    expect(pointGeometry.elements[SERIES_DATA.length / 2].getModel().color).toBe('#008000');

    radar2.update({
      ...radar2.options,
      point: {
        // 数组
        color: ['#008000', '#008990'],
      },
    });
    pointGeometry = radar2.chart.geometries[1];
    expect(pointGeometry.elements[0].getModel().color).toBe('#008000');
    expect(pointGeometry.elements[SERIES_DATA.length / 2].getModel().color).toBe('#008990');
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
        color: (series: string) => {
          if (series === '实际支出') {
            return 'red';
          }
          return 'pink';
        },
        style: (x) => {
          return {
            stroke: x === SINGLE_DATA[0].name ? 'red' : 'rgba(0, 0, 0, 0.85)',
          };
        },
      },
    });
    expect(radar.chart.geometries[1].elements[0].getModel().color).toBe('pink');
    expect(radar.chart.geometries[1].elements[0].getModel().style.stroke).toBe('red');
    expect(radar.chart.geometries[1].elements[1].getModel().style.stroke).toBe('rgba(0, 0, 0, 0.85)');
  });
});
