import { Column } from '../../src';
import { createDiv, removeDom } from '../utils/dom';

describe('#2572', () => {
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
  });

  plot.render();
  const box = plot.chart.geometries[0].elements[0].getBBox();
  const point = { x: box.x + box.width / 2, y: box.y + box.height / 2 };

  expect(plot.chart.getController('tooltip').getTooltipItems(point).length).toBe(3);

  it('堆叠分组柱状图 tooltip 展示不正常', () => {
    plot.chart.showTooltip(point);

    expect(div.querySelectorAll('.g2-tooltip-list-item').length).toBe(3 * 2 /** 分组：男 + 女 */);
    expect((div.querySelector('.g2-tooltip-name') as HTMLElement).innerText).toBe(
      `${data[0].product_sub_type} - ${data[0].sex}`
    );
    expect((div.querySelector('.g2-tooltip-value') as HTMLElement).innerText).toBe(`${data[0].order_amt}`);
    plot.chart.hideTooltip();
  });

  it('堆叠分组柱状图 tooltip 更新 formatter', () => {
    plot.update({
      tooltip: {
        formatter: (datum) => ({ name: 'xx', value: 100 }),
      },
    });
    plot.chart.showTooltip(point);

    expect((div.querySelector('.g2-tooltip-name') as HTMLElement).innerText).toBe('xx');
    expect((div.querySelector('.g2-tooltip-value') as HTMLElement).innerText).toBe('100');
    plot.chart.hideTooltip();

    plot.update({
      tooltip: {
        formatter: (datum) => ({ name: datum.sex, value: 100 }),
      },
    });

    plot.chart.showTooltip(point);

    expect((div.querySelectorAll('.g2-tooltip-name')[1] as HTMLElement).innerText).toBe('女');
    expect((div.querySelectorAll('.g2-tooltip-value')[1] as HTMLElement).innerText).toBe('100');
    plot.chart.hideTooltip();
  });

  it('堆叠分组柱状图 tooltip 更新 customContent', () => {
    plot.update({
      tooltip: {
        customContent: (title, items) =>
          `<div><div class="tooltip-title">${title}</div><div class="tooltip-name">${
            items.length
          }</div><div class="tooltip-value">${items.reduce((a, b) => a + b.data.order_amt, 0)}</div></div>`,
      },
    });
    plot.chart.showTooltip(point);

    expect((div.querySelector('.tooltip-title') as HTMLElement).innerText).toBe(data[0].product_type);
    expect((div.querySelector('.tooltip-name') as HTMLElement).innerText).toBe('6');
    expect((div.querySelector('.tooltip-value') as HTMLElement).innerText).toBe(
      `${data.filter((d) => d.product_type === '办公用品').reduce((a, b) => a + b.order_amt, 0)}`
    );
    plot.chart.hideTooltip();
  });

  afterAll(() => {
    plot.destroy();
    removeDom(div);
  });
});
