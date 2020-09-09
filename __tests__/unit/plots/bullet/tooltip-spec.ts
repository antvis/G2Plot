import { Bullet } from '../../../../src';
import { bulletData } from '../../../data/bullet';
import { createDiv } from '../../../utils/dom';

describe('tooltip bullet', () => {
  it('tooltip', () => {
    const bullet = new Bullet(createDiv('tooltip bullet'), {
      width: 400,
      height: 100,
      data: bulletData,
      measureField: 'measures',
      rangeField: 'ranges',
      targetField: 'target',
      xField: 'title',
      label: {
        position: 'middle',
        style: {
          fill: '#fff',
        },
      },
      tooltip: {
        title: 'hello wold!',
        showMarkers: false,
        showCrosshairs: false,
      },
    });

    bullet.render();

    const chart = bullet.chart;

    const measureView = chart.geometries[1];
    // @ts-ignore
    expect(measureView.labelOption.cfg.position).toEqual('middle');
    // @ts-ignore
    expect(measureView.labelOption.cfg.style.fill).toEqual('#fff');

    // @ts-ignore
    expect(chart.options.tooltip.title).toBe('hello wold!');

    // @ts-ignore
    expect(chart.options.tooltip.showMarkers).toBe(false);
    // @ts-ignore
    expect(chart.options.tooltip.showCrosshairs).toBe(false);
  });
});
