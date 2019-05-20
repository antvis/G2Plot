import { StackBar } from '../../src';

describe('Colomn plot', () => {
  const canvasDiv = document.createElement('div');
  canvasDiv.id = 'canvas1';
  document.body.appendChild(canvasDiv);

  it('基础柱状图', () => {
    const data = [ {
      year: '1991',
      value: 3,
      type: 'Lon'
    }, {
      year: '1992',
      value: 4,
      type: 'Lon'
    }, {
      year: '1993',
      value: 3.5,
      type: 'Lon'
    }, {
      year: '1994',
      value: 5,
      type: 'Lon'
    }, {
      year: '1995',
      value: 4.9,
      type: 'Lon'
    }, {
      year: '1996',
      value: 6,
      type: 'Lon'
    }, {
      year: '1997',
      value: 7,
      type: 'Lon'
    }, {
      year: '1998',
      value: 9,
      type: 'Lon'
    }, {
      year: '1999',
      value: 13,
      type: 'Lon'
    }, {
      year: '1991',
      value: 3,
      type: 'Bor'
    }, {
      year: '1992',
      value: 4,
      type: 'Bor'
    }, {
      year: '1993',
      value: 3.5,
      type: 'Bor'
    }, {
      year: '1994',
      value: 5,
      type: 'Bor'
    }, {
      year: '1995',
      value: 4.9,
      type: 'Bor'
    }, {
      year: '1996',
      value: 6,
      type: 'Bor'
    }, {
      year: '1997',
      value: 7,
      type: 'Bor'
    }, {
      year: '1998',
      value: 9,
      type: 'Bor'
    }, {
      year: '1999',
      value: 13,
      type: 'Bor'
    } ];

    const columnPlot = new StackBar(canvasDiv, {
      padding: [ 10, 80, 80, 80 ],
      data,
      xField: 'value',
      yField: 'year',
      yAxis: {
        min: 0
      },
      width: 600,
      height: 400,
      // // tooltip: false,
      label: {
        formatter: (val) => {
          return val + ' label';
        },
        style: {
          fill: 'red'
        }
      },
      // color: [ 'red', 'black' ],
      // color: { Lon: 'pink', Bor: 'gray' },
      color: (d) => {
        if (d === 'Lon') return 'red';
      },
      stackField: 'type'
    });

    columnPlot.render();
  });

});
