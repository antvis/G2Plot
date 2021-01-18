import { Bullet } from '../../../../src';
import { bulletData } from '../../../data/bullet';
import { createDiv } from '../../../utils/dom';
import { transformData } from '../../../../src/plots/bullet/utils';

describe('Bullet changeData', () => {
  it('changeData: normal', () => {
    const bullet = new Bullet(createDiv(''), {
      width: 400,
      height: 100,
      data: bulletData,
      measureField: 'measures',
      rangeField: 'ranges',
      targetField: 'target',
      xField: 'title',
    });

    const { min, max, ds } = transformData({
      data: bulletData,
      measureField: 'measures',
      rangeField: 'ranges',
      targetField: 'target',
      xField: 'title',
    });
    bullet.render();

    expect(bullet.chart.geometries[0].scales.measures.max).toEqual(max);
    expect(bullet.chart.geometries[0].scales.measures.min).toEqual(min);
    expect(bullet.chart.geometries[0].data).toEqual(ds);

    const newData = [{ title: '数学', ranges: [0, 50, 100], measures: [120], target: 85 }];
    bullet.changeData(newData);
    const { min: newMin, max: newMax, ds: newDs } = transformData({
      data: newData,
      measureField: 'measures',
      rangeField: 'ranges',
      targetField: 'target',
      xField: 'title',
    });
    expect(bullet.chart.geometries[0].scales.measures.max).toEqual(newMax);
    expect(bullet.chart.geometries[0].scales.measures.min).toEqual(newMin);
    expect(bullet.chart.geometries[0].data).toEqual(newDs);

    bullet.destroy();
  });

  it('changeData: from empty to have data', () => {
    const bullet = new Bullet(createDiv(''), {
      width: 400,
      height: 100,
      data: [],
      measureField: 'measures',
      rangeField: 'ranges',
      targetField: 'target',
      xField: 'title',
    });
    bullet.render();

    expect(bullet.chart.geometries[0].scales.measures.max).toEqual(0);
    expect(bullet.chart.geometries[0].scales.measures.min).toEqual(0);
    expect(bullet.chart.geometries[0].data).toEqual([]);

    bullet.changeData(bulletData);
    const { min: newMin, max: newMax, ds: newDs } = transformData({
      data: bulletData,
      measureField: 'measures',
      rangeField: 'ranges',
      targetField: 'target',
      xField: 'title',
    });
    expect(bullet.chart.geometries[0].scales.measures.max).toEqual(newMax);
    expect(bullet.chart.geometries[0].scales.measures.min).toEqual(newMin);
    expect(bullet.chart.geometries[0].data).toEqual(newDs);

    bullet.destroy();
  });
});
