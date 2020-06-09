import { Liquid } from '../../src';
import { createDiv } from '../utils/dom';

describe('#943', () => {
  const div = createDiv('canvas1');
  document.body.appendChild(div);

  it('liquid statistic visible 控制失效', () => {
    const liquidPlot = new Liquid(div, {
      title: {
        visible: true,
        text: '水波图',
      },
      min: 0,
      max: 10000,
      value: 5639,
      statistic: {
        visible: false,
      },
    });
    liquidPlot.render();
    const view = liquidPlot.getLayers()[0].view;
    const annotationComponents = view.controllers[3].getComponents();
    expect(annotationComponents.length).toBe(0);
    liquidPlot.destroy();
  });
});
