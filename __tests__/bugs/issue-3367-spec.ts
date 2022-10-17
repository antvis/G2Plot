import { Column } from '../../src';
import { createDiv } from '../utils/dom';

describe('#3367', () => {
  const customItems = jest.fn((items) => items);
  const data = [
    {
      product_type: '办公用品',
      sex: '男',
      order_amt: 8,
      product_sub_type: '橡皮擦',
    },
    {
      product_type: '办公用品',
      sex: '男',
      order_amt: 10,
      product_sub_type: '书架',
    },
    {
      product_type: '办公用品',
      sex: '男',
      order_amt: 20,
      product_sub_type: '砚台',
    },
    {
      product_type: '办公用品',
      sex: '女',
      order_amt: 13,
      product_sub_type: '砚台',
    },
    {
      product_type: '办公用品',
      sex: '女',
      order_amt: 21,
      product_sub_type: '橡皮擦',
    },
    {
      product_type: '办公用品',
      sex: '女',
      order_amt: 21,
      product_sub_type: '书架',
    },
    {
      product_type: '家电家具',
      sex: '男',
      order_amt: 13,
      product_sub_type: '洗衣机',
    },
    {
      product_type: '家电家具',
      sex: '女',
      order_amt: 2,
      product_sub_type: '洗衣机',
    },
    {
      product_type: '家电家具',
      sex: '男',
      order_amt: 5,
      product_sub_type: '微波炉',
    },
    {
      product_type: '家电家具',
      sex: '男',
      order_amt: 14,
      product_sub_type: '电磁炉',
    },
    {
      product_type: '家电家具',
      sex: '女',
      order_amt: 23,
      product_sub_type: '微波炉',
    },
    {
      product_type: '家电家具',
      sex: '女',
      order_amt: 23,
      product_sub_type: '电磁炉',
    },
    {
      product_type: '电子产品',
      sex: '男',
      order_amt: 33,
      product_sub_type: '电脑',
    },
    {
      product_type: '电子产品',
      sex: '女',
      order_amt: 4,
      product_sub_type: '电脑',
    },
    {
      product_type: '电子产品',
      sex: '女',
      order_amt: 23,
      product_sub_type: 'switch',
    },
    {
      product_type: '电子产品',
      sex: '男',
      order_amt: 20.9,
      product_sub_type: 'switch',
    },
    {
      product_type: '电子产品',
      sex: '男',
      order_amt: 5.9,
      product_sub_type: '鼠标',
    },
    {
      product_type: '电子产品',
      sex: '女',
      order_amt: 5.9,
      product_sub_type: '鼠标',
    },
  ];
  const div = createDiv();
  const plot = new Column(div, {
    data,
    xField: 'product_type',
    yField: 'order_amt',
    isGroup: true,
    isStack: true,
    seriesField: 'product_sub_type',
    groupField: 'sex',
    tooltip: {
      customItems,
    },
  });

  plot.render();
  const box = plot.chart.geometries[0].elements[0].getBBox();
  const point = { x: box.x + box.width / 2, y: box.y + box.height / 2 };

  expect(plot.chart.getController('tooltip').getTooltipItems(point).length).toBe(3);

  it('堆叠分组柱状图 customItems 没有被调用', () => {
    plot.chart.showTooltip(point);
    expect(customItems).toBeCalled();
  });
});
