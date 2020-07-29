import { Biax } from '../../../../src';
import { CountryEconomy } from '../../../data/country-economy';
import { createDiv } from '../../../utils/dom';

describe('Biax column', () => {
  it('column-line', () => {
    document.body.append('test Biax column');
    const biax = new Biax(createDiv(), {
      width: 400,
      height: 500,
      data: CountryEconomy,
      xField: 'Country',
      yField: ['GDP', 'Population'],
      geometryConfigs: [
        {
          geometry: 'Line',
        },
        {
          geometry: 'Column',
        },
      ],
    });

    biax.render();
  });
});
