import { Waterfall } from '../../../../src';
import { salesByArea } from '../../../data/sales';
import { createDiv } from '../../../utils/dom';

describe('waterfall changeData', () => {
  it('changeData: normal', () => {
    const waterfall = new Waterfall(createDiv(), {
      width: 400,
      height: 300,
      data: salesByArea,
      xField: 'area',
      yField: 'sales',
    });

    waterfall.render();

    expect(waterfall.chart.geometries[0].elements.length).toEqual(salesByArea.length + 1);

    const newData = salesByArea.slice(0, 4);
    waterfall.changeData(newData);
    expect(waterfall.chart.geometries[0].elements.length).toEqual(newData.length + 1);
    expect(waterfall.options.data).toEqual(newData);

    waterfall.destroy();
  });

  it('changeData: from empty to have data', () => {
    const waterfall = new Waterfall(createDiv(), {
      width: 400,
      height: 300,
      data: [],
      xField: 'area',
      yField: 'sales',
    });

    waterfall.render();

    expect(waterfall.chart.geometries[0].elements.length).toEqual(0);

    waterfall.changeData(salesByArea);
    expect(waterfall.chart.geometries[0].elements.length).toEqual(salesByArea.length + 1);
    expect(waterfall.options.data).toEqual(salesByArea);

    waterfall.destroy();
  });
});
