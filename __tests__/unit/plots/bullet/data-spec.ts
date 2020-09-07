import { Bullet } from '../../../../src';
import { bulletData } from '../../../data/bullet';
import { createDiv } from '../../../utils/dom';
import { transformData } from '../../../../src/plots/bullet/utils';

describe('bullet*data', () => {
  it('data*transfrom', () => {
    const bullet = new Bullet(createDiv('data bullet'), {
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
    const [rangeGeometry, measureGeometry, targetGeometry] = chart.geometries;
    expect(measureGeometry.getAdjust('stack')).toMatchObject({
      xField: 'title',
      yField: 'measure',
    });
    // 校验数据转换
    const { min, max, ds } = transformData({
      data: bulletData,
      measureField: 'measures',
      rangeField: 'ranges',
      targetField: 'target',
      xField: 'title',
    });

    expect(chart.getData()).toMatchObject(ds);
    expect(rangeGeometry.getYScale().max).toEqual(max);
    expect(rangeGeometry.getYScale().min).toEqual(min);

    expect(measureGeometry.getYScale().max).toEqual(max);
    expect(measureGeometry.getYScale().min).toEqual(min);

    expect(targetGeometry.getYScale().max).toEqual(max);
    expect(targetGeometry.getYScale().min).toEqual(min);
  });
});
