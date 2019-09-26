import { StackArea } from '../../src';
import { expect } from 'chai';

describe('stack-area plot', () => {
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
    const areaPlot = new StackArea(canvasDiv, {
      responsive: true,
      width: 600,
      height: 600,
      padding: 'auto',
      data,
      xField: 'year',
      yField: 'value',
      stackField: 'type',
      xAxis: {
        visible: true,
      },
      yAxis: {
        visible: true,
      },
      point: {
        visible: false,
      },
      line: {
        visible: true,
      },
      label: {
        visible: true,
        type: 'area',
        autoScale: true,
      },
    });
    areaPlot.render();
    const plot = areaPlot.getLayer().plot;
    const positionField = plot.get('elements')[0].get('position').fields;
    const colorField = plot.get('elements')[0].get('color').fields;
    const axes = plot.get('axisController').axes;

    expect(areaPlot).to.be.instanceOf(StackArea);
    expect(positionField[0]).to.be.equal('year');
    expect(positionField[1]).to.be.equal('value');
    expect(colorField[0]).to.be.equal('type');
    expect(axes.length).to.be.equal(2);
    areaPlot.destroy();
    expect(plot.destroyed).to.be.true;
  });

  it('area shape attr map', () => {
    const areaPlot = new StackArea(canvasDiv, {
      responsive: true,
      width: 600,
      height: 600,
      padding: 'auto',
      data,
      xField: 'year',
      yField: 'value',
      stackField: 'type',
      color: ['red', 'pink'],
      xAxis: {
        visible: true,
      },
      yAxis: {
        visible: true,
      },
      point: {
        visible: false,
      },
      line: {
        visible: true,
      },
      label: {
        visible: true,
        type: 'area',
        autoScale: true,
      },
    });
    areaPlot.render();
    const plot = areaPlot.getLayer().plot;
    const intervalEle = plot.get('elements')[0];
    expect(intervalEle.get('color').values[0]).to.be.equal('red');
    expect(intervalEle.get('color').values[1]).to.be.equal('pink');
    areaPlot.destroy();
    expect(plot.destroyed).to.be.true;
  });

  it('point shape attr map and style', () => {
    const areaPlot = new StackArea(canvasDiv, {
      responsive: true,
      width: 600,
      height: 600,
      padding: 'auto',
      data,
      xField: 'year',
      yField: 'value',
      stackField: 'type',
      color: ['red', 'pink'],
      xAxis: {
        visible: true,
      },
      yAxis: {
        visible: true,
      },
      point: {
        visible: true,
        size: 6,
        color: 'yellow',
        style: {
          strokeStyle: 'black',
          lineWidth: 2,
        },
      },
      line: {
        visible: false,
      },
      label: {
        visible: true,
        type: 'area',
        autoScale: true,
      },
    });
    areaPlot.render();
    const plot = areaPlot.getLayer().plot;
    const pointEle = plot.get('elements')[1];
    expect(pointEle.get('type')).to.be.equal('point');
    expect(pointEle.get('size').values[0]).to.be.equal(6);
    expect(pointEle.get('color').values[0]).to.be.equal('yellow');
    expect(pointEle.get('style').cfg.strokeStyle).to.be.equal('black');
    expect(pointEle.get('style').cfg.lineWidth).to.be.equal(2);
    areaPlot.destroy();
    expect(plot.destroyed).to.be.true;
  });

  it('point style func', () => {
    const styleFunc = (d) => {
      return {
        strokeStyle: 'black',
      };
    };
    const areaPlot = new StackArea(canvasDiv, {
      responsive: true,
      width: 600,
      height: 600,
      padding: 'auto',
      data,
      xField: 'year',
      yField: 'value',
      stackField: 'type',
      color: ['red', 'pink'],
      xAxis: {
        visible: true,
      },
      yAxis: {
        visible: true,
      },
      point: {
        visible: true,
        size: 6,
        color: 'yellow',
        style: styleFunc,
      },
      line: {
        visible: false,
      },
      label: {
        visible: true,
        type: 'area',
        autoScale: true,
      },
    });
    areaPlot.render();
    const plot = areaPlot.getLayer().plot;
    const pointEle = plot.get('elements')[1];
    expect(pointEle.get('style').callback).to.be.equal(styleFunc);
    areaPlot.destroy();
    expect(plot.destroyed).to.be.true;
  });

  it('line shape attr map and style', () => {
    const areaPlot = new StackArea(canvasDiv, {
      responsive: true,
      width: 600,
      height: 600,
      padding: 'auto',
      data,
      xField: 'year',
      yField: 'value',
      stackField: 'type',
      color: ['red', 'pink'],
      xAxis: {
        visible: true,
      },
      yAxis: {
        visible: true,
      },
      point: {
        visible: false,
        size: 6,
        color: 'yellow',
      },
      line: {
        visible: true,
        size: 4,
        color: 'purple',
        style: {
          strokeStyle: 'blue',
          lineWidth: 3,
        },
      },
      label: {
        visible: true,
        type: 'area',
        autoScale: true,
      },
    });
    areaPlot.render();
    const plot = areaPlot.getLayer().plot;
    const lineEle = plot.get('elements')[1];
    expect(lineEle.get('type')).to.be.equal('line');
    expect(lineEle.get('size').values[0]).to.be.equal(4);
    expect(lineEle.get('color').values[0]).to.be.equal('purple');
    expect(lineEle.get('style').cfg.strokeStyle).to.be.equal('blue');
    expect(lineEle.get('style').cfg.lineWidth).to.be.equal(3);
    areaPlot.destroy();
    expect(plot.destroyed).to.be.true;
  });

  it('line style func', () => {
    const styleFunc = (d) => {
      return {
        strokeStyle: 'black',
      };
    };
    const areaPlot = new StackArea(canvasDiv, {
      responsive: true,
      width: 600,
      height: 600,
      padding: 'auto',
      data,
      xField: 'year',
      yField: 'value',
      stackField: 'type',
      color: ['red', 'pink'],
      xAxis: {
        visible: true,
      },
      yAxis: {
        visible: true,
      },
      point: {
        visible: false,
        size: 6,
        color: 'yellow',
      },
      line: {
        visible: true,
        size: 4,
        color: 'purple',
        style: styleFunc,
      },
      label: {
        visible: true,
        type: 'area',
        autoScale: true,
      },
    });
    areaPlot.render();
    const plot = areaPlot.getLayer().plot;
    const lineEle = plot.get('elements')[1];
    expect(lineEle.get('style').callback).to.be.equal(styleFunc);
    areaPlot.destroy();
    expect(plot.destroyed).to.be.true;
  });
});
