import { Box } from '../../../../src';
import { OUTLIERS_VIEW_ID } from '../../../../src/plots/box/constant';
import { boxData, outliersData } from '../../../data/box';
import { createDiv } from '../../../utils/dom';

describe('box change data', () => {
  it('base box change data: normal', () => {
    const box = new Box(createDiv(), {
      width: 400,
      height: 500,
      data: boxData,
      xField: 'x',
      yField: ['low', 'q1', 'median', 'q3', 'high'],
    });

    box.render();

    expect(box.chart.geometries[0].elements.length).toEqual(boxData.length);
    expect(box.options.data).toEqual(boxData);

    const newData = [...boxData, { x: 'new node', low: 11, q1: 66, median: 88, q3: 113, high: 116 }];

    box.changeData(newData);
    expect(box.chart.geometries[0].elements.length).toEqual(newData.length);
    expect(box.options.data).toEqual(newData);

    box.destroy();
  });

  it('base box change data: from empty to have data', () => {
    const box = new Box(createDiv(), {
      width: 400,
      height: 500,
      data: [],
      xField: 'x',
      yField: ['low', 'q1', 'median', 'q3', 'high'],
    });

    box.render();

    expect(box.chart.geometries[0].elements.length).toEqual(0);

    box.changeData(boxData);
    expect(box.chart.geometries[0].elements.length).toEqual(boxData.length);
    expect(box.options.data).toEqual(boxData);

    box.destroy();
  });

  it('outliers box change data: normal', () => {
    const box = new Box(createDiv(), {
      width: 400,
      height: 500,
      data: outliersData,
      xField: 'x',
      yField: ['low', 'q1', 'median', 'q3', 'high'],
      outliersField: 'outliers',
    });

    box.render();
    const outliersView = box.chart.views.find((v) => v.id === OUTLIERS_VIEW_ID);

    const len = outliersData.reduce((r, d) => r + d.outliers.length, 0);
    expect(box.chart.geometries[0].elements.length).toEqual(outliersData.length);
    expect(outliersView.geometries[0].elements.length).toEqual(len);

    const newData = [
      ...outliersData,
      { x: '职业 I', low: 68000, q1: 73000, median: 88000, q3: 96000, high: 120000, outliers: [58000, 55000] },
    ];

    box.changeData(newData);
    expect(box.chart.geometries[0].elements.length).toEqual(newData.length);
    expect(outliersView.geometries[0].elements.length).toEqual(newData.length);
    box.destroy();
  });
});
