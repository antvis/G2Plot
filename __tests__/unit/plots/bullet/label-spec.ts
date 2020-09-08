import { Bullet } from '../../../../src';
import { bulletData } from '../../../data/bullet';
import { createDiv } from '../../../utils/dom';

describe('bullet*label', () => {
  it('lable', () => {
    const bullet = new Bullet(createDiv('lable bullet'), {
      width: 400,
      height: 100,
      data: bulletData,
      measureField: 'measures',
      rangeField: 'ranges',
      targetField: 'target',
      xField: 'title',
      bulletLabel: {
        position: 'middle',
        style: {
          fill: '#fff',
        },
      },
    });

    bullet.render();

    const chart = bullet.chart;
    const measureGeometry = chart.geometries[1];
    expect(measureGeometry.getAdjust('stack')).toMatchObject({
      xField: 'title',
      yField: 'measures',
    });
    // @ts-ignore
    expect(measureGeometry.labelOption.cfg.position).toEqual('middle');
    // @ts-ignore
    expect(measureGeometry.labelOption.cfg.style.fill).toEqual('#fff');
  });
});
