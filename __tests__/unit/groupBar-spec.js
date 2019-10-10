import { GroupBar } from '../../src';
import { expect } from 'chai';
import { isFunction } from 'util';

describe.skip('GroupBar plot', () => {
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
      value: 3,
      type: 'Lon',
    },
    {
      year: '1992',
      value: 4,
      type: 'Lon',
    },
    {
      year: '1993',
      value: 3.5,
      type: 'Lon',
    },
    {
      year: '1994',
      value: 5,
      type: 'Lon',
    },
    {
      year: '1995',
      value: 4.9,
      type: 'Lon',
    },
    {
      year: '1996',
      value: 6,
      type: 'Lon',
    },
    {
      year: '1997',
      value: 7,
      type: 'Lon',
    },
    {
      year: '1998',
      value: 9,
      type: 'Lon',
    },
    {
      year: '1999',
      value: 13,
      type: 'Lon',
    },
    {
      year: '1991',
      value: 3,
      type: 'Bor',
    },
    {
      year: '1992',
      value: 4,
      type: 'Bor',
    },
    {
      year: '1993',
      value: 3.5,
      type: 'Bor',
    },
    {
      year: '1994',
      value: 5,
      type: 'Bor',
    },
    {
      year: '1995',
      value: 4.9,
      type: 'Bor',
    },
    {
      year: '1996',
      value: 6,
      type: 'Bor',
    },
    {
      year: '1997',
      value: 7,
      type: 'Bor',
    },
    {
      year: '1998',
      value: 9,
      type: 'Bor',
    },
    {
      year: '1999',
      value: 13,
      type: 'Bor',
    },
  ];

  it('初始化以及销毁', () => {
    const barPlot = new GroupBar(canvasDiv, {
      width: 600,
      height: 600,
      data,
      padding: 'auto',
      xField: 'value',
      yField: 'year',
      yAxis: {
        min: 0,
      },
      groupField: 'type',
    });
    barPlot.render();
    const plot = barPlot.getLayer().plot;
    const intervalShape = plot.get('elements')[0];
    const shapes = intervalShape.get('shapeContainer').get('children');
    expect(shapes.length).to.be.equal(18);
    expect(intervalShape.get('groupScales')[0].field).to.be.equal('type');
    expect(intervalShape.get('adjustOptions')[0].type).to.be.equal('dodge');
    barPlot.destroy();
    expect(plot.destroyed).to.be.true;
  });

  it('color size and interval style', () => {
    const barPlot = new GroupBar(canvasDiv, {
      width: 600,
      height: 600,
      data,
      xField: 'value',
      yField: 'year',
      yAxis: {
        min: 0,
      },
      groupField: 'type',
      barSize: 7,
      color: ['red', 'yellow'],
    });
    barPlot.render();
    const plot = barPlot.getLayer().plot;
    const intervalEle = plot.get('elements')[0];
    expect(intervalEle.get('color').values[0]).to.be.equal('red');
    expect(intervalEle.get('color').values[1]).to.be.equal('yellow');
    expect(intervalEle.get('size').values[0]).to.be.equal(7);
    barPlot.destroy();
    expect(plot.destroyed).to.be.true;
  });

  /* it('color map', () => {
    const barPlot = new GroupBar(canvasDiv, {
      data,
      xField: 'value',
      yField: 'year',
      yAxis: {
        min: 0
      },
      groupField: 'type',
      barSize: 7,
      color: {
        Lon: 'red',
        Bor: 'yellow'
      }
    });
    barPlot.render();
    const intervalEle = barPlot.plot.get('elements')[0];

    expect(isFunction(intervalEle.get('color').callback)).to.be.true;
    barPlot.destroy();
    expect(barPlot.plot.destroyed).to.be.true;
  });*/

  it('label', () => {
    const barPlot = new GroupBar(canvasDiv, {
      width: 600,
      height: 600,
      data,
      xField: 'value',
      yField: 'year',
      yAxis: {
        min: 0,
      },
      groupField: 'type',
      label: {
        formatter: (txt) => {
          return txt + 'dddd';
        },
        offsetX: 10,
        offsetY: 10,
        style: {
          fill: 'red',
        },
      },
    });
    barPlot.render();
    const plot = barPlot.getLayer().plot;
    const labelGroup = plot
      .get('elements')[0]
      .get('container')
      .get('children')[1]
      .get('children')[0]
      .get('children');
    // const panelGroup = barPlot.plot.get('panelRange');
    expect(labelGroup.length).to.be.equal(18);
    expect(labelGroup[0].attrs.fill).to.be.equal('red');
    expect(labelGroup[0].attrs.text).to.be.include('dddd');
    barPlot.destroy();
    expect(plot.destroyed).to.be.true;
  });

  it('legend style', () => {
    const barPlot = new GroupBar(canvasDiv, {
      width: 600,
      height: 600,
      padding: 'auto',
      data,
      xField: 'value',
      yField: 'year',
      yAxis: {
        min: 0,
      },
      groupField: 'type',
      legend: {
        visible: true,
        position: 'right-top',
        title: {
          visible: true,
        },
        showTitle: true,
        style: {},
      },
    });
    barPlot.render();

    const plot = barPlot.getLayer().plot;
    const legendCon = plot.get('legendController');
    expect(legendCon.legends.length).to.be.equal(1);
    expect(legendCon.legends[0].get('position')).to.be.equal('right-top');

    barPlot.destroy();
    expect(plot.destroyed).to.be.true;
  });

  it('legend visible false', () => {
    const barPlot = new GroupBar(canvasDiv, {
      width: 600,
      height: 600,
      data,
      xField: 'value',
      yField: 'year',
      yAxis: {
        min: 0,
      },
      groupField: 'type',
      label: {
        formatter: (txt) => {
          return txt + 'dddd';
        },
        offsetX: 10,
        offsetY: 10,
        style: {
          fill: 'red',
        },
      },
      legend: {
        visible: false,
      },
    });
    barPlot.render();

    const plot = barPlot.getLayer().plot;
    const legendCon = plot.get('legendController');
    expect(legendCon.legends.length).to.be.equal(0);
    barPlot.destroy();
    expect(plot.destroyed).to.be.true;
  });
});
