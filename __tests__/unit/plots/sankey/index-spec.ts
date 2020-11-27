import { Sankey } from '../../../../src';
import { createDiv } from '../../../utils/dom';
import { ENERGY_RELATIONS } from '../../../data/sankey-energy';

describe('sankey', () => {
  it('Sankey', () => {
    const sankey = new Sankey(createDiv(), {
      height: 500,
      data: ENERGY_RELATIONS,
      sourceField: 'source',
      targetField: 'target',
      weightField: 'value',
    });

    sankey.render();
  });
});
