import { Radar } from '../../../../src';
import { SERIES_DATA } from '../../../data/radar';
import { createDiv } from '../../../utils/dom';

describe('radar with area', () => {
  it('add area geometry', () => {
    const radar = new Radar(createDiv(), {
      width: 400,
      height: 300,
      data: SERIES_DATA,
      xField: 'name',
      yField: 'value',
      seriesField: 'type',
      radius: 0.8,
      color: ['red', 'orange'],
      area: {},
    });

    radar.render();
    expect(radar.chart.geometries.length).toBe(2);

    const areaGeometry = radar.chart.geometries[1];
    expect(areaGeometry.elements[0].getModel().color).toBe('red');
    expect(areaGeometry.elements[1].getModel().color).toBe('orange');
    expect(areaGeometry.type).toBe('area');
    expect(areaGeometry.elements.length).toBe(2);

    radar.destroy();
  });

  it('area style', () => {
    const radar = new Radar(createDiv(), {
      width: 400,
      height: 300,
      data: SERIES_DATA,
      xField: 'name',
      yField: 'value',
      seriesField: 'type',
      radius: 0.8,
      color: ['red', 'orange'],
      area: {
        style: {
          fill: 'rgba(0, 0, 0, 0.10)',
          fillOpacity: 0.3,
        },
      },
    });

    radar.render();

    const areaGeometry = radar.chart.geometries[1];
    expect(areaGeometry.elements[0].getModel().color).toBe('red');
    expect(areaGeometry.elements[1].getModel().color).toBe('orange');
    expect(areaGeometry.elements[0].getModel().style.fill).toBe('rgba(0, 0, 0, 0.10)');
    expect(areaGeometry.elements[0].getModel().style.fillOpacity).toBe(0.3);

    radar.destroy();
  });

  it('area style, with callback', () => {
    const radar = new Radar(createDiv(), {
      width: 400,
      height: 300,
      data: SERIES_DATA,
      xField: 'name',
      yField: 'value',
      seriesField: 'type',
      radius: 0.8,
      color: ['red', 'orange'],
      area: {
        style: ({ type }) => {
          return {
            fill: 'rgb(0, 0, 0)',
            fillOpacity: type === '实际支出' ? 0.1 : 0.3,
          };
        },
      },
    });

    radar.render();

    const areaGeometry = radar.chart.geometries[1];
    expect(areaGeometry.elements[0].getModel().style.fill).toBe('rgb(0, 0, 0)');
    expect(areaGeometry.elements[0].getModel().style.fillOpacity).toBe(0.3);
    expect(areaGeometry.elements[1].getModel().style.fillOpacity).toBe(0.1);

    radar.destroy();
  });
});
