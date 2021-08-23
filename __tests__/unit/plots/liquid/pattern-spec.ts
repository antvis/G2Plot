import { Liquid } from '../../../../src';
import { createDiv } from '../../../utils/dom';

describe('liquid: pattern', () => {
  const liquid = new Liquid(createDiv(), {
    width: 600,
    height: 300,
    percent: 0.25,
    color: 'blue',
  });

  liquid.render();

  const getWaveColor = (liquid) =>
    liquid.chart.middleGroup.getChildren()[0].getChildren()[0].getChildren()[0].attr('fill');

  it('pattern: obj', () => {
    liquid.update({
      pattern: {
        type: 'dot',
      },
    });
    expect(getWaveColor(liquid) instanceof CanvasPattern).toEqual(true); // wave path

    liquid.update({
      pattern: null,
    });
    expect(getWaveColor(liquid) instanceof CanvasPattern).toEqual(false); // wave path
  });

  afterAll(() => {
    liquid.destroy();
  });
});
