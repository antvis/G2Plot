import { Column, ViewLayer } from '../../../src';
import { fireWorks } from '../../data/fireworks-sales';
import { createDiv } from '../../utils/dom';
import ScrollbarInteraction from '../../../src/interaction/scrollbar';

describe('Scrollbar', () => {
  createDiv('root-slider');
  const plot = new Column(document.getElementById('root-slider'), {
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
        type: 'scrollbar',
      },
    ],
  });

  plot.render();

  it('scrollbar rendered', () => {
    const layer = plot.getLayer() as ViewLayer;
    const interaction = layer.getInteractions()[0];

    expect(interaction).toBeInstanceOf(ScrollbarInteraction);
  });

  afterAll(() => {
    // plot.destroy();
    // div.remove();
  });
});
