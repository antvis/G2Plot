import { Line } from '../../src';
import { basement } from '../data/basement';
import { income } from '../data/income';

describe('Line plot', () => {
  const canvasDiv = document.createElement('div');
  canvasDiv.style.width = '600px';
  canvasDiv.style.height = '600px';
  canvasDiv.style.left = '0px';
  canvasDiv.style.top = '0px';
  canvasDiv.style.backgroundColor = '#ccc';
  canvasDiv.id = 'canvas1';
  document.body.appendChild(canvasDiv);

  it('单折线', () => {
    const data = [
      {
        year: '1991',
        value: 3,
      },
      {
        year: '1992',
        value: 4,
      },
      {
        year: '1993',
        value: 3.5,
      },
      {
        year: '1994',
        value: 5,
      },
      {
        year: '1995',
        value: 4.9,
      },
      {
        year: '1996',
        value: 6,
      },
      {
        year: '1997',
        value: 7,
      },
      {
        year: '1998',
        value: 9,
      },
      {
        year: '1999',
        value: 13,
      },
    ];

    const linePlot = new Line(canvasDiv, {
      data,
      padding: 'auto',
      x: 'year',
      y: 'value',
      color: 'red',
      smooth: true,
      width: 600,
      height: 400,
      size: 2,
      point: {
        size: 5,
      },
      // padding: 'auto',
      tooltip: {
        shared: true,
        /* crosshairs: {
          type: 'y'
        }*/
      },
      yAxis: {
        min: 0,
      },
    });

    linePlot.render();
  });

  it('多折线', () => {
    const data = [
      {
        date: '2018/8/1',
        type: 'download',
        value: 4623,
      },
      {
        date: '2018/8/1',
        type: 'register',
        value: 2208,
      },
      {
        date: '2018/8/1',
        type: 'bill',
        value: 182,
      },
      {
        date: '2018/8/2',
        type: 'download',
        value: 6145,
      },
      {
        date: '2018/8/2',
        type: 'register',
        value: 2016,
      },
      {
        date: '2018/8/2',
        type: 'bill',
        value: 257,
      },
      {
        date: '2018/8/3',
        type: 'download',
        value: 508,
      },
      {
        date: '2018/8/3',
        type: 'register',
        value: 2916,
      },
      {
        date: '2018/8/3',
        type: 'bill',
        value: 289,
      },
      {
        date: '2018/8/4',
        type: 'download',
        value: 6268,
      },
      {
        date: '2018/8/4',
        type: 'register',
        value: 4512,
      },
      {
        date: '2018/8/4',
        type: 'bill',
        value: 428,
      },
      {
        date: '2018/8/5',
        type: 'download',
        value: 6411,
      },
      {
        date: '2018/8/5',
        type: 'register',
        value: 8281,
      },
      {
        date: '2018/8/5',
        type: 'bill',
        value: 619,
      },
      {
        date: '2018/8/6',
        type: 'download',
        value: 1890,
      },
      {
        date: '2018/8/6',
        type: 'register',
        value: 2008,
      },
      {
        date: '2018/8/6',
        type: 'bill',
        value: 87,
      },
      {
        date: '2018/8/7',
        type: 'download',
        value: 4251,
      },
      {
        date: '2018/8/7',
        type: 'register',
        value: 1963,
      },
      {
        date: '2018/8/7',
        type: 'bill',
        value: 706,
      },
      {
        date: '2018/8/8',
        type: 'download',
        value: 2978,
      },
      {
        date: '2018/8/8',
        type: 'register',
        value: 2367,
      },
      {
        date: '2018/8/8',
        type: 'bill',
        value: 387,
      },
      {
        date: '2018/8/9',
        type: 'download',
        value: 3880,
      },
      {
        date: '2018/8/9',
        type: 'register',
        value: 2956,
      },
      {
        date: '2018/8/9',
        type: 'bill',
        value: 488,
      },
      {
        date: '2018/8/10',
        type: 'download',
        value: 3606,
      },
      {
        date: '2018/8/10',
        type: 'register',
        value: 678,
      },
      {
        date: '2018/8/10',
        type: 'bill',
        value: 507,
      },
      {
        date: '2018/8/11',
        type: 'download',
        value: 4311,
      },
      {
        date: '2018/8/11',
        type: 'register',
        value: 3188,
      },
      {
        date: '2018/8/11',
        type: 'bill',
        value: 548,
      },
      {
        date: '2018/8/12',
        type: 'download',
        value: 4116,
      },
      {
        date: '2018/8/12',
        type: 'register',
        value: 3491,
      },
      {
        date: '2018/8/12',
        type: 'bill',
        value: 456,
      },
      {
        date: '2018/8/13',
        type: 'download',
        value: 6419,
      },
      {
        date: '2018/8/13',
        type: 'register',
        value: 2852,
      },
      {
        date: '2018/8/13',
        type: 'bill',
        value: 689,
      },
      {
        date: '2018/8/14',
        type: 'download',
        value: 1643,
      },
      {
        date: '2018/8/14',
        type: 'register',
        value: 4788,
      },
      {
        date: '2018/8/14',
        type: 'bill',
        value: 280,
      },
      {
        date: '2018/8/15',
        type: 'download',
        value: 445,
      },
      {
        date: '2018/8/15',
        type: 'register',
        value: 4319,
      },
      {
        date: '2018/8/15',
        type: 'bill',
        value: 176,
      },
    ];

    const linePlot = new Line(canvasDiv, {
      padding: 'auto',
      title: {
        text: '测试测试测试',
      },
      description: {
        text:
          '感觉确实是这样，这便是一个理工男向科幻文学大师成长的路线。不光是作家，很多科幻爱好者也是，起初科幻对于他们来说更多的是被里面的科幻设定所吸引，但是到后面那些科幻设定下的宇宙，社会，哲学等等就开始散发出它独特的魅力了。',
      },
      data,
      xField: 'date',
      yField: 'value',
      legend: {
        visible: false,
      },
      width: 600,
      height: 600,
      seriesField: 'type',
      size: 2,
      label: {
        visible: false,
      },
      tooltip: {
        visible: false,
        shared: false,
        crosshairs: false,
      },
      xAxis: {
        tickCount: 5,
        visible: false,
      },
      yAxis: {
        visible: false,
      },
      /* point: {
        size: 4,
        shape: 'hollowCircle',
      },*/
    });

    linePlot.render();
  });

  it('timeGrouping - month', () => {
    const linePlot = new Line(canvasDiv, {
      padding: [10, 200, 150, 100],
      data: basement,
      xField: 'time',
      yField: 'UV',
      width: 600,
      height: 400,
      size: 2,
      yAxis: {},
      tooltip: {
        shared: false,
        crosshairs: false,
      },
    });

    linePlot.render();
  });

  it('timeGrouping - year', () => {
    const linePlot = new Line(canvasDiv, {
      padding: 'auto',
      data: income,
      xField: 'time',
      yField: 'rate',
      color: 'red',
      width: 600,
      height: 400,
      size: 2,
      yAxis: {},
      xAxis: {
        groupBy: 'year',
      },
    });

    linePlot.render();
  });

  it.only('animation', () => {
    const data = [
      {
        date: '2018/8/1',
        type: 'download',
        value: 4623,
      },
      {
        date: '2018/8/1',
        type: 'register',
        value: 2208,
      },
      {
        date: '2018/8/1',
        type: 'bill',
        value: 182,
      },
      {
        date: '2018/8/2',
        type: 'download',
        value: 6145,
      },
      {
        date: '2018/8/2',
        type: 'register',
        value: 2016,
      },
      {
        date: '2018/8/2',
        type: 'bill',
        value: 257,
      },
      {
        date: '2018/8/3',
        type: 'download',
        value: 508,
      },
      {
        date: '2018/8/3',
        type: 'register',
        value: 2916,
      },
      {
        date: '2018/8/3',
        type: 'bill',
        value: 289,
      },
      {
        date: '2018/8/4',
        type: 'download',
        value: 6268,
      },
      {
        date: '2018/8/4',
        type: 'register',
        value: 4512,
      },
      {
        date: '2018/8/4',
        type: 'bill',
        value: 428,
      },
      {
        date: '2018/8/5',
        type: 'download',
        value: 6411,
      },
      {
        date: '2018/8/5',
        type: 'register',
        value: 8281,
      },
      {
        date: '2018/8/5',
        type: 'bill',
        value: 619,
      },
      {
        date: '2018/8/6',
        type: 'download',
        value: 1890,
      },
      {
        date: '2018/8/6',
        type: 'register',
        value: 2008,
      },
      {
        date: '2018/8/6',
        type: 'bill',
        value: 87,
      },
      {
        date: '2018/8/7',
        type: 'download',
        value: 4251,
      },
      {
        date: '2018/8/7',
        type: 'register',
        value: 1963,
      },
      {
        date: '2018/8/7',
        type: 'bill',
        value: 706,
      },
      {
        date: '2018/8/8',
        type: 'download',
        value: 2978,
      },
      {
        date: '2018/8/8',
        type: 'register',
        value: 2367,
      },
      {
        date: '2018/8/8',
        type: 'bill',
        value: 387,
      },
      {
        date: '2018/8/9',
        type: 'download',
        value: 3880,
      },
      {
        date: '2018/8/9',
        type: 'register',
        value: 2956,
      },
      {
        date: '2018/8/9',
        type: 'bill',
        value: 488,
      },
      {
        date: '2018/8/10',
        type: 'download',
        value: 3606,
      },
      {
        date: '2018/8/10',
        type: 'register',
        value: 678,
      },
      {
        date: '2018/8/10',
        type: 'bill',
        value: 507,
      },
      {
        date: '2018/8/11',
        type: 'download',
        value: 4311,
      },
      {
        date: '2018/8/11',
        type: 'register',
        value: 3188,
      },
      {
        date: '2018/8/11',
        type: 'bill',
        value: 548,
      },
      {
        date: '2018/8/12',
        type: 'download',
        value: 4116,
      },
      {
        date: '2018/8/12',
        type: 'register',
        value: 3491,
      },
      {
        date: '2018/8/12',
        type: 'bill',
        value: 456,
      },
      {
        date: '2018/8/13',
        type: 'download',
        value: 6419,
      },
      {
        date: '2018/8/13',
        type: 'register',
        value: 2852,
      },
      {
        date: '2018/8/13',
        type: 'bill',
        value: 689,
      },
      {
        date: '2018/8/14',
        type: 'download',
        value: 1643,
      },
      {
        date: '2018/8/14',
        type: 'register',
        value: 4788,
      },
      {
        date: '2018/8/14',
        type: 'bill',
        value: 280,
      },
      {
        date: '2018/8/15',
        type: 'download',
        value: 445,
      },
      {
        date: '2018/8/15',
        type: 'register',
        value: 4319,
      },
      {
        date: '2018/8/15',
        type: 'bill',
        value: 176,
      },
    ];

    const data2 = [
      {
        '612ceb01-c32d-497d-9929-fdda390bac78': '2019-06-27',
        $$series$$: 'profit_amt',
        $$measure$$: 8,
      },
      {
        '612ceb01-c32d-497d-9929-fdda390bac78': '2019-06-27',
        $$series$$: 'other_number',
        $$measure$$: 17179869176,
      },
      {
        '612ceb01-c32d-497d-9929-fdda390bac78': '2019-06-28',
        $$series$$: 'profit_amt',
        $$measure$$: 10,
      },
      {
        '612ceb01-c32d-497d-9929-fdda390bac78': '2019-06-28',
        $$series$$: 'other_number',
        $$measure$$: 34359738352,
      },
      {
        '612ceb01-c32d-497d-9929-fdda390bac78': '2019-06-29',
        $$series$$: 'profit_amt',
        $$measure$$: 16,
      },
      {
        '612ceb01-c32d-497d-9929-fdda390bac78': '2019-06-29',
        $$series$$: 'other_number',
        $$measure$$: 34359738352,
      },
      {
        '612ceb01-c32d-497d-9929-fdda390bac78': '2019-06-30',
        $$series$$: 'profit_amt',
        $$measure$$: 11,
      },
      {
        '612ceb01-c32d-497d-9929-fdda390bac78': '2019-06-30',
        $$series$$: 'other_number',
        $$measure$$: 23622320117,
      },
      {
        '612ceb01-c32d-497d-9929-fdda390bac78': '2019-07-01',
        $$series$$: 'profit_amt',
        $$measure$$: 11,
      },
      {
        '612ceb01-c32d-497d-9929-fdda390bac78': '2019-07-01',
        $$series$$: 'other_number',
        $$measure$$: 23622320117,
      },
      {
        '612ceb01-c32d-497d-9929-fdda390bac78': '2019-07-02',
        $$series$$: 'profit_amt',
        $$measure$$: 18,
      },
      {
        '612ceb01-c32d-497d-9929-fdda390bac78': '2019-07-02',
        $$series$$: 'other_number',
        $$measure$$: 38654705646,
      },
      {
        '612ceb01-c32d-497d-9929-fdda390bac78': '2019-07-03',
        $$series$$: 'profit_amt',
        $$measure$$: 14,
      },
      {
        '612ceb01-c32d-497d-9929-fdda390bac78': '2019-07-03',
        $$series$$: 'other_number',
        $$measure$$: 30064771058,
      },
    ];

    const data3 = [
      {
        year: 2013,
        type: '食品烟酒',
        value: 4127,
      },
      {
        year: 2013,
        type: '衣着',
        value: 1027,
      },
      {
        year: 2013,
        type: '居住',
        value: 2999,
      },
      {
        year: 2013,
        type: '生活用品',
        value: 806,
      },
      {
        year: 2013,
        type: '交通通行',
        value: 1627,
      },
      {
        year: 2013,
        type: '文教娱',
        value: 1398,
      },
      {
        year: 2013,
        type: '医疗保健',
        value: 912,
      },
      {
        year: 2013,
        type: '其他',
        value: 325,
      },
      {
        year: 2014,
        type: '食品烟酒',
        value: 4494,
      },
      {
        year: 2014,
        type: '衣着',
        value: 1099,
      },
      {
        year: 2014,
        type: '居住',
        value: 3201,
      },
      {
        year: 2014,
        type: '生活用品',
        value: 890,
      },
      {
        year: 2014,
        type: '交通通行',
        value: 1869,
      },
      {
        year: 2014,
        type: '文教娱',
        value: 1536,
      },
      {
        year: 2014,
        type: '医疗保健',
        value: 1045,
      },
      {
        year: 2014,
        type: '其他',
        value: 358,
      },
      {
        year: 2015,
        type: '食品烟酒',
        value: 4814,
      },
      {
        year: 2015,
        type: '衣着',
        value: 1164,
      },
      {
        year: 2015,
        type: '居住',
        value: 3419,
      },
      {
        year: 2015,
        type: '生活用品',
        value: 951,
      },
      {
        year: 2015,
        type: '交通通行',
        value: 2087,
      },
      {
        year: 2015,
        type: '文教娱',
        value: 1723,
      },
      {
        year: 2015,
        type: '医疗保健',
        value: 1165,
      },
      {
        year: 2015,
        type: '其他',
        value: 389,
      },
      {
        year: 2016,
        type: '食品烟酒',
        value: 5151,
      },
      {
        year: 2016,
        type: '衣着',
        value: 1203,
      },
      {
        year: 2016,
        type: '居住',
        value: 3746,
      },
      {
        year: 2016,
        type: '生活用品',
        value: 1044,
      },
      {
        year: 2016,
        type: '交通通行',
        value: 2338,
      },
      {
        year: 2016,
        type: '文教娱',
        value: 1915,
      },
      {
        year: 2016,
        type: '医疗保健',
        value: 1307,
      },
      {
        year: 2016,
        type: '其他',
        value: 406,
      },
    ];

    const linePlot = new Line(canvasDiv, {
      title: {
        text: '测试测试测试测试',
      },
      description: {
        text:
          '当秒级数据需要频繁刷新时（5 s 刷新一次），更新时的动画是重新渲染整个图表，闪烁明显且太频繁，期望是刷新数据时，像心电图的效果，图线向左移动，旧数据消失。',
      },
      /* meta: {
        year: {
          field: 'year',
          alias: 'x',
          formatter: () => {
            return 'test';
          }
        },
        type: {
          field: 'type',
          alias: 'color',
          formatter: () => {
            return 'test';
          }
        },
        value: {
          field: 'value',
          alias: 'y'
        }
      },*/
      forceFit: false,
      padding: 'auto',
      data: data3,
      xField: /* 'date'*/ 'year',
      yField: /* 'value'*/ 'value',
      seriesField: /* 'type'*/ 'type',
      width: 600,
      height: 600,
      size: 2,
      // smooth: true,
      tooltip: {
        // visible: false,
      },
      legend: {
        visible: true,
        flipPage: true,
        position: 'top-left',
      },
      xAxis: {
        grid: {
          visible: false,
        },
        title: {
          visible: true,
        },
        label: {
          visible: true,
          style: {
            fill: 'red',
          },
        },
        autoRotateLabel: true,
      },
      yAxis: {
        type: 'value',
        title: {
          visible: true,
        },
        label: {
          visible: true,
        },
      },
      label: {
        visible: true,
        type: 'point',
      },
      point: {
        visible: true,
        /* style: {
           size: 5,
          color: 'red',
          shape: 'circle'
        }*/
      },
      animation: false,
      events: {
        onLegendClick: () => {
          // console.log('legend click');
        },
      },
    });
    linePlot.render();
  });
});
