import { GroupedColumn, Pie } from '../../src';
import { createDiv } from '../utils/dom';

describe('theme 在不同plot的设置互相影响', () => {
  const data = [
    {
      type: '家具家电',
      sales: 38,
    },
    {
      type: '粮油副食',
      sales: 52,
    },
    {
      type: '生鲜水果',
      sales: 61,
    },
    {
      type: '美容洗护',
      sales: 145,
    },
  ];

  it('bar render', () => {
    const div = createDiv('column-container');
    const column = new GroupedColumn(div, {
      theme: {
        legend: {
          margin: [0, 0, 0, 0],
        },
      },
      height: 250,
      data, // 图表数据
      xField: 'type', // 柱形在 x 方向位置映射对应的数据字段名，一般对应一个分类字段
      yField: 'sales', // 柱形在 y 方向高度映射所对应的数据字段名，一般对应一个离散字段
      groupField: 'type',
      legend: {
        visible: true,
        position: 'left-center',
        flipPage: true,
      },
      padding: 'auto',
      xAxis: {
        title: {
          visible: false,
        },
      },
      yAxis: {
        title: {
          visible: false,
        },
      },
    });

    // Step 3: 渲染图表
    column.render();
    div.style.height = '250px';
    // @ts-ignore
    expect(column.getLayer().theme.legend.margin).toEqual([0, 0, 0, 0]);
  });
  it('pie render', () => {
    const div = createDiv('pie-container');
    const pie = new Pie(div, {
      height: 250,
      radius: 1,
      padding: 'auto',
      data, // 图表数据
      colorField: 'type', // 柱形在 x 方向位置映射对应的数据字段名，一般对应一个分类字段
      angleField: 'sales', // 柱形在 y 方向高度映射所对应的数据字段名，一般对应一个离散字段
      legend: {
        visible: true,
        position: 'left-center',
      },
    });

    pie.render();
    div.style.height = '250px';
    // @ts-ignore
    expect(pie.getLayer().theme.legend.margin).not.toEqual([0, 0, 0, 0]);
  });
});
