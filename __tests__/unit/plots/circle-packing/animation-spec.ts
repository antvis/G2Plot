import { CirclePacking } from '../../../../src';
import { createDiv } from '../../../utils/dom';
import { DATA } from '../../../data/circle-packing';
import { DEFAULT_OPTIONS } from '../../../../src/plots/circle-packing/constant';

describe('Circle-Packing', () => {
  const div = createDiv();
  const plot = new CirclePacking(div, {
    autoFit: true,
    padding: 0,
    data: DATA,
    animation: {
      appear: {
        animation: 'zoom-in',
        duration: 500,
      },
      leave: {
        animation: 'zoom-out',
        duration: 500,
      },
    },
  });
  plot.render();

  it('default', () => {
    //
    expect(plot.chart.geometries[0].animateOption).toEqual({
      appear: {
        animation: 'zoom-in',
        duration: 500,
        easing: 'easeQuadOut',
      },
      update: {
        duration: 400,
        easing: 'easeQuadInOut',
      },
      enter: {
        duration: 400,
        easing: 'easeQuadInOut',
        animation: 'zoom-in',
      },
      leave: {
        duration: 500,
        easing: 'easeQuadIn',
        animation: 'zoom-out',
      },
    });
  });

  it('update', () => {
    plot.update({
      animation: {
        appear: {
          animation: 'fade-in',
        },
        enter: {
          animation: 'fade-in',
        },
        leave: {
          animation: 'wave-out',
        },
      },
    });
    expect(plot.chart.geometries[0].animateOption).toEqual({
      appear: {
        animation: 'fade-in',
        duration: 500,
        easing: 'easeQuadOut',
      },
      update: {
        duration: 400,
        easing: 'easeQuadInOut',
      },
      enter: {
        duration: 400,
        easing: 'easeQuadInOut',
        animation: 'fade-in',
      },
      leave: {
        duration: 500,
        easing: 'easeQuadIn',
        animation: 'wave-out',
      },
    });
  });

  afterAll(() => {
    plot.destroy();
  });
});
