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
      xAxis: {
        position: 'bottom',
      },
      tooltip: {
        shared: true,
      },
      yField: ['2016年耕地总面积', '2016年转基因种植面积'],
    });
    bidirectional.render();

    const firstView = bidirectional.chart.views[0];
    const secondView = bidirectional.chart.views[1];
    expect(firstView.getCoordinate().isTransposed).toBe(true);
    expect(secondView.getCoordinate().isTransposed).toBe(true);
    //@ts-ignore
    expect(firstView.getCoordinate().isReflectX).toBe(true);

    bidirectional.destroy();
  });
  it('layout*default*vertical', () => {
    const bidirectional = new BidirectionalBar(createDiv('x*y*vertical'), {
      width: 400,
      height: 600,
      data,
      xField: 'country',
      yField: ['2016年耕地总面积', '2016年转基因种植面积'],
      layout: 'vertical',
    });
    bidirectional.render();

    const firstView = bidirectional.chart.views[0];
    const secondView = bidirectional.chart.views[1];
    //@ts-ignore
    const L1 = firstView.autoPadding.left;
    //@ts-ignore
    const L2 = secondView.autoPadding.left;

    expect(L1 === L2).toEqual(true); //@ts-ignore
    //@ts-ignore
    expect(firstView.options.axes.country.position).toEqual('bottom');

    expect(firstView.getCoordinate().isTransposed).toBe(false);
    expect(secondView.getCoordinate().isTransposed).toBe(false);
    //@ts-ignore
    expect(secondView.getCoordinate().isReflectY).toBe(true);

    bidirectional.destroy();
  });
  it('layout*default*vertical*xAxis*top', () => {
    const bidirectional = new BidirectionalBar(createDiv('x*y*vertical'), {
      width: 400,
      height: 600,
      data,
      xField: 'country',
      xAxis: {
        position: 'top',
      },
      yField: ['2016年耕地总面积', '2016年转基因种植面积'],
      layout: 'vertical',
      interactions: [{ type: 'element-active' }],
    });
    bidirectional.render();

    const firstView = bidirectional.chart.views[0];
    const secondView = bidirectional.chart.views[1];
    //@ts-ignore
    const L1 = firstView.autoPadding.left;
    //@ts-ignore
    const L2 = secondView.autoPadding.left;

    expect(L1 === L2).toEqual(true); //@ts-ignore
    //@ts-ignore
    expect(firstView.options.axes.country.position).toEqual('top');

    expect(firstView.getCoordinate().isTransposed).toBe(false);
    expect(secondView.getCoordinate().isTransposed).toBe(false);
    //@ts-ignore
    expect(secondView.getCoordinate().isReflectY).toBe(true);

    bidirectional.destroy();
  });
});
