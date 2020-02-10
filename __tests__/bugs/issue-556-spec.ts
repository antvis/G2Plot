import { Waterfall } from '../../src';

describe('#556 瀑布图Y轴配置不生效', () => {
  const canvasDiv = document.createElement('div');
  canvasDiv.style.width = '600px';
  canvasDiv.style.height = '600px';
  canvasDiv.style.left = '30px';
  canvasDiv.style.top = '30px';
  canvasDiv.id = 'canvas1';
  document.body.appendChild(canvasDiv);
  const data = [
    { type: '日用品', money: 120 },
    { type: '伙食费', money: 900 },
    { type: '交通费', money: 200 },
    { type: '水电费', money: 300 },
    { type: '房租', money: 1200 },
    { type: '商场消费', money: 1000 },
    { type: '应酬红包', money: -2000 },
  ];
  const waterfallPlot = new Waterfall(canvasDiv, {
    title: {
      visible: true,
      text: '每月收支情况（瀑布图）',
    },
    forceFit: true,
    data,
    padding: 'auto',
    xField: 'type',
    yField: 'money',
    xAxis: {
      title: {
        visible: true,
      },
    },
    yAxis: {
      label: {
        style: {
          fill: 'red',
        },
      },
      title: {
        visible: true,
      },
    },
    meta: {
      type: {
        alias: '类别',
      },
      money: {
        alias: '金额',
      },
    },
  });

  waterfallPlot.render();
  // @ts-ignore
  const plot = waterfallPlot.getLayer().view;

  it('y轴 label 为红色', () => {
    const axes = plot.get('axisController').axes;
    expect(axes.length).toBe(2);
    const yAxis = axes[1];
    const labels = yAxis.get('labelItems');
    expect(labels[0].textStyle.fill).toBe('red');
  });

  it('轴标题', () => {
    const axes = plot.get('axisController').axes;
    expect(axes.length).toBe(2);
    const xAxis = axes[0];
    const yAxis = axes[1];
    expect(xAxis.get('title').text).toBe('类别');
    expect(yAxis.get('title').text).toBe('金额');
  });
});
