import { Rose } from '../../../../src';
import { salesByArea, subSalesByArea } from '../../../data/sales';
import { createDiv } from '../../../utils/dom';

describe('rose-changeData', () => {
  it('basic rose: change Data', () => {
    const rosePlot = new Rose(createDiv(), {
      width: 400,
      height: 300,
      data: salesByArea,
      xField: 'area',
      yField: 'sales',
    });

    rosePlot.render();
    expect(rosePlot.chart.geometries[0].elements.length).toEqual(salesByArea.length);

    const newData = salesByArea.slice(0, 3);
    rosePlot.changeData(newData);
    expect(rosePlot.chart.geometries[0].elements.length).toEqual(newData.length);
    expect(rosePlot.options.data).toEqual(newData);

    rosePlot.destroy();
  });

  it('basic rose: from empty to have data', () => {
    const rosePlot = new Rose(createDiv(), {
      width: 400,
      height: 300,
      data: [],
      xField: 'area',
      yField: 'sales',
    });

    rosePlot.render();

    rosePlot.changeData(salesByArea);
    expect(rosePlot.chart.geometries[0].elements.length).toEqual(salesByArea.length);
    expect(rosePlot.options.data).toEqual(salesByArea);

    rosePlot.destroy();
  });

  it('group rose: change data', () => {
    const rosePlot = new Rose(createDiv(), {
      width: 400,
      height: 300,
      data: subSalesByArea,
      xField: 'area',
      yField: 'sales',
      isGroup: true,
      seriesField: 'series',
    });

    rosePlot.render();

    expect(rosePlot.chart.geometries[0].elements.length).toEqual(subSalesByArea.length);

    const newData = subSalesByArea.filter((item) => item.area !== '东北' || item.series !== '消费者');
    rosePlot.changeData(newData);
    expect(rosePlot.chart.geometries[0].elements.length).toEqual(newData.length);
    expect(rosePlot.options.data).toEqual(newData);

    rosePlot.destroy();
  });

  it('group rose: from empty to have data', () => {
    const rosePlot = new Rose(createDiv(), {
      width: 400,
      height: 300,
      data: [],
      xField: 'area',
      yField: 'sales',
      isGroup: true,
      seriesField: 'series',
    });

    rosePlot.render();

    rosePlot.changeData(subSalesByArea);
    expect(rosePlot.chart.geometries[0].elements.length).toEqual(subSalesByArea.length);
    expect(rosePlot.options.data).toEqual(subSalesByArea);

    rosePlot.destroy();
  });

  it('stacked rose: change data', () => {
    const rosePlot = new Rose(createDiv(), {
      width: 400,
      height: 300,
      data: subSalesByArea,
      xField: 'area',
      yField: 'sales',
      isStack: true,
      seriesField: 'series',
    });

    rosePlot.render();

    expect(rosePlot.chart.geometries[0].elements.length).toEqual(subSalesByArea.length);

    const newData = subSalesByArea.filter((item) => item.area !== '东北' || item.series !== '消费者');
    rosePlot.changeData(newData);
    expect(rosePlot.chart.geometries[0].elements.length).toEqual(newData.length);
    expect(rosePlot.options.data).toEqual(newData);

    rosePlot.destroy();
  });

  it('stack rose: from empty to have data', () => {
    const rosePlot = new Rose(createDiv(), {
      width: 400,
      height: 300,
      data: [],
      xField: 'area',
      yField: 'sales',
      isStack: true,
      seriesField: 'series',
    });

    rosePlot.render();

    rosePlot.changeData(subSalesByArea);
    expect(rosePlot.chart.geometries[0].elements.length).toEqual(subSalesByArea.length);
    expect(rosePlot.options.data).toEqual(subSalesByArea);

    rosePlot.destroy();
  });
});
