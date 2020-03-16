import { Waterfall } from '../../src';

describe.skip('#556 瀑布图Y轴配置不生效', () => {
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
});
