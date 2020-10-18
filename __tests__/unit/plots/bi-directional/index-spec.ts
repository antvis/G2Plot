import { Bidirectional } from '../../../../src';
import { data } from '../../../data/bi-directional';
import { createDiv } from '../../../utils/dom';

describe('Bidirectional', () => {
  it('default', () => {
    const bidirectional = new Bidirectional(createDiv(), {
      width: 400,
      height: 300,
      data,
      xField: 'country',
      yField: 'value',
      seriesField: 'type',
    });

    bidirectional.render();
  });
});
