import { Datum, Sankey } from '../../../../src';
import { createDiv } from '../../../utils/dom';
import { delay } from '../../../utils/delay';
import { ENERGY_RELATIONS } from '../../../data/sankey-energy';

describe('sankey', () => {
  it('changeData', async () => {
    const data = ENERGY_RELATIONS.slice(0, ENERGY_RELATIONS.length - 10);
    const sankey = new Sankey(createDiv(), {
      height: 500,
      data,
      sourceField: 'source',
      targetField: 'target',
      weightField: 'value',
    });

    sankey.render();

    await delay(100);

    sankey.changeData(ENERGY_RELATIONS);
  });
});
