import { Line } from '../../src';
import { basement } from '../data/basement';
import { income } from '../data/income';

describe('Line plot', () => {
  const canvasDiv = document.createElement('div');
  canvasDiv.style.width = '600px';
  canvasDiv.style.height = '600px';
  canvasDiv.style.left = '30px';
  canvasDiv.style.top = '30px';
  canvasDiv.id = 'canvas1';
  document.body.appendChild(canvasDiv);

  it('单折线', () => {
    const data = [ {
      year: '1991',
      value: 3
    }, {
      year: '1992',
      value: 4
    }, {
      year: '1993',
      value: 3.5
    }, {
      year: '1994',
      value: 5
    }, {
      year: '1995',
      value: 4.9
    }, {
      year: '1996',
      value: 6
    }, {
      year: '1997',
      value: 7
    }, {
      year: '1998',
      value: 9
    }, {
      year: '1999',
      value: 13
    } ];

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
        size: 5
      },
      // padding: 'auto',
      tooltip: {
        shared: true,
        /* crosshairs: {
          type: 'y'
        }*/
      },
      yAxis: {
        min: 0
      },
    });

    linePlot.render();
  });

  it.only('多折线', () => {
    const data = [ {
      date: '2018/8/1',
      type: 'download',
      value: 4623
    }, {
      date: '2018/8/1',
      type: 'register',
      value: 2208
    }, {
      date: '2018/8/1',
      type: 'bill',
      value: 182
    }, {
      date: '2018/8/2',
      type: 'download',
      value: 6145
    }, {
      date: '2018/8/2',
      type: 'register',
      value: 2016
    }, {
      date: '2018/8/2',
      type: 'bill',
      value: 257
    }, {
      date: '2018/8/3',
      type: 'download',
      value: 508
    }, {
      date: '2018/8/3',
      type: 'register',
      value: 2916
    }, {
      date: '2018/8/3',
      type: 'bill',
      value: 289
    }, {
      date: '2018/8/4',
      type: 'download',
      value: 6268
    }, {
      date: '2018/8/4',
      type: 'register',
      value: 4512
    }, {
      date: '2018/8/4',
      type: 'bill',
      value: 428
    }, {
      date: '2018/8/5',
      type: 'download',
      value: 6411
    }, {
      date: '2018/8/5',
      type: 'register',
      value: 8281
    }, {
      date: '2018/8/5',
      type: 'bill',
      value: 619
    }, {
      date: '2018/8/6',
      type: 'download',
      value: 1890
    }, {
      date: '2018/8/6',
      type: 'register',
      value: 2008
    }, {
      date: '2018/8/6',
      type: 'bill',
      value: 87
    }, {
      date: '2018/8/7',
      type: 'download',
      value: 4251
    }, {
      date: '2018/8/7',
      type: 'register',
      value: 1963
    }, {
      date: '2018/8/7',
      type: 'bill',
      value: 706
    }, {
      date: '2018/8/8',
      type: 'download',
      value: 2978
    }, {
      date: '2018/8/8',
      type: 'register',
      value: 2367
    }, {
      date: '2018/8/8',
      type: 'bill',
      value: 387
    }, {
      date: '2018/8/9',
      type: 'download',
      value: 3880
    }, {
      date: '2018/8/9',
      type: 'register',
      value: 2956
    }, {
      date: '2018/8/9',
      type: 'bill',
      value: 488
    }, {
      date: '2018/8/10',
      type: 'download',
      value: 3606
    }, {
      date: '2018/8/10',
      type: 'register',
      value: 678
    }, {
      date: '2018/8/10',
      type: 'bill',
      value: 507
    }, {
      date: '2018/8/11',
      type: 'download',
      value: 4311
    }, {
      date: '2018/8/11',
      type: 'register',
      value: 3188
    }, {
      date: '2018/8/11',
      type: 'bill',
      value: 548
    }, {
      date: '2018/8/12',
      type: 'download',
      value: 4116
    }, {
      date: '2018/8/12',
      type: 'register',
      value: 3491
    }, {
      date: '2018/8/12',
      type: 'bill',
      value: 456
    }, {
      date: '2018/8/13',
      type: 'download',
      value: 6419
    }, {
      date: '2018/8/13',
      type: 'register',
      value: 2852
    }, {
      date: '2018/8/13',
      type: 'bill',
      value: 689
    }, {
      date: '2018/8/14',
      type: 'download',
      value: 1643
    }, {
      date: '2018/8/14',
      type: 'register',
      value: 4788
    }, {
      date: '2018/8/14',
      type: 'bill',
      value: 280
    }, {
      date: '2018/8/15',
      type: 'download',
      value: 445
    }, {
      date: '2018/8/15',
      type: 'register',
      value: 4319
    }, {
      date: '2018/8/15',
      type: 'bill',
      value: 176
    } ];

    const linePlot = new Line(canvasDiv, {
      padding: 'auto',
      title: {
        text: '测试测试测试'
      },
      description: {
        text: '你问我资瓷不资瓷，那我肯定是资瓷的'
      },
      data,
      xField: 'date',
      yField: 'value',
      width: 600,
      height: 600,
      seriesField: 'type',
      size: 2,
      label: {
        visible: false
      },
      tooltip: {
        shared: false,
        crosshairs: false
      },
      xAxis: {
        tickCount: 5,
        visible: false
      },
      yAxis: {
        visible: false
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
      padding: [ 10, 200, 150, 100 ],
      data: basement,
      xField: 'time',
      yField: 'UV',
      width: 600,
      height: 400,
      size: 2,
      yAxis: {
      },
      tooltip: {
        shared: false,
        crosshairs: false
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
        groupBy: 'year'
      }
    });

    linePlot.render();

  });

  it('animation', () => {
    const data = [ {
      date: '2018/8/1',
      type: 'download',
      value: 4623
    }, {
      date: '2018/8/1',
      type: 'register',
      value: 2208
    }, {
      date: '2018/8/1',
      type: 'bill',
      value: 182
    }, {
      date: '2018/8/2',
      type: 'download',
      value: 6145
    }, {
      date: '2018/8/2',
      type: 'register',
      value: 2016
    }, {
      date: '2018/8/2',
      type: 'bill',
      value: 257
    }, {
      date: '2018/8/3',
      type: 'download',
      value: 508
    }, {
      date: '2018/8/3',
      type: 'register',
      value: 2916
    }, {
      date: '2018/8/3',
      type: 'bill',
      value: 289
    }, {
      date: '2018/8/4',
      type: 'download',
      value: 6268
    }, {
      date: '2018/8/4',
      type: 'register',
      value: 4512
    }, {
      date: '2018/8/4',
      type: 'bill',
      value: 428
    }, {
      date: '2018/8/5',
      type: 'download',
      value: 6411
    }, {
      date: '2018/8/5',
      type: 'register',
      value: 8281
    }, {
      date: '2018/8/5',
      type: 'bill',
      value: 619
    }, {
      date: '2018/8/6',
      type: 'download',
      value: 1890
    }, {
      date: '2018/8/6',
      type: 'register',
      value: 2008
    }, {
      date: '2018/8/6',
      type: 'bill',
      value: 87
    }, {
      date: '2018/8/7',
      type: 'download',
      value: 4251
    }, {
      date: '2018/8/7',
      type: 'register',
      value: 1963
    }, {
      date: '2018/8/7',
      type: 'bill',
      value: 706
    }, {
      date: '2018/8/8',
      type: 'download',
      value: 2978
    }, {
      date: '2018/8/8',
      type: 'register',
      value: 2367
    }, {
      date: '2018/8/8',
      type: 'bill',
      value: 387
    }, {
      date: '2018/8/9',
      type: 'download',
      value: 3880
    }, {
      date: '2018/8/9',
      type: 'register',
      value: 2956
    }, {
      date: '2018/8/9',
      type: 'bill',
      value: 488
    }, {
      date: '2018/8/10',
      type: 'download',
      value: 3606
    }, {
      date: '2018/8/10',
      type: 'register',
      value: 678
    }, {
      date: '2018/8/10',
      type: 'bill',
      value: 507
    }, {
      date: '2018/8/11',
      type: 'download',
      value: 4311
    }, {
      date: '2018/8/11',
      type: 'register',
      value: 3188
    }, {
      date: '2018/8/11',
      type: 'bill',
      value: 548
    }, {
      date: '2018/8/12',
      type: 'download',
      value: 4116
    }, {
      date: '2018/8/12',
      type: 'register',
      value: 3491
    }, {
      date: '2018/8/12',
      type: 'bill',
      value: 456
    }, {
      date: '2018/8/13',
      type: 'download',
      value: 6419
    }, {
      date: '2018/8/13',
      type: 'register',
      value: 2852
    }, {
      date: '2018/8/13',
      type: 'bill',
      value: 689
    }, {
      date: '2018/8/14',
      type: 'download',
      value: 1643
    }, {
      date: '2018/8/14',
      type: 'register',
      value: 4788
    }, {
      date: '2018/8/14',
      type: 'bill',
      value: 280
    }, {
      date: '2018/8/15',
      type: 'download',
      value: 445
    }, {
      date: '2018/8/15',
      type: 'register',
      value: 4319
    }, {
      date: '2018/8/15',
      type: 'bill',
      value: 176
    } ];

    const linePlot = new Line(canvasDiv, {
      padding: 'auto',
      data,
      xField: 'date',
      yField: 'value',
      seriesField: 'type',
      width: 600,
      height: 400,
      size: 2,
      tooltip: false,
      xAxis: {
        tickCount: 5
        /* formatter: () => {
          return 'a';
        }*/
      },
      yAxis: {
        /* formatter: () => {
          return 'b';
        }*/
      },
      pointStyle: {
        size: 3,
        stroke: 'white',
        lineWidth: 2
      },
      /* label: {
        type: 'point',
        formatter: () => {
          return 'test';
        }
      },*/
      animation: {
        type: 'clipingWithData'
      },
      events: {
        onLegendClick: () => {
          // console.log('legend click');
        }
      }
    });
    linePlot.render();
  });


});
