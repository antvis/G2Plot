import { DualAxes } from '../../src';
import { createDiv } from '../utils/dom';

describe('issue-2734', () => {
  it('dual-axes: 主题设置覆盖 columnWidthRatio 配置', () => {
    const uvBillData = [
      { time: '2019-03', value: 350, type: 'uv' },
      { time: '2019-03', value: 220, type: 'bill' },
    ];

    const transformData = [{ time: '2019-03', count: 800 }];

    const plot = new DualAxes(createDiv(), {
      width: 200,
      height: 200,
      autoFit: false,
      data: [uvBillData, transformData],
      xField: 'time',
      yField: ['value', 'count'],
      theme: {},
      geometryOptions: [
        {
          geometry: 'column',
          isStack: true,
          seriesField: 'type',
          columnWidthRatio: 1,
        },
        {
          geometry: 'line',
        },
      ],
    });

    plot.render();

    expect(plot.chart.views[0].geometries[0].elements[0].shape.getBBox().width).toBeGreaterThan(
      100 /** 至少大于 width / 2 */
    );

    plot.destroy();
  });
});
