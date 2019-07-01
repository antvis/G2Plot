import { Area } from '../../src';
// import { expect } from 'chai';

describe('Column plot', () => {
  const canvasDiv = document.createElement('div');
  canvasDiv.style.width = '600px';
  canvasDiv.style.height = '600px';
  canvasDiv.style.left = '30px';
  canvasDiv.style.top = '30px';
  canvasDiv.id = 'canvas1';
  document.body.appendChild(canvasDiv);

  const data = [ {
    year: '1991',
    value: 31
  }, {
    year: '1992',
    value: 41
  }, {
    year: '1993',
    value: 35
  }, {
    year: '1994',
    value: 55
  }, {
    year: '1995',
    value: 49
  }, {
    year: '1996',
    value: 15
  }, {
    year: '1997',
    value: 17
  }, {
    year: '1998',
    value: 29
  }, {
    year: '1999',
    value: 33
  } ];

  it('初始化以及销毁', () => {
    const areaPlot = new Area(canvasDiv, {
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
        style: {
          color: 'green',
          size: 8
        }
      },
      line: {
        visible: true,
        style: {
          color: 'blue',
          size: 4
        }
      },
      label: {
        visible: true,
        // type: 'point'
      },
      color: 'red',
    });
    areaPlot.render();
    // const positionField = areaPlot.plot.get('elements')[0].get('position').fields;
    // const isTransposed = areaPlot.plot.get('coord').isTransposed;
    // const axes = areaPlot.plot.get('axisController').axes;

    // expect(areaPlot).to.be.instanceOf(Area);
    // expect(positionField[0]).to.be.equal('value');
    // expect(positionField[1]).to.be.equal('year');
    // expect(isTransposed).to.be.equal(false);
    // expect(axes.length).to.be.equal(2);
    // areaPlot.destroy();
    // expect(areaPlot.plot.destroyed).to.be.true;
  });

});
