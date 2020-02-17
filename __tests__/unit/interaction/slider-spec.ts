import { Line, ViewLayer } from '../../../src';
import { fireWorks } from '../../data/fireworks-sales';
import { createDiv } from '../../utils/dom';
import SliderInteraction from '../../../src/interaction/slider';

describe('Slider', () => {
  const div = createDiv('root-slider');
  const plot = new Line(document.getElementById('root-slider'), {
    data: fireWorks,
    height: 400,
    width: 500,
    xField: 'Data',
    yField: 'scales',
    meta: {
      Data: {
        type: 'cat',
      },
    },
    interactions: [
      {
        type: 'slider',
      },
    ],
  });

  plot.render();
  // @ts-ignore
  window.__plot = plot;

  it('slider rendered', () => {
    const layer = plot.getLayer() as ViewLayer;
    const interaction = layer.getInteractions()[0];

    expect(interaction).toBeInstanceOf(SliderInteraction);
  });

  afterAll(() => {
    // plot.destroy();
    // div.remove();
  });
});
