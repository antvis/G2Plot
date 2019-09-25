import { Area } from '../../src';
import { expect } from 'chai';

describe('Column plot', () => {
  const canvasDiv = document.createElement('div');
  canvasDiv.style.width = '600px';
  canvasDiv.style.height = '600px';
  canvasDiv.style.left = '30px';
  canvasDiv.style.top = '30px';
  canvasDiv.id = 'canvas1';
  document.body.appendChild(canvasDiv);

  const data = [
    {
      year: '1991',
      value: 31,
    },
    {
      year: '1992',
      value: 41,
    },
    {
      year: '1993',
      value: 35,
    },
    {
      year: '1994',
      value: 55,
    },
    {
      year: '1995',
      value: 49,
    },
    {
      year: '1996',
      value: 15,
    },
    {
      year: '1997',
      value: 17,
    },
    {
      year: '1998',
      value: 29,
    },
    {
      year: '1999',
      value: 33,
    },
  ];

  const data2 = [
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

  it('初始化以及销毁', () => {
    const areaPlot = new Area(canvasDiv, {
      width: 600,
      height: 600,
      padding: 'auto',
      data,
      xField: 'year',
      yField: 'value',
      xAxis: {
        visible: true,
      },
      yAxis: {
        visible: true,
      },
      areaStyle: {
        stroke: 'black',
        lineWidth: 2,
      },
      point: {
        visible: true,
        size: 8,
      },
      line: {
        visible: true,
      },
      label: {
        visible: true,
        type: 'point',
      },
      color: 'green',
      responsive: true,
    });
    areaPlot.render();
    const plot = areaPlot.getLayer().plot;
    const positionField = plot.get('elements')[0].get('position').fields;
    const axes = areaPlot.plot.get('axisController').axes;

    expect(areaPlot).to.be.instanceOf(Area);
    expect(positionField[0]).to.be.equal('year');
    expect(positionField[1]).to.be.equal('value');
    expect(axes.length).to.be.equal(2);
    areaPlot.destroy();
    expect(plot.destroyed).to.be.true;
  });

  it('area style', () => {
    const areaPlot = new Area(canvasDiv, {
      width: 600,
      height: 600,
      padding: 'auto',
      data,
      xField: 'year',
      yField: 'value',
      xAxis: {
        visible: true,
      },
      yAxis: {
        visible: true,
      },
      areaStyle: {
        strokeStyle: 'black',
        lineWidth: 2,
      },
      point: {
        visible: true,
        size: 8,
        style: {
          color: 'red',
        },
      },
      line: {
        visible: true,
        style: {
          size: 6,
          color: 'blue',
        },
      },
      label: {
        visible: true,
        type: 'point',
      },
      color: 'green',
      responsive: true,
    });
    areaPlot.render();
    const plot = areaPlot.getLayer().plot;
    const elements = plot.get('elements');
    expect(elements[0].get('type')).to.be.equal('area');
    expect(elements[0].get('style').cfg.strokeStyle).to.be.equal('black');
    areaPlot.destroy();
    expect(plot.destroyed).to.be.true;
  });

  it('line shape attr map', () => {
    const areaPlot = new Area(canvasDiv, {
      width: 600,
      height: 600,
      padding: 'auto',
      data,
      xField: 'year',
      yField: 'value',
      xAxis: {
        visible: true,
      },
      yAxis: {
        visible: true,
      },
      line: {
        visible: true,
        size: 6,
        color: 'pink',
      },
      label: {
        visible: true,
        type: 'point',
      },
      color: 'green',
      responsive: true,
    });
    areaPlot.render();
    const plot = areaPlot.getLayer().plot;
    const elements = plot.get('elements');
    expect(elements[1].get('type')).to.be.equal('line');
    expect(elements[1].get('size').values[0]).to.be.equal(6);
    expect(elements[1].get('color').values[0]).to.be.equal('pink');
    areaPlot.destroy();
    expect(plot.destroyed).to.be.true;
  });

  it('line style obj', () => {
    const areaPlot = new Area(canvasDiv, {
      width: 600,
      height: 600,
      padding: 'auto',
      data,
      xField: 'year',
      yField: 'value',
      xAxis: {
        visible: true,
      },
      yAxis: {
        visible: true,
      },
      // areaStyle: {
      //   stroke: 'black',
      //   lineWidth: 2
      // },
      // point: {
      //   visible: true,
      //   size: 8,
      //   style: {
      //     color: 'red',
      //   }
      // },
      line: {
        visible: true,
        size: 6,
        style: {
          color: 'blue',
        },
      },
      label: {
        visible: true,
        type: 'point',
      },
      color: 'green',
      responsive: true,
    });
    areaPlot.render();
    const plot = areaPlot.getLayer().plot;
    const elements = plot.get('elements');
    expect(elements[1].get('type')).to.be.equal('line');
    expect(elements[1].get('size').values[0]).to.be.equal(6);
    expect(elements[1].get('style').cfg.color).to.be.equal('blue');
    areaPlot.destroy();
    expect(plot.destroyed).to.be.true;
  });

  // it('line style func', () => {
  //   const areaPlot = new Area(canvasDiv, {
  //     width: 600,
  //     height: 600,
  //     padding: 'auto',
  //     data,
  //     xField: 'year',
  //     yField: 'value',
  //     xAxis: {
  //       visible: true,
  //     },
  //     yAxis: {
  //       visible: true,
  //     },
  //     areaStyle: {
  //       stroke: 'black',
  //       lineWidth: 2
  //     },
  //     point: {
  //       visible: true,
  //       size: 8,
  //       style: {
  //         color: 'red',
  //       }
  //     },
  //     line: {
  //       visible: true,
  //       style: {
  //         size: 6,
  //         color: 'blue'
  //       }
  //     },
  //     label: {
  //       visible: true,
  //       type: 'point'
  //     },
  //     color: 'green',
  //     responsive: true
  //   });
  //   areaPlot.render();
  //   const positionField = areaPlot.plot.get('elements')[0].get('position').fields;
  //   const axes = areaPlot.plot.get('axisController').axes;

  //   expect(areaPlot).to.be.instanceOf(Area);
  //   expect(positionField[0]).to.be.equal('year');
  //   expect(positionField[1]).to.be.equal('value');
  //   expect(axes.length).to.be.equal(2);
  //   // areaPlot.destroy();
  //   // expect(areaPlot.plot.destroyed).to.be.true;
  // });

  it('point shape attr map', () => {
    const areaPlot = new Area(canvasDiv, {
      width: 600,
      height: 600,
      padding: 'auto',
      data,
      xField: 'year',
      yField: 'value',
      xAxis: {
        visible: true,
      },
      yAxis: {
        visible: true,
      },
      point: {
        visible: true,
        size: 8,
        color: 'yellow',
      },
      line: {
        visible: true,
        size: 6,
        color: 'pink',
        style: {
          strokeStyle: 'blue',
        },
      },
      label: {
        visible: true,
        type: 'point',
      },
      color: 'green',
      responsive: true,
    });
    areaPlot.render();
    const plot = areaPlot.getLayer().plot;
    const elements = plot.get('elements');
    expect(elements[1].get('type')).to.be.equal('line');
    expect(elements[1].get('size').values[0]).to.be.equal(6);
    expect(elements[1].get('style').cfg.strokeStyle).to.be.equal('blue');
    expect(elements[2].get('type')).to.be.equal('point');
    expect(elements[2].get('size').values[0]).to.be.equal(8);
    expect(elements[2].get('color').values[0]).to.be.equal('yellow');
    areaPlot.destroy();
    expect(plot.destroyed).to.be.true;
  });

  it('point style obj', () => {
    const areaPlot = new Area(canvasDiv, {
      width: 600,
      height: 600,
      padding: 'auto',
      data,
      xField: 'year',
      yField: 'value',
      xAxis: {
        visible: true,
      },
      yAxis: {
        visible: true,
      },
      // areaStyle: {
      //   stroke: 'black',
      //   lineWidth: 2
      // },
      point: {
        visible: true,
        size: 8,
        color: 'yellow',
        style: {
          fillStyle: 'red',
        },
      },
      line: {
        visible: true,
        size: 6,
        color: 'pink',
        style: {
          strokeStyle: 'blue',
        },
      },
      label: {
        visible: true,
        type: 'point',
      },
      color: 'green',
      responsive: true,
    });
    areaPlot.render();
    const elements = areaPlot.plot.get('elements');
    expect(elements[1].get('type')).to.be.equal('line');
    expect(elements[1].get('size').values[0]).to.be.equal(6);
    expect(elements[1].get('style').cfg.strokeStyle).to.be.equal('blue');
    expect(elements[2].get('type')).to.be.equal('point');
    expect(elements[2].get('size').values[0]).to.be.equal(8);
    expect(elements[2].get('style').cfg.fillStyle).to.be.equal('red');
    areaPlot.destroy();
    expect(areaPlot.plot.destroyed).to.be.true;
  });

  it('area seriesField', () => {
    const areaPlot = new Area(canvasDiv, {
      width: 600,
      height: 600,
      padding: 'auto',
      data: data2,
      xField: 'date',
      yField: 'value',
      seriesField: 'type',
      xAxis: {
        visible: true,
      },
      yAxis: {
        visible: true,
      },
      areaStyle: {
        stroke: 'black',
        lineWidth: 2,
      },
      point: {
        visible: true,
        size: 8,
        color: 'yellow',
        style: {
          fillStyle: 'red',
        },
      },
      line: {
        visible: true,
        size: 6,
        color: 'pink',
        style: {
          strokeStyle: 'blue',
        },
      },
      label: {
        visible: true,
        type: 'point',
      },
      color: ['green', 'pink', 'yellow'],
      responsive: true,
    });
    areaPlot.render();
    const plot = areaPlot.getLayer().plot;
    const elements = plot.get('elements');
    expect(elements[0].get('type')).to.be.equal('area');
    expect(elements[0].get('color').values[0]).to.be.equal('green');
    expect(elements[0].get('color').fields[0]).to.be.equal('type');
    areaPlot.destroy();
    expect(plot.destroyed).to.be.true;
  });
});
