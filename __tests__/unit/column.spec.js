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
      value: -0.2
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
      // color: '#F3EAE3',
      yAxis: {
        visible: true,
        min: 0,
        /* style: {
          line: {
            visible: true,
            stroke: 'red',
            lineWidth: 1
          },
          tickLine: {
            visible: false,
            length: 20,
            stroke: 'red',
            // lineWidth: 1
          },
          grid: {
            visible: true,
            stroke: 'pink',
            lineWidth: 1
          },
          label: {
            visible: true,
            fill: 'green'
          }
        },*/
      },
      xAxis: {
        visible: true,
        min: 0,
        ticks: [],
        /* style: {
          line: {
            visible: true,
            stroke: 'purple',
            lineWidth: 1
          },
          grid: {
            visible: false
          },
          tickLine: {
            visible: false,
            length: 6,
            stroke: 'pink',
            lineWidth: 1
          },
          label: {
            visible: true,
            fill: 'orange',
          }
        }*/
      },
      tooltip: {
        visible: true,
        style: {
          'g2-tooltip': {
            backgroundColor: 'black',
            color: 'red'
          }
        }
      },
      /* color: () => {
        // console.log('color callback');
        return '#13008B';
      },
       columnSize: 10,
      columnStyle: {
        stroke: 'red',
        lineWidth: 3
      },*/
      // tooltip: false,
      label: {
        // visible: false,
        adjustColor: true,
        offset: 0,
        /* formatter: (val) => {
          return val;
        },*/
        // offsetX: 10,
        // offsetY: 20,
        /* style: {
          fill: 'red'
        },*/
        position: 'middle'
      }
    });

    columnPlot.render();
  });

});
