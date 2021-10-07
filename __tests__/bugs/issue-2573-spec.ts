import { Radar } from '../../src';
import { SERIES_DATA } from '../data/radar';
import { createDiv } from '../utils/dom';

describe('#2573', () => {
  const data = SERIES_DATA;
  const radar = new Radar(createDiv(), {
    width: 400,
    height: 300,
    data,
    xField: 'name',
    yField: 'value',
    seriesField: 'type',
    radius: 0.8,
    color: ['red', 'orange'],
    state: {
      default: {
        style: {
          stroke: 'red',
        },
      },
      active: {
        style: {
          stroke: 'green',
        },
      },
    },
    point: {},
    animation: false,
  });

  radar.render();

  it('radar point 设置 state 状态样式不生效', () => {
    radar.setState('default', (datum) => datum['name'] === data[0].name);
    expect(radar.chart.geometries[1].elements[0].shape.attr('stroke')).toBe('red');

    radar.setState('active', (datum) => datum['name'] === data[0].name);
    expect(radar.chart.geometries[1].elements[0].shape.attr('stroke')).toBe('green');
  });

  it('point state 优先级高', () => {
    radar.update({
      point: {
        state: {
          default: {
            style: {
              stroke: 'blue',
            },
          },
          active: {
            style: {
              stroke: 'orange',
            },
          },
        },
      },
    });
    radar.setState('default', (datum) => datum['name'] === data[0].name);
    expect(radar.chart.geometries[1].elements[0].shape.attr('stroke')).toBe('blue');

    radar.setState('active', (datum) => datum['name'] === data[0].name);
    expect(radar.chart.geometries[1].elements[0].shape.attr('stroke')).toBe('orange');
  });

  afterAll(() => {
    radar.destroy();
  });
});
