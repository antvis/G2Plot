import { Bullet } from '../../../../src';
import { bulletData } from '../../../data/bullet';
import { createDiv } from '../../../utils/dom';

describe('bullet*label', () => {
  it('label', () => {
    const bullet = new Bullet(createDiv('label bullet'), {
      width: 400,
      height: 100,
      data: bulletData,
      measureField: 'measures',
      rangeField: 'ranges',
      targetField: 'target',
      xField: 'title',
      label: {
        range: {
          position: 'middle',
          style: {
            fill: '#fff',
          },
        },
        measure: {
          position: 'middle',
          style: {
            fill: '#fff',
          },
        },
        target: {
          position: 'right',
          style: {
            fill: '#fff',
          },
        },
      },
    });

    bullet.render();

    const chart = bullet.chart;
    const [rangeGeometry, measureGeometry, targetGeometry] = chart.geometries;

    // @ts-ignore
    expect(rangeGeometry.labelOption.fields[0]).toEqual('ranges');
    // @ts-ignore
    expect(rangeGeometry.labelOption.cfg.position).toEqual('middle');
    // @ts-ignore
    expect(rangeGeometry.labelOption.cfg.style.fill).toEqual('#fff');

    expect(measureGeometry.getAdjust('stack')).toMatchObject({
      xField: 'title',
      yField: 'measures',
    });

    // @ts-ignore
    expect(measureGeometry.labelOption.fields[0]).toEqual('measures');

    // @ts-ignore
    expect(measureGeometry.labelOption.cfg.position).toEqual('middle');
    // @ts-ignore
    expect(measureGeometry.labelOption.cfg.style.fill).toEqual('#fff');
    // @ts-ignore
    expect(targetGeometry.labelOption.fields[0]).toEqual('target');
    // @ts-ignore
    expect(targetGeometry.labelOption.cfg.position).toEqual('right');
    // @ts-ignore
    expect(targetGeometry.labelOption.cfg.style.fill).toEqual('#fff');

    bullet.destroy();
  });

  it('label*measure*null', () => {
    const bullet = new Bullet(createDiv('lable*measure*null'), {
      width: 400,
      height: 100,
      data: bulletData,
      measureField: 'measures',
      rangeField: 'ranges',
      targetField: 'target',
      xField: 'title',
      label: {
        measure: null,
        target: {
          position: 'right',
          style: {
            fill: '#fff',
          },
        },
      },
    });

    bullet.render();

    const chart = bullet.chart;
    const [rangeGeometry, measureGeometry, targetGeometry] = chart.geometries;

    expect(rangeGeometry.labelOption).toEqual(false);
    expect(measureGeometry.getAdjust('stack')).toMatchObject({
      xField: 'title',
      yField: 'measures',
    });

    // @ts-ignore
    expect(measureGeometry.labelOption).toEqual(false);
    // @ts-ignore
    expect(targetGeometry.labelOption.fields[0]).toEqual('target');
    // @ts-ignore
    expect(targetGeometry.labelOption.cfg.position).toEqual('right');
    // @ts-ignore
    expect(targetGeometry.labelOption.cfg.style.fill).toEqual('#fff');

    bullet.destroy();
  });

  it('label default layout', () => {
    const bullet = new Bullet(createDiv('label bullet'), {
      width: 400,
      height: 100,
      data: bulletData,
      measureField: 'measures',
      rangeField: 'ranges',
      targetField: 'target',
      xField: 'title',
      label: {
        range: {},
        measure: {},
        target: {},
      },
    });

    bullet.render();

    const chart = bullet.chart;
    let [rangeGeometry, measureGeometry, targetGeometry] = chart.geometries;

    // @ts-ignore
    expect(rangeGeometry.labelOption.cfg.layout).toEqual([{ type: 'limit-in-plot' }]);
    // @ts-ignore
    expect(measureGeometry.labelOption.cfg.layout).toEqual([{ type: 'limit-in-plot' }]);
    // @ts-ignore
    expect(targetGeometry.labelOption.cfg.layout).toEqual([{ type: 'limit-in-plot' }]);

    bullet.update({
      label: {
        range: {},
        measure: {},
        target: false,
      },
    });
    bullet.render();
    [rangeGeometry, measureGeometry, targetGeometry] = chart.geometries;

    // @ts-ignore
    expect(rangeGeometry.labelOption.cfg.layout).toEqual([{ type: 'limit-in-plot' }]);
    // @ts-ignore
    expect(measureGeometry.labelOption.cfg.layout).toEqual([{ type: 'limit-in-plot' }]);
    expect(targetGeometry.labelOption).toBe(false);
  });
});
