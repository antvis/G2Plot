import { BidirectionalBar } from '../../../../src';
import { data } from '../../../data/bi-directional';
import { createDiv } from '../../../utils/dom';

describe('Bidirectional legend', () => {
  it('x*y*legend*top', () => {
    const bidirectional = new BidirectionalBar(createDiv(), {
      width: 400,
      height: 400,
      data,
      xField: 'country',
      yField: 'value',
      seriesField: 'type',
      legend: {
        position: 'top',
      },
    });
    bidirectional.render();
    expect(bidirectional.chart.getController('legend').getComponents()[0].direction).toEqual('top');
  });
  it('x*y*legend*false', () => {
    const bidirectional = new BidirectionalBar(createDiv(), {
      width: 400,
      height: 400,
      data,
      xField: 'country',
      yField: 'value',
      seriesField: 'type',
      legend: false,
    });
    bidirectional.render();
    expect(bidirectional.chart.getController('legend').getComponents().length).toEqual(0);
  });
});
