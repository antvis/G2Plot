import { StackColumn } from '../../src';

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
      value: 0.5,
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
      value: 0.7,
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
      value: 1,
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

    const columnPlot = new StackColumn(canvasDiv, {
      data,
      xField: 'year',
      yField: 'value',
      yAxis: {
        min: 0
      },
      // // tooltip: false,
      label: {
        /* formatter: (val) => {
          return val + ' label';
        },
        offsetX: 10,
        offsetY: 20,
        style: {
          fill: 'red'
        }*/
        position: 'middle',
        adjustColor: true,
        offset: 0,
      },
      color: [ '#45a2fc', '#56c977' ],
      // color: { Lon: 'pink', Bor: 'gray' },
      /* color: (d) => {
        if (d === 'Lon') return 'red';
      },*/
      stackField: 'type'
    });

    columnPlot.render();
  });

});
