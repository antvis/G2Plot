import { RadialBar } from '../../../../src';
import { createDiv } from '../../../utils/dom';
import { antvStar } from '../../../data/antv-star';

describe('radial-bar changeData', () => {
  it('changeData: normal', () => {
    const bar = new RadialBar(createDiv(), {
      width: 400,
      height: 300,
      data: antvStar,
      xField: 'name',
      yField: 'start',
      radius: 0.8,
      innerRadius: 0.2,
    });
    bar.render();

    expect(bar.chart.geometries[0].elements.length).toEqual(antvStar.length);

    const newData = antvStar.slice(0, 4);
    bar.changeData(newData);
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
      yField: 'start',
      radius: 0.8,
      innerRadius: 0.2,
    });

    bar.render();

    expect(bar.chart.geometries[0].elements.length).toEqual(0);

    bar.changeData(antvStar);
    expect(bar.chart.geometries[0].elements.length).toEqual(antvStar.length);
    expect(bar.options.data).toEqual(antvStar);

    bar.destroy();
  });
});
