import { BidirectionalBar } from '../../../../src';
import { data } from '../../../data/bi-directional';
import { createDiv } from '../../../utils/dom';

describe('Bidirectional layout', () => {
  it('layout*default*horizontal', () => {
    const bidirectional = new BidirectionalBar(createDiv('x*y*horizontal'), {
      width: 400,
      height: 400,
      data,
      xField: 'country',
      yField: ['2016年耕地总面积', '2016年转基因种植面积'],
    });
    bidirectional.render();

    const firstView = bidirectional.chart.views[0];
    const secondView = bidirectional.chart.views[1];
    expect(firstView.getCoordinate().isTransposed).toBe(true);
    expect(secondView.getCoordinate().isTransposed).toBe(true);
    //@ts-ignore
    expect(firstView.getCoordinate().isReflectX).toBe(true);
  });
  it('layout*default*vertical', () => {
    const bidirectional = new BidirectionalBar(createDiv('x*y*vertical'), {
      width: 400,
      height: 600,
      data,
      xField: 'country',
      yField: ['2016年耕地总面积', '2016年转基因种植面积'],
      layout: 'vertical',
      yAxis: {
        '2016年耕地总面积': {
          nice: true,
        },
        '2016年转基因种植面积': {
          min: 0,
          max: 100,
        },
      },
    });
    bidirectional.render();

    const firstView = bidirectional.chart.views[0];
    const secondView = bidirectional.chart.views[1];

    //@ts-ignore
    expect(firstView.options.axes.country.position).toEqual('bottom');

    expect(firstView.getCoordinate().isTransposed).toBe(false);
    expect(secondView.getCoordinate().isTransposed).toBe(false);
    //@ts-ignore
    expect(secondView.getCoordinate().isReflectY).toBe(true);
    //@ts-ignore
    expect(secondView.options.axes['2016年转基因种植面积'].min).toEqual(0);
    //@ts-ignore
    expect(secondView.options.axes['2016年转基因种植面积'].max).toEqual(100);
  });
});
