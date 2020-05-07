import StackedColumnLine from '../../../src/combo/stackedColumn-line';

describe('columnLine', () => {
  const canvasDiv = document.createElement('div');
  canvasDiv.style.width = '600px';
  canvasDiv.style.height = '600px';
  canvasDiv.style.left = '30px';
  canvasDiv.style.top = '30px';
  canvasDiv.id = 'canvas1';
  document.body.appendChild(canvasDiv);

  const uvBillData = [
    { time: '2019-03', value: 350, type: 'uv' },
    { time: '2019-04', value: 900, type: 'uv' },
    { time: '2019-05', value: 300, type: 'uv' },
    { time: '2019-06', value: 450, type: 'uv' },
    { time: '2019-07', value: 470, type: 'uv' },
    { time: '2019-03', value: 220, type: 'bill' },
    { time: '2019-04', value: 300, type: 'bill' },
    { time: '2019-05', value: 250, type: 'bill' },
    { time: '2019-06', value: 220, type: 'bill' },
    { time: '2019-07', value: 362, type: 'bill' },
  ];

  it('init', () => {
    const transformData = [
      { time: '2019-03', count: 800 },
      { time: '2019-04', count: 600 },
      { time: '2019-05', count: 400 },
      { time: '2019-06', count: 380 },
      { time: '2019-07', count: 220 },
    ];
    const columnLine = new StackedColumnLine(canvasDiv, {
      title: {
        visible: true,
        text: '分组柱折线混合图',
        alignTo: 'left',
      },
      description: {
        visible: true,
        text: '分组柱折线混合图表',
        alignTo: 'left',
      },
      data: [uvBillData, transformData],
      xField: 'time',
      yField: ['value', 'count'],
      columnStackField: 'type',
      tooltip: {
        visible: true,
      },
      legend: {
        visible: true,
      },
      columnConfig: {
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
      },
    });
    columnLine.render();
  });

  it('line series', () => {
    const transformData = [
      { time: '2019-03', count: 800, name: 'a' },
      { time: '2019-04', count: 600, name: 'a' },
      { time: '2019-05', count: 400, name: 'a' },
      { time: '2019-06', count: 380, name: 'a' },
      { time: '2019-07', count: 220, name: 'a' },
      { time: '2019-03', count: 500, name: 'b' },
      { time: '2019-04', count: 300, name: 'b' },
      { time: '2019-05', count: 200, name: 'b' },
      { time: '2019-06', count: 180, name: 'b' },
      { time: '2019-07', count: 320, name: 'b' },
      { time: '2019-03', count: 200, name: 'c' },
      { time: '2019-04', count: 400, name: 'c' },
      { time: '2019-05', count: 300, name: 'c' },
      { time: '2019-06', count: 480, name: 'c' },
      { time: '2019-07', count: 120, name: 'c' },
    ];

    const columnLine = new StackedColumnLine(canvasDiv, {
      title: {
        visible: true,
        text: '分组柱折线混合图',
        alignTo: 'left',
      },
      description: {
        visible: true,
        text: '分组柱折线混合图表',
        alignTo: 'left',
      },
      data: [uvBillData, transformData],
      xField: 'time',
      yField: ['value', 'count'],
      columnStackField: 'type',
      lineSeriesField: 'name',
      tooltip: {
        visible: true,
      },
    });
    columnLine.render();
  });
});
