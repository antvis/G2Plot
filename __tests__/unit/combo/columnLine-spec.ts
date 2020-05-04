import ColumnLine from '../../../src/combo/column-line';

describe('columnLine', () => {
  const canvasDiv = document.createElement('div');
  canvasDiv.style.width = '600px';
  canvasDiv.style.height = '600px';
  canvasDiv.style.left = '30px';
  canvasDiv.style.top = '30px';
  canvasDiv.id = 'canvas1';
  document.body.appendChild(canvasDiv);

  const uvData = [
    { time: '2019-03', value: 350 },
    { time: '2019-04', value: 900 },
    { time: '2019-05', value: 300 },
    { time: '2019-06', value: 450 },
    { time: '2019-07', value: 470 },
  ];

  const transformData = [
    { time: '2019-03', count: 800 },
    { time: '2019-04', count: 600 },
    { time: '2019-05', count: 400 },
    { time: '2019-06', count: 380 },
    { time: '2019-07', count: 220 },
  ];

  it('init', () => {
    const columnLine = new ColumnLine(canvasDiv, {
      title: {
        visible: true,
        text: '柱线混合图',
        alignTo: 'left',
      },
      description: {
        visible: true,
        text: '柱线混合图表',
        alignTo: 'left',
      },
      data: [uvData, transformData],
      xField: 'time',
      yField: ['value', 'count'],
      tooltip: {
        visible: true,
      },
      legend: {
        visible: true,
      },
      yAxis: {
        leftConfig: {
          visible: true,
        },
        rightConfig: {
          visible: false,
        },
      },
      /*columnConfig: {
        columnStyle: {
          stroke: 'black',
        },
        label: {
          visible: true,
          position: 'middle',
        },
      },
      lineConfig: {
        point: {
          visible: true,
        },
        label: {
          visible: true,
        },
        smooth: true,
        lineStyle: {
          lineDash: [2, 5],
        },
      },*/
    });
    columnLine.render();
  });
});
