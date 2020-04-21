import { Liquid } from '../../src';

describe('#943', () => {
  const div = document.createElement('div');
  div.style.width = '600px';
  div.style.height = '600px';
  div.style.left = '30px';
  div.style.top = '30px';

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
