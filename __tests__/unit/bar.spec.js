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
    value: 0.5
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

  it('基础条形图', () => {
    const barPlot = new Bar(canvasDiv, {
      padding: 'auto',
      data,
      xField: 'value',
      yField: 'year',
    });
    barPlot.render();
    const positionField = barPlot.plot.get('elements')[0].get('position').fields;
    const isTransposed = barPlot.plot.get('coord').isTransposed;
    expect(barPlot).to.be.instanceOf(Bar);
    expect(positionField[0]).to.be.equal('year');
    expect(positionField[1]).to.be.equal('value');
    expect(isTransposed).to.be.equal(true);
    barPlot.destroy();
    expect(barPlot.plot.destroyed).to.be.true;
  });

  // it('基础条形图 xAxis false', () => {
  //   const barPlot = new Bar(canvasDiv, {
  //     padding: 'auto',
  //     data,
  //     xField: 'value',
  //     yField: 'year',
  //     xAxis: {
  //       visible: true,
  //       style: {
  //         line: { stroke: 'red' },
  //       }
  //     }
  //   });
  //   barPlot.render();
  //   const axis = barPlot.plot.get('axisController').axes[0];
  //   console.log(axis);

  //   // const positionField = barPlot.plot.get('elements')[0].get('position').fields;
  //   // const isTransposed = barPlot.plot.get('coord').isTransposed;
  //   // expect(barPlot).to.be.instanceOf(Bar);
  //   // expect(positionField[0]).to.be.equal('year');
  //   // expect(positionField[1]).to.be.equal('value');
  //   // expect(isTransposed).to.be.equal(true);
  //   // barPlot.destroy();
  //   // expect(barPlot.plot.destroyed).to.be.true;
  // });

});
