import { Stock } from '../../../../src';
import { kdata } from '../../../data/stock';
import { createDiv } from '../../../utils/dom';

describe('stock', () => {
  it('change data', () => {
    const stock = new Stock(createDiv(), {
      width: 400,
      height: 300,
      data: kdata,
      xField: 'date',
      yField: ['start', 'end', 'max', 'min'],
      meta: {
        date: {
          mask: 'YYYY',
        },
      },
    });

    stock.render();

    expect(stock.chart.geometries[0].elements.length).toEqual(kdata.length);

    const newData = [
      ...kdata,
      { date: '2015-10-25', start: 8, max: 8.54, min: 4.99, end: 4.99, volumn: 2769.31, money: 19337.44 },
    ];
    stock.changeData(newData);
    expect(stock.chart.geometries[0].elements.length).toEqual(kdata.length + 1);
    // 添加的数据
    const addData = stock.chart.geometries[0].data[newData.length - 1];
    expect(addData.date).toEqual('2015-10-25');
    expect(stock.options.data).toEqual(newData);
    stock.destroy();
  });
});
