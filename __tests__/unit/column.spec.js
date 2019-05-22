import { Column } from '../../src';

describe('Colomn plot', () => {
  const canvasDiv = document.createElement('div');
  canvasDiv.style.width = '600px';
  canvasDiv.style.height = '600px';
  canvasDiv.style.left = '30px';
  canvasDiv.style.top = '30px';
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

    const columnPlot = new Column(canvasDiv, {
      data,
      xField: 'year',
      yField: 'value',
      yAxis: {
        visible: true,
        min: 0,
        style: {
          line: {
            stroke: 'red',
            lineWidth: 5
          },
          tickLine: {
            length: 20,
            stroke: 'yellow'
          }
        },
        // line: {
        //   stroke: 'red'
        // },
        // tickLine: {
        //   length: 20,
        //   stroke: 'yellow'
        // }
      },
      columnSize: 10,
      // tooltip: false,
      label: {
        visible: false,
        formatter: (val) => {
          return val + ' label';
        },
        // offsetX: 10,
        // offsetY: 20,
        style: {
          fill: 'red'
        },
        position: 'bottom'
      }
    });

    columnPlot.render();
  });

});
