import { Sankey } from '../../../../src';
import { createDiv } from '../../../utils/dom';
import { ENERGY_RELATIONS } from '../../../data/sankey-energy';

describe('sankey animation', () => {
  const sankey = new Sankey(createDiv(), {
    height: 500,
    data: ENERGY_RELATIONS,
    sourceField: 'source',
    targetField: 'target',
    weightField: 'value',
    animation: {
      appear: {
        animation: 'fade-in',
        duration: 300,
      },
      leave: {
        animation: 'fade-out',
        duration: 350,
      },
    },
  });

  sankey.render();

  it('sankey animation', () => {
    expect(sankey.options.animation).toMatchObject({
      appear: {
        animation: 'fade-in',
        duration: 300,
      },
      leave: {
        animation: 'fade-out',
        duration: 350,
      },
    });
  });

  it('sankey animation callback', () => {
    sankey.update({
      animation: (type) => ({
        appear: {
          animation: type === 'edge' ? 'wave-in' : 'fade-in',
          duration: type === 'polygon' ? 4000 : 2000,
        },
      }),
    });

    const geometries = [...sankey.chart.views[0].geometries, ...sankey.chart.views[1].geometries];

    expect(geometries[0].animateOption).toMatchObject({
      appear: {
        animation: 'wave-in',
        duration: 2000,
      },
    });

    expect(geometries[1].animateOption).toMatchObject({
      appear: {
        animation: 'fade-in',
        duration: 4000,
      },
    });

    sankey.destroy();
  });
});
