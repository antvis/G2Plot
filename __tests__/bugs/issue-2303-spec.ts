import { Column } from '../../src';
import { createDiv } from '../utils/dom';

describe('#2303', () => {
  const data0 = [
    {
      type: '家具家电',
      sales: 238,
    },
    {
      type: '粮油副食',
      sales: 52,
    },
  ];
  const data1 = [
    {
      type: '家具家电',
      sales: 38,
    },
    {
      type: '粮油副食',
      sales: -3352,
    },
  ];

  const domainMax = (d: Column) => d.chart.getScalesByDim('y').sales.max;
  const domainMin = (d: Column) => d.chart.getScalesByDim('y').sales.min;

  it('should update scales of column when changeData', () => {
    const column = new Column(createDiv(), {
      data: data0,
      xField: 'type',
      yField: 'sales',
      label: {
        position: 'middle',
        style: {
          fill: '#FFFFFF',
          opacity: 0.6,
        },
      },
      xAxis: {
        label: {
          autoHide: true,
          autoRotate: false,
        },
      },
      meta: {
        type: {
          alias: '类别',
        },
        sales: {
          alias: '销售额',
        },
      },
    });

    column.render();
    expect(domainMin(column)).toBe(0); // 所有数据大于 0 ，所以最小应该为 0
    expect(domainMax(column)).toBeGreaterThan(0);

    column.changeData(data1);
    expect(domainMin(column)).toBeLessThan(0); // 不是所有数据大于 0， 所以最小应该小于 0
    expect(domainMax(column)).toBeGreaterThan(0);
  });
});
