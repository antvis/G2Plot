import { Gauge } from '../../src';
import { RANGE_VIEW_ID } from '../../src/plots/gauge/constants';
import { createDiv, removeDom } from '../utils/dom';

describe('#2422', () => {
  it('仪表盘自定义主题', () => {
    const div = createDiv();
    const gauge = new Gauge(div, {
      percent: 0.75,
      theme: {
        colors10: [
          '#025DF4',
          '#DB6BCF',
          '#2498D1',
          '#BBBDE6',
          '#4045B2',
          '#21A97A',
          '#FF745A',
          '#007E99',
          '#FFA8A8',
          '#2391FF',
        ],
      },
    });

    gauge.render();

    expect(gauge.chart.views.find((v) => v.id === RANGE_VIEW_ID).geometries[0].elements[0].shape.attr('fill')).toBe(
      '#025DF4'
    );

    gauge.destroy();
    removeDom(div);
  });
});
