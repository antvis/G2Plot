import { BidirectionalBar } from '../../../../src';
import { FIRST_AXES_VIEW, SECOND_AXES_VIEW } from '../../../../src/plots/bidirectional-bar/constant';
import { data } from '../../../data/bi-directional';
import { createDiv } from '../../../utils/dom';

describe('bidirectional changeData', () => {
  it('changeData: normal', () => {
    const bidirectional = new BidirectionalBar(createDiv('default'), {
      width: 400,
      height: 400,
      data,
      xField: 'country',
      yField: ['2016年耕地总面积', '2016年转基因种植面积'],
    });
    bidirectional.render();

    const firstView = bidirectional.chart.views.find((view) => view.id === FIRST_AXES_VIEW);
    const secondView = bidirectional.chart.views.find((view) => view.id === SECOND_AXES_VIEW);

    expect(bidirectional.options.data).toEqual(data);
    expect(firstView.geometries[0].elements.length).toEqual(data.length);
    expect(secondView.geometries[0].elements.length).toEqual(data.length);

    const newData = data.slice(0, 5);
    bidirectional.changeData(newData);

    expect(bidirectional.options.data).toEqual(newData);
    expect(firstView.geometries[0].elements.length).toEqual(newData.length);
    expect(secondView.geometries[0].elements.length).toEqual(newData.length);

    bidirectional.destroy();
  });

  it('changeData: from empty to have data', () => {
    const bidirectional = new BidirectionalBar(createDiv('default'), {
      width: 400,
      height: 400,
      data: [],
      xField: 'country',
      yField: ['2016年耕地总面积', '2016年转基因种植面积'],
    });
    bidirectional.render();

    const firstView = bidirectional.chart.views.find((view) => view.id === FIRST_AXES_VIEW);
    const secondView = bidirectional.chart.views.find((view) => view.id === SECOND_AXES_VIEW);

    expect(bidirectional.options.data.length).toEqual(0);
    expect(firstView.geometries[0].elements.length).toEqual(0);
    expect(secondView.geometries[0].elements.length).toEqual(0);

    bidirectional.changeData(data);

    expect(bidirectional.options.data).toEqual(data);
    expect(firstView.geometries[0].elements.length).toEqual(data.length);
    expect(secondView.geometries[0].elements.length).toEqual(data.length);

    bidirectional.destroy();
  });
});
