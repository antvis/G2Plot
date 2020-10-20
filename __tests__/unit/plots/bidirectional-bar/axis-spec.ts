import { BidirectionalBar } from '../../../../src';
import { data } from '../../../data/bi-directional';
import { createDiv } from '../../../utils/dom';

describe('Bidirectional axis', () => {
  it('x*y*xAxis*bottom', () => {
    const bidirectional = new BidirectionalBar(createDiv(), {
      width: 400,
      height: 400,
      data,
      xField: 'country',
      yField: 'value',
      seriesField: 'type',
      xAxis: {
        position: 'bottom',
      },
    });
    bidirectional.render();

    const leftView = bidirectional.chart.views[0];
    const rightView = bidirectional.chart.views[1];
    // @ts-ignore
    expect(leftView.options.axes.country.position).toEqual('bottom');
    //@ts-ignore
    expect(rightView.options.axes.country).toEqual(false);
  });

  it('x*y*xAxis*false', () => {
    const bidirectional = new BidirectionalBar(createDiv(), {
      width: 400,
      height: 400,
      data,
      xField: 'country',
      yField: 'value',
      seriesField: 'type',
      xAxis: false,
    });
    bidirectional.render();

    const leftView = bidirectional.chart.views[0];
    const rightView = bidirectional.chart.views[1];
    // @ts-ignore
    expect(leftView.options.axes.country).toEqual(false);
    //@ts-ignore
    expect(rightView.options.axes.country).toEqual(false);
  });
  it('x*y*yAxis*false', () => {
    const bidirectional = new BidirectionalBar(createDiv(), {
      width: 400,
      height: 400,
      data,
      xField: 'country',
      yField: 'value',
      seriesField: 'type',
      yAxis: false,
    });
    bidirectional.render();

    const leftView = bidirectional.chart.views[0];
    const rightView = bidirectional.chart.views[1];
    // @ts-ignore
    expect(leftView.options.axes.value).toEqual(false);
    //@ts-ignore
    expect(rightView.options.axes.value).toEqual(false);
  });
});
