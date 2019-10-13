import { Bar } from '../../src';
import { expect } from 'chai';

describe('Bar plot', () => {
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

  it('初始化以及销毁', () => {
    const barPlot = new Bar(canvasDiv, {
      width: 600,
      height: 600,
      padding: 'auto',
      data,
      xField: 'value',
      yField: 'year',
      xAxis: {
        visible: true,
      },
      yAxis: {
        visible: true,
      },
      animation: false,
    });
    barPlot.render();
    const plot = barPlot.getLayer().plot;
    const positionField = plot.get('elements')[0].get('position').fields;
    const isTransposed = plot.get('coord').isTransposed;
    const axes = plot.get('axisController').axes;

    expect(barPlot).to.be.instanceOf(Bar);
    expect(positionField[0]).to.be.equal('year');
    expect(positionField[1]).to.be.equal('value');
    expect(isTransposed).to.be.equal(true);
    expect(axes.length).to.be.equal(2);
    barPlot.destroy();
    expect(plot.destroyed).to.be.true;
  });

  it.skip('柱子样式配置', () => {
    const barPlot = new Bar(canvasDiv, {
      width: 600,
      height: 600,
      padding: 'auto',
      data,
      xField: 'value',
      yField: 'year',
      color: 'red',
      xAxis: {
        visible: true,
      },
      yAxis: {
        visible: true,
      },
      barSize: 20,
      barStyle: {
        stroke: 'black',
        lineWidth: 2,
      },
    });
    barPlot.render();
    const barEle = barPlot.plot.get('elements')[0];
    expect(barEle.get('color').values[0]).to.be.equal('red');
    expect(barEle.get('style').cfg.stroke).to.be.equal('black');
    expect(barEle.get('size').values[0]).to.be.equal(20);
    barPlot.destroy();
    expect(barPlot.plot.destroyed).to.be.true;
  });

  it.skip('每个柱子颜色不一样', () => {
    const barPlot = new Bar(canvasDiv, {
      width: 600,
      height: 600,
      padding: 'auto',
      data,
      xField: 'value',
      yField: 'year',
      color: ['red', 'blue', 'green', 'yellow', 'orange', 'gray', 'purple', 'brown'],
      xAxis: {
        visible: true,
      },
      yAxis: {
        visible: true,
      },
    });
    barPlot.render();
    const barEle = barPlot.plot.get('elements')[0];
    expect(barEle.get('color').values[0]).to.be.equal('red');
    expect(barEle.get('color').values[1]).to.be.equal('blue');
    barPlot.destroy();
    expect(barPlot.plot.destroyed).to.be.true;
  });

  it('隐藏两个坐标轴', () => {
    const barPlot = new Bar(canvasDiv, {
      width: 600,
      height: 600,
      padding: 'auto',
      data,
      xField: 'value',
      yField: 'year',
      xAxis: {
        visible: false,
      },
      yAxis: {
        visible: false,
      },
    });
    barPlot.render();
    const plot = barPlot.getLayer().plot;
    const axes = plot.get('axisController').axes;
    expect(axes.length).to.be.equal(0);
    barPlot.destroy();
    expect(plot.destroyed).to.be.true;
  });

  it('x轴 样式', () => {
    const barPlot = new Bar(canvasDiv, {
      width: 600,
      height: 600,
      padding: 80,
      data,
      xField: 'value',
      yField: 'year',
      xAxis: {
        min: 5,
        nice: false,
        visible: true,
        tickCount: 5,
        line: {
          visible: true,
          style: {
            stroke: 'red',
          },
        },
        tickLine: {
          visible: true,
          style: { stroke: 'red' },
        },
        label: {
          visible: true,
          formatter: (v) => {
            return v + 'abc';
          },
          style: { fill: 'red', fontSize: 24 },
        },
        title: {
          visible: true,
          text: 'xxxx',
          style: {
            fill: 'red',
            fontSize: 20,
          },
        },
      },
      yAxis: {
        visible: false,
      },
    });
    barPlot.render();
    const plot = barPlot.getLayer().plot;
    const axes = plot.get('axisController').axes;
    expect(axes.length).to.be.equal(1);
    const axis = axes[0];
    expect(axis.get('title').text).to.be.include('xxxx');
    expect(axis.get('title').textStyle.fill).to.be.equal('red');
    const labels = axis.get('labelItems');
    expect(labels[0].text).to.be.include('abc');
    // style
    const line = axis.get('line');
    const tickLine = axis.get('tickLine');
    expect(line.stroke).to.be.equal('red');
    expect(tickLine.stroke).to.be.equal('red');
    expect(labels[0].textStyle.fill).to.be.equal('red');
    barPlot.destroy();
    expect(plot.destroyed).to.be.true;
  });

  it('x轴 隐藏 grid line tick label', () => {
    const barPlot = new Bar(canvasDiv, {
      width: 600,
      height: 600,
      padding: 'auto',
      data,
      xField: 'value',
      yField: 'year',
      xAxis: {
        min: 5,
        nice: false,
        visible: true,
        tickCount: 5,
        line: {
          visible: false,
          stroke: 'red',
        },
        grid: {
          visible: false,
        },
        tickLine: { visible: false, stroke: 'red' },
        label: { visible: false, fill: 'red', fontSize: 24 },
      },
      yAxis: {
        visible: false,
      },
    });
    barPlot.render();
    const plot = barPlot.getLayer().plot;
    const axes = plot.get('axisController').axes;
    expect(axes.length).to.be.equal(1);
    const axis = axes[0];
    // style
    const line = axis.get('line');
    const tickLine = axis.get('tickLine');
    expect(line).to.be.equal(null);
    expect(tickLine).to.be.equal(null);
    barPlot.destroy();
    expect(plot.destroyed).to.be.true;
  });

  it('y轴 样式', () => {
    const barPlot = new Bar(canvasDiv, {
      width: 600,
      height: 600,
      padding: 'auto',
      data,
      xField: 'value',
      yField: 'year',
      yAxis: {
        min: 5,
        nice: false,
        visible: true,
        tickCount: 5,
        line: {
          visible: true,
          style: {
            stroke: 'red',
          },
        },
        tickLine: {
          visible: true,
          style: { stroke: 'red' },
        },
        title: {
          visible: true,
          // text: 'xxxx',
          style: {
            fontSize: 30,
            fill: 'red',
          },
        },
        label: {
          formatter: (v) => {
            return v + 'abc';
          },
          visible: true,
          style: {
            fill: 'red',
            fontSize: 24,
          },
        },
      },
      xAxis: {
        visible: false,
      },
    });
    barPlot.render();
    const plot = barPlot.getLayer().plot;
    const axes = plot.get('axisController').axes;
    expect(axes.length).to.be.equal(1);
    const axis = axes[0];
    const labels = axis.get('labelItems');
    expect(axis.get('title').text).to.be.include('year');
    expect(axis.get('title').textStyle.fill).to.be.equal('red');
    expect(labels[0].text).to.be.include('abc');
    // style
    const line = axis.get('line');
    const tickLine = axis.get('tickLine');
    expect(line.stroke).to.be.equal('red');
    expect(tickLine.stroke).to.be.equal('red');
    expect(labels[0].textStyle.fill).to.be.equal('red');
    barPlot.destroy();
    expect(plot.destroyed).to.be.true;
  });

  it('y轴 隐藏 grid line tick label', () => {
    const barPlot = new Bar(canvasDiv, {
      width: 600,
      height: 600,
      padding: 'auto',
      data,
      xField: 'value',
      yField: 'year',
      yAxis: {
        min: 5,
        nice: false,
        visible: true,
        tickCount: 5,
        line: {
          visible: false,
        },
        grid: {
          visible: false,
        },
        tickLine: { visible: false },
        label: { visible: false },
      },
      xAxis: {
        visible: false,
      },
    });
    barPlot.render();
    const plot = barPlot.getLayer().plot;
    const axes = plot.get('axisController').axes;
    expect(axes.length).to.be.equal(1);
    const axis = axes[0];
    // style
    const line = axis.get('line');
    const tickLine = axis.get('tickLine');
    expect(line).to.be.equal(null);
    expect(tickLine).to.be.equal(null);
    barPlot.destroy();
    expect(plot.destroyed).to.be.true;
  });
});
