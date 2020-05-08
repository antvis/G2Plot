import ColumnLine from '../../../src/combo/column-line';

describe('columnLine', () => {
  const canvasDiv = document.createElement('div');
  canvasDiv.style.width = '600px';
  canvasDiv.style.height = '600px';
  canvasDiv.style.left = '30px';
  canvasDiv.style.top = '30px';
  canvasDiv.id = 'canvas1';
  document.body.appendChild(canvasDiv);

  it('init', () => {
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
      lineConfig: {},
    });
    columnLine.render();
  });

  it('multiple line', () => {
    const uvData = [
      { time: '2019-03', value: 350 },
      { time: '2019-04', value: 900 },
      { time: '2019-05', value: 300 },
      { time: '2019-06', value: 450 },
      { time: '2019-07', value: 470 },
    ];

    const transformData = [
      { time: '2019-03', count: 800, type: 'a' },
      { time: '2019-04', count: 600, type: 'a' },
      { time: '2019-05', count: 400, type: 'a' },
      { time: '2019-06', count: 380, type: 'a' },
      { time: '2019-07', count: 220, type: 'a' },
      { time: '2019-03', count: 500, type: 'b' },
      { time: '2019-04', count: 300, type: 'b' },
      { time: '2019-05', count: 200, type: 'b' },
      { time: '2019-06', count: 180, type: 'b' },
      { time: '2019-07', count: 320, type: 'b' },
      { time: '2019-03', count: 200, type: 'c' },
      { time: '2019-04', count: 400, type: 'c' },
      { time: '2019-05', count: 300, type: 'c' },
      { time: '2019-06', count: 480, type: 'c' },
      { time: '2019-07', count: 120, type: 'c' },
    ];

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
      lineSeriesField: 'type',
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
          visible: true,
        },
      },
      lineConfig: {},
    });
    columnLine.render();
  });
});
