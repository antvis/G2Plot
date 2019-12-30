import { Pie } from '../../src';
import { Shape } from '@antv/g';
import * as _ from '@antv/util';
import { createDiv } from '../utils/dom';

describe('pie spider label', () => {
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
      type: '分类六',
      value: 18,
    },
    {
      type: '分类七',
      value: 15,
    },
    {
      type: '分类八',
      value: 10,
    },
    {
      type: '其它',
      value: 5,
    },
  ];
  const piePlot = new Pie(createDiv('pie1'), {
    width: 1000,
    height: 600,
    data,
    angleField: 'value',
    colorField: 'type',
    label: {
      visible: true,
      type: 'spider',
      style: {
        fill: 'rgba(0, 0, 0, 0.65)',
        lineStroke: 'rgba(0, 0, 0, 0.25)',
        fontWeight: 500,
      },
    },
    legend: {
      visible: false,
    },
  });
  piePlot.render();

  const pieLayer = piePlot.getLayer();
  // @ts-ignore
  const plot = pieLayer.view;
  let labelShapes: Shape[];

  it('get labelShapes', () => {
    // @ts-ignore
    const spiderLabel = pieLayer.spiderLabel;
    labelShapes = spiderLabel.container.get('children');
    expect(labelShapes.length).toBe(data.length * 2);
    const shapes = plot.get('elements')[0].getShapes();
    expect(labelShapes.length / 2).toBe(shapes.length);
  });

  it('label textGroup', () => {
    expect(labelShapes[0].get('children')[1].attr('fill')).toBe('rgba(0, 0, 0, 0.65)');
    expect(labelShapes[0].get('children')[0].attr('text')).toBe(5);
    expect(labelShapes[0].get('children')[1].attr('text')).toBe('其它');
  });

  it('label bottom-label"s fontWeight is larger than top-label', () => {
    expect(labelShapes[0].get('children')[0].attr('fontWeight')).toBeGreaterThan(
      labelShapes[0].get('children')[1].attr('fontWeight')
    );
  });

  it('label line', () => {
    // labelShapes[1] is label-line
    expect(labelShapes[1].attr('stroke')).toBe('rgba(0, 0, 0, 0.25)');
  });

  afterAll(() => {
    piePlot.destroy();
  });
});

describe('spider-label 单行label', () => {
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
      type: '分类六',
      value: 18,
    },
    {
      type: '分类七',
      value: 15,
    },
    {
      type: '分类八',
      value: 10,
    },
    {
      type: '其它',
      value: 5,
    },
  ];
  const piePlot = new Pie(createDiv('pie1'), {
    width: 1000,
    height: 600,
    data,
    angleField: 'value',
    colorField: 'type',
    label: {
      visible: true,
      type: 'spider',
      formatter: (text, item, index) => `${item._origin['type']} (${item._origin['value']})`,
    },
    legend: {
      visible: false,
    },
  });
  piePlot.render();

  const pieLayer = piePlot.getLayer();
  // @ts-ignore
  const plot = pieLayer.view;
  let labelShapes: Shape[];

  it('get labelShapes', () => {
    // @ts-ignore
    const spiderLabel = pieLayer.spiderLabel;
    labelShapes = spiderLabel.container.get('children');
    expect(labelShapes.length).toBe(data.length * 2);
  });

  it('单行label 居中显示', () => {
    const labelText = labelShapes[0].get('children')[0];
    const linePath = labelShapes[1].attr('path');
    expect(labelText.attr('text')).toBe('其它 (5)');
    expect(labelShapes[0].getBBox().y).toBe(labelText.getBBox().y);

    const labelCenter = {
      y: (labelText.getBBox().minY + labelText.getBBox().maxY) / 2,
      x: (labelText.getBBox().minX + labelText.getBBox().maxX) / 2,
    };
    expect(labelCenter.y).toBe(_.last(linePath)[2]);
  });

  afterAll(() => {
    // piePlot.destroy();
  });
});
