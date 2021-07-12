import { Column } from '../../../../src';
import { MultipleData } from '../../../data/common';
import { createDiv } from '../../../utils/dom';

const xField = 'month';
const yField = 'value';
const groupField = 'name';

describe('column stacked grouped percented', () => {
  it('stacked grouped percented', () => {
    const column = new Column(createDiv(), {
      width: 400,
      height: 300,
      data: MultipleData,
      xField,
      yField,
      isGroup: true,
      isStack: true,
      isPercent: true,
      seriesField: 'type',
      groupField,
    });

    column.render();

    const geometry = column.chart.geometries[0];

    const percentData = geometry.data.reduce((value, item) => {
      const valueField = `${item[xField]}${item[groupField]}`;
      value[valueField] = (value[valueField] || 0) + item[yField];
      return value;
    }, {});

    Object.keys(percentData).forEach((key) => {
      expect(Math.round(percentData[key])).toBe(1);
    });

    column.destroy();
  });

  it('stacked percented', () => {
    const column = new Column(createDiv(), {
      width: 400,
      height: 300,
      data: MultipleData,
      xField,
      yField,
      isStack: true,
      isPercent: true,
      seriesField: 'type',
      groupField,
    });

    column.render();

    const geometry = column.chart.geometries[0];

    const percentData = geometry.data.reduce((value, item) => {
      const valueField = item[xField];
      value[valueField] = (value[valueField] || 0) + item[yField];
      return value;
    }, {});

    Object.keys(percentData).forEach((key) => {
      expect(Math.round(percentData[key])).toBe(1);
    });

    column.destroy();
  });
});
