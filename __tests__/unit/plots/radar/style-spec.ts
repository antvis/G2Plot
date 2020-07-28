import { Radar } from '../../../../src';
import { SERIES_DATA } from '../../../data/radar';
import { createDiv } from '../../../utils/dom';

describe('radar', () => {
  it('line geometry, with point & area', () => {
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
      area: {},
    });

    radar.render();
    expect(radar.chart.geometries.length).toBe(3);

    const lineGeometry = radar.chart.geometries[0];
    expect(lineGeometry.elements[0].getModel().color).toBe('red');
    expect(lineGeometry.elements[1].getModel().color).toBe('orange');
    expect(lineGeometry.type).toBe('line');
    expect(radar.chart.geometries[1].type).toBe('point');
    expect(radar.chart.geometries[2].type).toBe('area');
  });

  it('lineStyle', () => {
    const radar = new Radar(createDiv(), {
      width: 400,
      height: 300,
      data: SERIES_DATA,
      xField: 'name',
      yField: 'value',
      seriesField: 'type',
      radius: 0.8,
      color: ['red', 'orange'],
      lineStyle: {
        stroke: 'rgba(255, 0, 0, 0.45)',
        strokeOpacity: 0.3,
      },
      point: {
        style: {
          fillOpacity: 0.8,
        },
      },
      area: {
        style: {
          fill: 'rgba(0, 0, 0, 0.10)',
          fillOpacity: 0.3,
        },
      },
    });

    radar.render();

    const lineGeometry = radar.chart.geometries[0];
    expect(lineGeometry.elements[0].getModel().color).toBe('red');
    expect(lineGeometry.elements[1].getModel().color).toBe('orange');
    expect(lineGeometry.elements[0].getModel().style.stroke).toBe('rgba(255, 0, 0, 0.45)');
    expect(lineGeometry.elements[0].getModel().style.strokeOpacity).toBe(0.3);
    expect(radar.chart.geometries[1].elements[0].getModel().style.fillOpacity).toBe(0.8);
    expect(radar.chart.geometries[2].elements[0].getModel().style.fill).toBe('rgba(0, 0, 0, 0.10)');
    expect(radar.chart.geometries[2].elements[0].getModel().style.fillOpacity).toBe(0.3);
  });

  it('lineStyle, with callback', () => {
    const radar = new Radar(createDiv(), {
      width: 400,
      height: 300,
      data: SERIES_DATA,
      xField: 'name',
      yField: 'value',
      seriesField: 'type',
      radius: 0.8,
      color: ['red', 'orange'],
      lineStyle: (x, y, series) => {
        return {
          stroke: 'rgb(0, 0, 0)',
          strokeOpacity: series === '实际支出' ? 0.45 : 0.3,
        };
      },
    });

    radar.render();

    const lineGeometry = radar.chart.geometries[0];
    expect(lineGeometry.elements[0].getModel().style.stroke).toBe('rgb(0, 0, 0)');
    expect(lineGeometry.elements[0].getModel().style.strokeOpacity).toBe(0.3);
    expect(lineGeometry.elements[1].getModel().style.strokeOpacity).toBe(0.45);
  });
});
