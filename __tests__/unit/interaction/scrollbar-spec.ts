import { Column } from '../../../src';
import { fireWorks } from '../../data/fireworks-sales';
import { createDiv } from '../../utils/dom';

describe('Scrollbar', () => {
  const div = createDiv('root-slider');
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
  // @ts-ignore
  window.__plot = plot;

  it('scrollbar rendered', () => {
    // TODO:
  });

  afterAll(() => {
    // plot.destroy();
    // div.remove();
  });
});
