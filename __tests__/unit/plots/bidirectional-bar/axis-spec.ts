import { BidirectionalBar } from '../../../../src';
import { data } from '../../../data/bi-directional';
import { createDiv } from '../../../utils/dom';
describe('Bidirectional axis', () => {
  it('x*y*yAxis', () => {
    const bidirectional = new BidirectionalBar(createDiv('x*y*xAxis'), {
      width: 400,
      height: 400,
      data,
      xField: 'country',
      yField: ['2016年耕地总面积', '2016年转基因种植面积'],
      yAxis: {
        '2016年耕地总面积': {
          nice: true,
        },
        '2016年转基因种植面积': {
          nice: true,
          min: 0,
          max: 100,
        },
      },
    });
    bidirectional.render();

    const firstView = bidirectional.chart.views[0];
    const secondView = bidirectional.chart.views[1];

    //@ts-ignore
    expect(firstView.options.axes['2016年耕地总面积'].nice).toEqual(true);
    //@ts-ignore
    expect(secondView.options.axes['2016年转基因种植面积'].nice).toEqual(true);
    //@ts-ignore
    expect(secondView.options.axes['2016年转基因种植面积'].min).toEqual(0);
    //@ts-ignore
    expect(secondView.options.axes['2016年转基因种植面积'].max).toEqual(100);
    //@ts-ignore
    expect(secondView.options.axes.country).toEqual(false);

    bidirectional.destroy();
  });

  it('x*y*xAxis*false', () => {
    const bidirectional = new BidirectionalBar(createDiv('x*y*xAxis*false'), {
      width: 400,
      height: 400,
      data,
      xField: 'country',
      yField: ['2016年耕地总面积', '2016年转基因种植面积'],
      xAxis: false,
    });
    bidirectional.render();

    const firstView = bidirectional.chart.views[0];
    const secondView = bidirectional.chart.views[1];
    // @ts-ignore
    expect(firstView.options.axes.country).toEqual(false);
    //@ts-ignore
    expect(secondView.options.axes.country).toEqual(false);

    bidirectional.destroy();
  });
  it('x*y*yAxis*false', () => {
    const bidirectional = new BidirectionalBar(createDiv('x*y*yAxis*false'), {
      width: 400,
      height: 400,
      data,
      xField: 'country',
      yField: ['2016年耕地总面积', '2016年转基因种植面积'],
      yAxis: false,
    });
    bidirectional.render();

    const firstView = bidirectional.chart.views[0];
    const secondView = bidirectional.chart.views[1];
    // @ts-ignore
    expect(firstView.options.axes['2016年耕地总面积']).toEqual(false);
    //@ts-ignore
    expect(secondView.options.axes['2016年转基因种植面积']).toEqual(false);

    bidirectional.destroy();
  });
});
