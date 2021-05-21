import { BidirectionalBar } from '../../../../src';
import { SERIES_FIELD_KEY } from '../../../../src/plots/bidirectional-bar/constant';
import { data } from '../../../data/bi-directional';
import { createDiv } from '../../../utils/dom';

describe('Bidirectional', () => {
  it('default', () => {
    const bidirectional = new BidirectionalBar(createDiv('default'), {
      width: 400,
      height: 400,
      data,
      xField: 'country',
      yField: ['2016年耕地总面积', '2016年转基因种植面积'],
    });
    bidirectional.render();

    // @ts-ignore
    expect(bidirectional.getDefaultOptions()).toEqual(BidirectionalBar.getDefaultOptions());

    expect(bidirectional.type).toEqual('bidirectional-bar');

    const leftView = bidirectional.chart.views[0];
    const rightView = bidirectional.chart.views[1];
    const leftG = bidirectional.chart.views[0].geometries[0];
    const rightG = bidirectional.chart.views[1].geometries[0];
    //@ts-ignore
    expect(leftView.options.axes.country.position).toEqual('top');
    //@ts-ignore
    expect(rightView.options.axes.country).toEqual(false);
    expect(bidirectional.chart.getOptions().scales[SERIES_FIELD_KEY].sync).toEqual(true);

    // 类型
    expect(leftG.type).toBe('interval');
    expect(rightG.type).toBe('interval');

    // x & y
    const LpositionFields = leftG.getAttribute('position').getFields();
    const RpositionFields = rightG.getAttribute('position').getFields();
    expect(LpositionFields).toHaveLength(2);
    expect(LpositionFields[0]).toBe('country');
    expect(LpositionFields[1]).toBe('2016年耕地总面积');

    expect(RpositionFields).toHaveLength(2);
    expect(RpositionFields[0]).toBe('country');
    expect(RpositionFields[1]).toBe('2016年转基因种植面积');

    const LcolorAttribute = leftG.getAttribute('color');
    const LseriesFields = LcolorAttribute.getFields();

    expect(LseriesFields).toHaveLength(1);
    expect(LseriesFields[0]).toBe(SERIES_FIELD_KEY);

    const RcolorAttribute = rightG.getAttribute('color');
    const RseriesFields = RcolorAttribute.getFields();

    expect(RseriesFields).toHaveLength(1);
    expect(RseriesFields[0]).toBe(SERIES_FIELD_KEY);

    expect(bidirectional.chart.getController('legend').visible).toEqual(true);

    expect(bidirectional.chart.getController('legend').getComponents()[0].direction).toEqual('bottom');

    expect(bidirectional.chart.getController('legend').getComponents()[0].extra.scale.field).toEqual(SERIES_FIELD_KEY);

    bidirectional.destroy();
  });

  it('x*y*color', () => {
    const bidirectional = new BidirectionalBar(createDiv('x*y*color'), {
      width: 400,
      height: 400,
      data,
      xField: 'country',
      yField: ['2016年耕地总面积', '2016年转基因种植面积'],
    });
    bidirectional.render();

    const leftG = bidirectional.chart.views[0].geometries[0];
    const rightG = bidirectional.chart.views[1].geometries[0];
    const LseriesFields = leftG.getAttribute('color').getFields();
    const RseriesFields = rightG.getAttribute('color').getFields();

    expect(LseriesFields).toHaveLength(1);
    expect(LseriesFields[0]).toBe(SERIES_FIELD_KEY);
    expect(RseriesFields).toHaveLength(1);
    expect(RseriesFields[0]).toBe(SERIES_FIELD_KEY);

    bidirectional.destroy();
  });

  it('x*y*color with color', () => {
    const palette = ['red', 'green'];
    const bidirectional = new BidirectionalBar(createDiv('x*y*color with color'), {
      width: 400,
      height: 400,
      data,
      xField: 'country',
      yField: ['2016年耕地总面积', '2016年转基因种植面积'],
      color: palette,
    });
    bidirectional.render();

    bidirectional.render();

    const leftG = bidirectional.chart.views[0].geometries[0];
    const rightG = bidirectional.chart.views[1].geometries[0];

    leftG.elements.forEach((element) => {
      const color = element.getModel().color;
      expect(color).toBe(palette[0]);
    });

    rightG.elements.forEach((element) => {
      const color = element.getModel().color;
      expect(color).toBe(palette[1]);
    });

    bidirectional.destroy();
  });

  it('widthRatio', () => {
    const bidirectional = new BidirectionalBar(createDiv('widthRatio'), {
      width: 400,
      height: 400,
      data,
      xField: 'country',
      yField: ['2016年耕地总面积', '2016年转基因种植面积'],
      widthRatio: 0.7,
    });
    bidirectional.render();

    const leftG = bidirectional.chart.views[0].geometries[0];
    const rightG = bidirectional.chart.views[1].geometries[0];
    expect(leftG.theme.columnWidthRatio).toBe(0.7);
    expect(rightG.theme.columnWidthRatio).toBe(0.7);

    bidirectional.destroy();
  });
});
