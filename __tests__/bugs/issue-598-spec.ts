import { Pie } from '../../src';
import * as _ from '@antv/util';
import { Shape } from '@antv/g';

describe('#598,不指定 offset 和 textAlign, 更新饼图label type', () => {
  const canvasDiv = document.createElement('div');
  canvasDiv.style.width = '600px';
  canvasDiv.style.height = '600px';
  canvasDiv.style.left = '30px';
  canvasDiv.style.top = '30px';
  canvasDiv.id = 'canvas1';
  document.body.appendChild(canvasDiv);
  const data = [
    {
      type: '分类一',
      value: 27,
    },
    {
      type: '分类二',
      value: 25,
    },
    {
      type: '分类三',
      value: 18,
    },
    {
      type: '分类四',
      value: 15,
    },
    {
      type: '分类五',
      value: 10,
    },
    {
      type: '其它',
      value: 5,
    },
  ];
  const piePlot = new Pie(canvasDiv, {
    width: 600,
    height: 600,
    forceFit: true,
    radius: 0.8,
    data,
    angleField: 'value',
    colorField: 'type',
    label: {
      visible: true,
      type: 'inner',
    },
  });

  piePlot.render();
  piePlot.updateConfig({
    label: {
      type: 'outer',
    },
  });
  piePlot.render();
  const labels: Shape[] = piePlot
    .getLayer()
    .view.get('elements')[0]
    .get('labels');

  it('第一个label x 坐标 > center x 坐标', () => {
    const center = piePlot
      .getLayer()
      .view.get('coord')
      .getCenter();
    expect(labels[0].getBBox().x > center.x).toBe(true);
    expect(labels[0].attr('textAlign')).toBe('left');
  });

  it('第一个label 文本向左对齐', () => {
    const center = piePlot
      .getLayer()
      .view.get('coord')
      .getCenter();
    expect(labels[0].getBBox().x > center.x).toBe(true);
    expect(labels[0].attr('textAlign')).toBe('left');
  });
});
