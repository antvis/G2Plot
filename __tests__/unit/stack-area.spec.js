import { StackArea } from '../../src';
// import { expect } from 'chai';

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
        visible: true,
        style: {
          color: 'green',
          size: 8,
          lineWith: 3,
        },
      },
      line: {
        visible: true,
        style: {
          color: 'blue',
          size: 4,
        },
      },
      label: {
        visible: true,
        // type: 'point'
      },
      // color: [ 'red', 'blue' ],
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
