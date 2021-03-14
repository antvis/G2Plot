import { Gauge } from '../../../../src';
import { createDiv } from '../../../utils/dom';

describe('gauge', () => {
  const gauge = new Gauge(createDiv(), {
    width: 600,
    height: 300,
    autoFit: false,
    percent: 0.75,
    range: {
      ticks: [0, 0.2, 0.4, 0.75, 1],
      color: ['red', 'yellow', 'green'],
    },
    indicator: {},
    gaugeStyle: {
      lineCap: 'round',
      lineWidth: 2,
      stroke: 'red',
    },
  });

  gauge.render();

  it('gaugeStyle', async () => {
    const [, v2] = gauge.chart.views;
    expect(v2.geometries[0].type).toBe('interval');
    // v2 gaugeStyle 生效
    expect(v2.geometries[0].elements[0].shape.attr('lineCap')).toBe('round');
    expect(v2.geometries[0].elements[0].shape.attr('lineWidth')).toBe(2);
    expect(v2.geometries[0].elements[0].shape.attr('stroke')).toBe('red');
  });

  it('gaugeStyle, with callback', () => {
    gauge.update({
      percent: 0.9,
      gaugeStyle: ({ percent }) => {
        return {
          lineCap: 'round',
          lineWidth: 2,
          stroke: percent > 0.8 ? 'green' : 'red',
        };
      },
    });

    const [, v2] = gauge.chart.views;
    expect(v2.geometries[0].type).toBe('interval');
    // v2 gaugeStyle 生效
    expect(v2.geometries[0].elements[0].shape.attr('lineCap')).toBe('round');
    expect(v2.geometries[0].elements[0].shape.attr('lineWidth')).toBe(2);
    expect(v2.geometries[0].elements[0].shape.attr('stroke')).toBe('green');
  });

  afterAll(() => {
    gauge.destroy();
  });
});
