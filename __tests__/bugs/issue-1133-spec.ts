import { Waterfall } from '../../src';
import { createDiv } from '../utils/dom';

describe('#1133: 瀑布图 xAxis 和 yAxis 失效', () => {
  const data = [
    { type: '日用品', money: 120 },
    { type: '伙食费', money: 900 },
    { type: '交通费', money: 200 },
    { type: '水电费', money: 300 },
    { type: '房租', money: 1200 },
    { type: '商场消费', money: 1000 },
    { type: '应酬红包', money: -2000 },
  ];
  const config = {
    title: {
      visible: true,
      text: '每月收支情况（瀑布图）',
    },
    data,
    xField: 'type',
    yField: 'money',
    xAxis: {
      visible: true,
      label: {
        style: {
          fill: 'red',
          fontFamily: 'Microsoft Yahei',
          fontSize: 28,
          fontWeight: 500,
          stroke: 'rgba(0,0,0,0)',
          visible: true,
        },
      },
    },
    yAxis: {
      visible: true,
    },
    label: {
      visible: true,
      offsetX: 10,
      offsetY: -150,
    },
  };

  const waterfallPlot = new Waterfall(createDiv(), config);
  waterfallPlot.render();

  it('normal', () => {
    expect(
      waterfallPlot
        .getLayer()
        .view.getComponents()
        .filter((t) => t.type === 'axis').length
    ).toBe(2);
  });

  it('xAxis & yAxis, not visible', () => {
    waterfallPlot.updateConfig({ xAxis: { visible: false }, yAxis: { visible: false } });
    waterfallPlot.render();
    expect(
      waterfallPlot
        .getLayer()
        .view.getComponents()
        .filter((t) => t.type === 'axis').length
    ).toBe(0);
  });

  it('xAxis config', () => {
    waterfallPlot.updateConfig({ xAxis: { visible: true } });
    waterfallPlot.render();
    const axes = waterfallPlot
      .getLayer()
      .view.getComponents()
      .filter((t) => t.type === 'axis');
    expect(axes.length).toBe(1);
    expect(axes[0].component.get('label').style.fill).toBe('red');
  });

  it('yAxis config', () => {
    waterfallPlot.updateConfig({ yAxis: { visible: true, grid: { line: { style: { lineDash: [2, 2] } } } } });
    waterfallPlot.render();
    const axes = waterfallPlot
      .getLayer()
      .view.getComponents()
      .filter((t) => t.type === 'axis');
    expect(axes.length).toBe(2);
    expect(axes[1].component.get('grid').line.style.lineDash).toEqual([2, 2]);
  });
});
