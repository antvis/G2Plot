import { Pie } from '../../src';
import { createDiv } from '../utils/dom';

describe('#419', () => {
  const canvasDiv = createDiv('canvas1');
  document.body.appendChild(canvasDiv);
  const data = [
    {
      x: '分类一',
      y: 385,
      serie: 'default',
    },
    {
      x: '分类二',
      y: 888,
      serie: 'default',
    },
    {
      x: '分类三',
      y: 349,
      serie: 'default',
    },
    {
      x: '分类四',
      y: 468,
      serie: 'default',
    },
    {
      x: '分类五',
      y: 477,
      serie: 'default',
    },
  ];

  const piePlot = new Pie(canvasDiv, {
    padding: [0, 0, 0, 0],
    width: 600,
    height: 600,
    data: data,
    label: {
      visible: true,
      type: 'spider',
    },
    angleField: 'y',
    colorField: 'x',
    animation: false,
    radius: 0.6,
  });

  piePlot.render();
  // @ts-ignore
  const view = piePlot.getLayer().view;

  it('normal', () => {
    const shapes = view.geometries[0].getShapes();
    expect(shapes.length).toBe(data.length);
    // TODO @xinming
    // const labelShapes = piePlot.getLayer().spiderLabel.container.get('children');
    // expect(labelShapes.length / 2).toBe(shapes.length);
  });

  it('模拟点击图例', () => {
    const legend = view.getController('legend').getComponents()[0].component;
    legend.emit('itemclick', { item: legend.get('items')[0] });
    const shapes = view.geometries[0].getShapes();
    expect(shapes.length).toBe(data.length);
    // TODO @xinming
    // const labelShapes = piePlot.getLayer().spiderLabel.container.get('children');
    // expect(labelShapes.length / 2).toBe(shapes.length);
  });
});
