import { each, sortBy } from '@antv/util';
import { Column, GroupedColumn, Bar, StackedBar, IStyleConfig } from '../../src';
import { COLOR_PLATE_10, COLOR_PLATE_20 } from '../../src/theme/default';
import { createDiv } from '../utils/dom';
import sales from '../data/sales.json';
import subsales from '../data/subsales.json';

const cfg = {
  width: 600,
  height: 500,
};

const COLORS = COLOR_PLATE_20.slice().reverse();

describe('#769', () => {
  // 基础柱形图，barStyle 接受 xField/yField 对应的数据点
  it('Column', () => {
    let cnt = 0;
    const callback = jest.fn((data: any) => {
      const color = COLORS[cnt];
      cnt += 1;
      return color;
    });
    const plot = new Column(createDiv(), {
      ...cfg,
      data: sales,
      xField: 'area',
      yField: 'sales',
      columnStyle: callback,
    });
    plot.render();

    each(sales, (item, idx) => {
      expect(callback).toHaveBeenNthCalledWith(idx + 1, item.area, item.sales);
    });
  });

  // Grouped/Stacked columnStyle 接受 groupField/stackField 对应的数据
  it('GroupedColumn', () => {
    let cnt = 0;
    const callback = jest.fn((data: any) => {
      const color = COLORS[cnt];
      cnt += 1;
      return color;
    });
    const plot = new GroupedColumn(createDiv(), {
      ...cfg,
      data: subsales,
      xField: 'area',
      yField: 'sales',
      groupField: 'series',
      columnStyle: callback,
    });
    plot.render();
    each(sortBy(subsales, 'series').reverse(), (item, idx) => {
      expect(callback).toHaveBeenNthCalledWith(idx + 1, item.series);
    });
  });

  // 基础 Bar，接受 xField/yField 对应对应的数据点
  it('Bar', () => {
    let cnt = 0;
    const callback = jest.fn((data: any) => {
      const color = COLORS[cnt];
      cnt += 1;
      return color;
    });
    const plot = new Bar(createDiv(), {
      ...cfg,
      data: sales,
      yField: 'area',
      xField: 'sales',
      barStyle: callback,
    });
    plot.render();

    each(sales.reverse(), (item, idx) => {
      expect(callback).toHaveBeenNthCalledWith(idx + 1, item.sales, item.area);
    });
  });

  // Grouped/Stacked barStyle 接受 groupField/stackField 对应的数据
  it('StackedBar', () => {
    let cnt = 0;
    const callback = jest.fn((data: any) => {
      const color = COLORS[cnt];
      cnt += 1;
      return color;
    });
    const plot = new StackedBar(createDiv(), {
      ...cfg,
      data: subsales,
      yField: 'area',
      xField: 'sales',
      stackField: 'series',
      barStyle: callback,
    });
    plot.render();
    each(sortBy(subsales, 'series'), (item, idx) => {
      expect(callback).toHaveBeenNthCalledWith(idx + 1, item.series);
    });
  });
});
