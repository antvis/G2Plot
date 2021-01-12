import { RadialBar } from '../../../../src';
import { createDiv } from '../../../utils/dom';
import { antvStar } from '../../../data/antv-star';
import { getScaleMax } from '../../../../src/plots/radial-bar/utils';

describe('radial-bar changeData', () => {
  it('changeData: normal', () => {
    const bar = new RadialBar(createDiv(), {
      width: 400,
      height: 300,
      data: antvStar,
      xField: 'name',
      yField: 'star',
      radius: 0.8,
      innerRadius: 0.2,
    });
    bar.render();

    const { maxAngle } = bar.options;
    expect(bar.chart.geometries[0].elements.length).toEqual(antvStar.length);
    expect(bar.chart.geometries[0].scales.star.max).toEqual(getScaleMax(maxAngle, 'star', antvStar));

    const newData = antvStar.slice(0, 4);
    bar.changeData(newData);
    expect(bar.chart.geometries[0].scales.star.max).toEqual(getScaleMax(maxAngle, 'star', newData));
    expect(bar.chart.geometries[0].elements.length).toEqual(newData.length);
    expect(bar.options.data).toEqual(newData);

    bar.destroy();
  });

  it('changeData: from empty to have data', () => {
    const bar = new RadialBar(createDiv(), {
      width: 400,
      height: 300,
      data: [],
      xField: 'name',
      yField: 'star',
      radius: 0.8,
      innerRadius: 0.2,
    });

    bar.render();

    const { maxAngle } = bar.options;
    expect(bar.chart.geometries[0].elements.length).toEqual(0);
    expect(bar.chart.geometries[0].scales.star.max).toEqual(getScaleMax(maxAngle, 'star', []));

    bar.changeData(antvStar);
    expect(bar.chart.geometries[0].scales.star.max).toEqual(getScaleMax(maxAngle, 'star', antvStar));
    expect(bar.chart.geometries[0].elements.length).toEqual(antvStar.length);
    expect(bar.options.data).toEqual(antvStar);

    bar.destroy();
  });
});
