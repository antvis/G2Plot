import { BidirectionalBar } from '../../../../src';
import { data } from '../../../data/bi-directional';
import { createDiv } from '../../../utils/dom';

describe('Bidirectional layout', () => {
  it('update layout', () => {
    const bidirectional = new BidirectionalBar(createDiv('update layout'), {
      width: 400,
      height: 400,
      data,
      xField: 'country',
      yField: ['2016年耕地总面积', '2016年转基因种植面积'],
    });
    bidirectional.render();

    let firstView = bidirectional.chart.views[0];
    let secondView = bidirectional.chart.views[1];
    expect(firstView.getCoordinate().isTransposed).toBe(true);
    expect(secondView.getCoordinate().isTransposed).toBe(true);
    //@ts-ignore
    expect(firstView.getCoordinate().isReflectX).toBe(true);
    //@ts-ignore
    expect(firstView.getOptions().axes.country.position).toBe('top');

    bidirectional.update({
      layout: 'vertical',
    });

    firstView = bidirectional.chart.views[0];
    secondView = bidirectional.chart.views[1];

    expect(firstView.getCoordinate().isTransposed).toBe(false);
    expect(secondView.getCoordinate().isTransposed).toBe(false);
    //@ts-ignore
    expect(secondView.getCoordinate().isReflectY).toBe(true);
    //@ts-ignore
    expect(firstView.getOptions().axes.country.position).toBe('bottom');
  });
});
