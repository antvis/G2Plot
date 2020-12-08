import { Gauge } from '../../src';
import { createDiv } from '../utils/dom';

describe('charts #367', () => {
  it('gauge axis ticks', () => {
    const gauge = new Gauge(createDiv(), {
      percent: 0.75,
      range: {
        ticks: [0, 0.6, 0.8, 0.9, 1],
        color: ['#F4664A', '#FAAD14', '#F2EAEA', '#96dcb0'],
      },
      indicator: {
        pointer: {
          style: {
            stroke: '#D0D0D0',
          },
        },
        pin: {
          style: {
            stroke: '#D0D0D0',
          },
        },
      },
    });

    gauge.render();

    // @ts-ignore
    window.gauge = gauge;

    expect(gauge.chart.views[0].getXScale().tickCount).toBe(5);
    expect(gauge.chart.views[0].getXScale().tickInterval).toBe(0.2);
    expect(
      gauge.chart.views[0]
        .getXScale()
        .getTicks()
        .map((t) => t.value)
    ).toEqual([0, 0.2, 0.4, 0.6, 0.8, 1.0]);

    const TICKS = [0, 0.6, 0.8, 0.9, 1];
    const LABELS = ['差', '及格', '中', '良', '优'];
    gauge.update({
      axis: {
        tickMethod: () => TICKS,
        label: {
          formatter: (v) => {
            return LABELS[TICKS.indexOf(Number(v))];
          },
        },
        subTickLine: null,
      },
    });

    // @ts-ignore
    expect(
      gauge.chart.views[0]
        .getController('axis')
        .getComponents()[0]
        .component.getContainer()
        .getChildByIndex(0)
        .getChildByIndex(0)
        .getChildren()
        .map((v) => v.attr('text'))
    ).toEqual(LABELS);
  });
});
