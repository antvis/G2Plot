import { Bar } from '../../src';

describe('Bar plot', () => {
  const canvasDiv = document.createElement('div');
  canvasDiv.id = 'canvas1';
  document.body.appendChild(canvasDiv);

  it('基础柱状图', () => {
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

    const columnPlot = new Bar(canvasDiv, {
      padding: [ 10, 80, 80, 80 ],
      data,
      xField: 'value',
      yField: 'year',
      xAxis: {
        min: 0
      },
      // tooltip: false,
      label: {
        formatter: (val) => {
          return val + ' label';
        },
        offsetX: 10,
        offsetY: 20,
        style: {
          fill: 'red'
        }
      }
    });

    columnPlot.render();
  });

});
