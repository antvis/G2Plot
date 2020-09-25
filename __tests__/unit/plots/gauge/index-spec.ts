import { Gauge } from '../../../../src';
import { createDiv } from '../../../utils/dom';

describe('gauge', () => {
  it('gauge', () => {
    const gauge = new Gauge(createDiv(), {
      width: 600,
      height: 300,
      autoFit: false,
      percent: 0.75,
      range: {
        ticks: [0, 0.2, 0.4, 0.75, 1],
        color: ['red', 'yellow', 'green'],
      },
      indicator: {
        pointer: {
          style: {
            stroke: 'pink',
          },
        },
        pin: {
          style: {
            stroke: 'blue',
          },
        },
      },
      axis: {
        label: {
          formatter(v: string) {
            return Number(v) * 100;
          },
        },
        subTickLine: {
          count: 3,
        },
      },
    });

    gauge.render();

    expect(gauge.chart.geometries.length).toBe(0);
    // @ts-ignore
    expect(gauge.chart.syncViewPadding).toBe(true);
    expect(gauge.chart.views.length).toBe(2);
    expect(gauge.chart.views.length).toBe(2);
    // @ts-ignore
    expect(gauge.chart.scalePool.syncScales.get('v').length).toBe(2);

    const [v1, v2] = gauge.chart.views;

    // v1
    expect(v1.geometries.length).toBe(1);
    expect(v1.geometries[0].type).toBe('point');
    // @ts-ignore
    expect(v1.geometries[0].customOption.indicator).toEqual(gauge.options.indicator);
    // @ts-ignore
    expect(v1.getCoordinate().circleCenter).toEqual({ x: 300, y: 200 });
    expect(v1.getCoordinate().startAngle).toEqual(gauge.options.startAngle);
    expect(v1.getCoordinate().endAngle).toEqual(gauge.options.endAngle);
    expect(v1.getCoordinate().radius).toEqual(gauge.options.radius * gauge.options.innerRadius);
    expect(v1.getCoordinate().innerRadius).toEqual(0);

    // @ts-ignore
    expect(v1.options.axes.percent).toEqual(gauge.options.axis);
    // @ts-ignore
    expect(v1.geometries[0].elements[0].container.getChildren()[0].getChildren()[0].attr('stroke')).toBe('pink');
    // @ts-ignore
    expect(v1.geometries[0].elements[0].container.getChildren()[0].getChildren()[1].attr('stroke')).toBe('blue');

    // v2
    expect(v2.geometries.length).toBe(1);
    expect(v2.geometries[0].type).toBe('interval');
    // @ts-ignore
    expect(v2.geometries[0].attributeOption.color.values).toEqual(['red', 'yellow', 'green', '#f0f0f0']);
    // @ts-ignore
    expect(v2.getCoordinate().circleCenter).toEqual({ x: 300, y: 200 });
    expect(v2.getCoordinate().startAngle).toEqual(gauge.options.startAngle);
    expect(v2.getCoordinate().endAngle).toEqual(gauge.options.endAngle);
    expect(v2.getCoordinate().radius).toEqual(gauge.options.radius);
    expect(v2.getCoordinate().innerRadius).toEqual(gauge.options.innerRadius);

    // @ts-ignore
    expect(v2.options.axes).toEqual(undefined);

    // pointer

    // pin
  });

  it('simple', () => {
    const gauge = new Gauge(createDiv(), {
      width: 600,
      height: 300,
      autoFit: false,
      percent: 0.65,
      range: {
        color: ['l(0) 0:#5d7cef 1:#e35767'],
      },
    });

    gauge.render();

    expect(gauge.options.range.ticks).toEqual([0, 0.65, 1]);
  });
});
