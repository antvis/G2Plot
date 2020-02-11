import { RangeColumn } from '../../src';

describe('rangeColumn plot', () => {
  const data = [
    { x: '分类一', y: [76, 100] },
    { x: '分类二', y: [56, 108] },
    { x: '分类三', y: [38, 129] },
    { x: '分类四', y: [58, 155] },
    { x: '分类五', y: [45, 120] },
    { x: '分类六', y: [23, 99] },
    { x: '分类七', y: [18, 56] },
    { x: '分类八', y: [18, 34] },
  ];

  const data2 = [
    { x: '分类一', y: [46, 150] },
    { x: '分类二', y: [0, 10] },
    { x: '分类三', y: [38, 129] },
    { x: '分类四', y: [20, 100] },
    { x: '分类五', y: [45, 120] },
    { x: '分类六', y: [43, 150] },
    { x: '分类七', y: [18, 56] },
    { x: '分类八', y: [18, 34] },
  ];

  const canvasDiv = document.createElement('div');
  canvasDiv.style.width = '500px';
  canvasDiv.style.height = '400px';
  canvasDiv.style.left = '30px';
  canvasDiv.style.top = '30px';
  canvasDiv.id = 'canvas1';
  document.body.appendChild(canvasDiv);

  it('初始化', () => {
    const columnPlot = new RangeColumn(canvasDiv, {
      width: 500,
      height: 400,
      padding: 'auto',
      data,
      xField: 'x',
      yField: 'y',
      xAxis: {
        visible: true,
      },
      yAxis: {
        visible: true,
      },
      label: {
        visible: true,
      },
    });
    columnPlot.render();
    window.setTimeout(() => {
      columnPlot.changeData(data2);
    }, 2000);
  });
});
