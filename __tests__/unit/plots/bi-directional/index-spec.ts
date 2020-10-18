import { BiDirectional } from '../../../../src';
import { data } from '../../../data/bi-directional';
import { createDiv } from '../../../utils/dom';

describe('BiDirectional', () => {
  it('default', () => {
    const biDirectional = new BiDirectional(createDiv(), {
      width: 400,
      height: 300,
      data,
      xField: 'country',
      yField: 'value',
      seriesField: 'type',
    });

    biDirectional.render();
  });
});
