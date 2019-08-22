import { StackBar, Bar, Line } from '../../src';
import Theme from '../../src/theme/theme';
import { expect } from 'chai';

function genShapeStyle(DEFAULT_COLOR) {
  const SHAPE_STYLE = {
    area: {
      fill: DEFAULT_COLOR,
    },
    hollowArea: {
      stroke: DEFAULT_COLOR,
    },
    box: {
      stroke: DEFAULT_COLOR,
    },
    edge: {
      stroke: DEFAULT_COLOR,
    },
    interval: {
      fill: DEFAULT_COLOR,
    },
    hollowInterval: {
      stroke: DEFAULT_COLOR,
    },
    kline: {
      fill: DEFAULT_COLOR,
      stroke: DEFAULT_COLOR,
    },
    line: {
      stroke: DEFAULT_COLOR,
    },
    polygon: {
      fill: DEFAULT_COLOR,
    },
    hollowPolygon: {
      stroke: DEFAULT_COLOR,
    },
    point: {
      fill: DEFAULT_COLOR,
    },
    hollowPoint: {
      stroke: DEFAULT_COLOR,
    },
    text: {
      fill: DEFAULT_COLOR,
    },
  };

  return {
    area: {
      area: {
        default: SHAPE_STYLE.area,
      },
      smooth: {
        default: SHAPE_STYLE.area,
      },
      line: {
        default: SHAPE_STYLE.hollowArea,
      },
      smoothLine: {
        default: SHAPE_STYLE.hollowArea,
      },
    },
    box: {
      box: {
        default: SHAPE_STYLE.box,
      },
    },
    edge: {
      line: {
        default: SHAPE_STYLE.edge,
      },
      vhv: {
        default: SHAPE_STYLE.edge,
      },
      smooth: {
        default: SHAPE_STYLE.edge,
      },
      arc: {
        default: SHAPE_STYLE.edge,
      },
    },
    interval: {
      rect: {
        default: SHAPE_STYLE.interval,
      },
      hollowInterval: {
        default: SHAPE_STYLE.hollowInterval,
      },
      line: {
        default: SHAPE_STYLE.hollowInterval,
      },
      tick: {
        default: SHAPE_STYLE.hollowInterval,
      },
      funnel: {
        default: SHAPE_STYLE.interval,
      },
      pyramid: {
        default: SHAPE_STYLE.interval,
      },
      'top-line': {
        default: SHAPE_STYLE.interval,
      },
    },
    kline: {
      kline: {
        default: SHAPE_STYLE.kline,
      },
    },
    line: {
      line: {
        default: SHAPE_STYLE.line,
      },
      dot: {
        default: SHAPE_STYLE.line,
      },
      dash: {
        default: SHAPE_STYLE.line,
      },
      smooth: {
        default: SHAPE_STYLE.line,
      },
      hv: {
        default: SHAPE_STYLE.line,
      },
      vh: {
        default: SHAPE_STYLE.line,
      },
      hvh: {
        default: SHAPE_STYLE.line,
      },
      vhv: {
        default: SHAPE_STYLE.line,
      },
    },
    polygon: {
      polygon: {
        default: SHAPE_STYLE.polygon,
      },
      hollow: {
        default: SHAPE_STYLE.hollowPolygon,
      },
    },
    point: {
      circle: {
        default: SHAPE_STYLE.point,
      },
      square: {
        default: SHAPE_STYLE.point,
      },
      bowtie: {
        default: SHAPE_STYLE.point,
      },
      diamond: {
        default: SHAPE_STYLE.point,
      },
      hexagon: {
        default: SHAPE_STYLE.point,
      },
      triangle: {
        default: SHAPE_STYLE.point,
      },
      triangleDown: {
        default: SHAPE_STYLE.point,
      },
      hollowCircle: {
        default: SHAPE_STYLE.hollowPoint,
      },
      hollowSquare: {
        default: SHAPE_STYLE.hollowPoint,
      },
      hollowBowtie: {
        default: SHAPE_STYLE.hollowPoint,
      },
      hollowDiamond: {
        default: SHAPE_STYLE.hollowPoint,
      },
      hollowHexagon: {
        default: SHAPE_STYLE.hollowPoint,
      },
      hollowTriangle: {
        default: SHAPE_STYLE.hollowPoint,
      },
      hollowTriangleDown: {
        default: SHAPE_STYLE.hollowPoint,
      },
      cross: {
        default: SHAPE_STYLE.hollowPoint,
      },
      tick: {
        default: SHAPE_STYLE.hollowPoint,
      },
      plus: {
        default: SHAPE_STYLE.hollowPoint,
      },
      hyphen: {
        default: SHAPE_STYLE.hollowPoint,
      },
      line: {
        default: SHAPE_STYLE.hollowPoint,
      },
      rect: {
        default: SHAPE_STYLE.point,
      },
      image: {
        default: SHAPE_STYLE.point,
      },
      path: {
        default: SHAPE_STYLE.point,
      },
    },
    text: {
      text: {
        default: SHAPE_STYLE.text,
      },
    },
  };
}

describe('主题测试', () => {
  const canvasDiv = document.createElement('div');
  canvasDiv.style.width = '600px';
  canvasDiv.style.height = '600px';
  canvasDiv.style.left = '30px';
  canvasDiv.style.top = '30px';
  canvasDiv.id = 'canvas1';
  document.body.appendChild(canvasDiv);

  const lightThemeCfg = {
    defaultColor: 'red',
    colors: ['red', 'yellow', 'dark'],
    background: {
      fill: 'blue',
    },
    shape: genShapeStyle('red'),
  };

  const darkThemeCfg = {
    colors: ['blue', 'green', 'pink'],
  };

  const lightTheme = new Theme('test-light');
  lightTheme.registerGlobalTheme(lightThemeCfg);

  const darkTheme = new Theme('test-dark');
  darkTheme.registerGlobalTheme(darkThemeCfg);

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
      value: 9,
      type: 'Bor',
    },
    {
      year: '1992',
      value: 9,
      type: 'Bor',
    },
    {
      year: '1993',
      value: 13.5,
      type: 'Bor',
    },
    {
      year: '1994',
      value: 7,
      type: 'Bor',
    },
    {
      year: '1995',
      value: 1,
      type: 'Bor',
    },
    {
      year: '1996',
      value: 9,
      type: 'Bor',
    },
    {
      year: '1997',
      value: 9.7,
      type: 'Bor',
    },
    {
      year: '1998',
      value: 3,
      type: 'Bor',
    },
    {
      year: '1999',
      value: 8,
      type: 'Bor',
    },
  ];

  const data2 = [
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
  ];

  it('全局主题 默认色', () => {
    Theme.setTheme('test-light');
    const barPlot = new Bar(canvasDiv, {
      data: data2,
      padding: 'auto',
      xField: 'value',
      yField: 'year',
      yAxis: {
        min: 0,
      },
    });
    barPlot.render();

    const intervalShape = barPlot.plot.get('elements')[0];
    const shapes = intervalShape.get('shapeContainer').get('children');
    expect(shapes[0].attrs.fill).to.be.equal('red');
    barPlot.destroy();
    expect(barPlot.plot.destroyed).to.be.true;

    const linePlot = new Line(canvasDiv, {
      data: data2,
      xField: 'year',
      yField: 'value',
    });
    linePlot.render();

    const lshapes = linePlot.plot
      .get('elements')[0]
      .get('shapeContainer')
      .get('children');
    expect(lshapes[0].attrs.stroke).to.be.equal('red');
    linePlot.destroy();
    expect(linePlot.plot.destroyed).to.be.true;
  });

  it('全局主题 色盘', () => {
    Theme.setTheme('test-light');
    const barPlot = new StackBar(canvasDiv, {
      data,
      padding: 'auto',
      xField: 'value',
      yField: 'year',
      yAxis: {
        min: 0,
      },
      stackField: 'type',
    });
    barPlot.render();

    const intervalShape = barPlot.plot.get('elements')[0];
    const shapes = intervalShape.get('shapeContainer').get('children');
    expect(shapes.length).to.be.equal(18);
    expect(shapes[0].attrs.fill).to.be.equal('red');
    expect(shapes[17].attrs.fill).to.be.equal('yellow');
    barPlot.destroy();
    expect(barPlot.plot.destroyed).to.be.true;

    const linePlot = new Line(canvasDiv, {
      data,
      xField: 'year',
      yField: 'value',
      seriesField: 'type',
    });
    linePlot.render();

    const lshapes = linePlot.plot
      .get('elements')[0]
      .get('shapeContainer')
      .get('children');
    expect(lshapes.length).to.be.equal(2);
    expect(lshapes[0].attrs.stroke).to.be.equal('red');
    expect(lshapes[1].attrs.stroke).to.be.equal('yellow');
    linePlot.destroy();
    expect(linePlot.plot.destroyed).to.be.true;
  });
});
