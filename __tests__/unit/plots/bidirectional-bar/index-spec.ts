import { BidirectionalBar } from '../../../../src';
import { data } from '../../../data/bi-directional';
import { createDiv } from '../../../utils/dom';

describe('Bidirectional', () => {
  it('default', () => {
    const bidirectional = new BidirectionalBar(createDiv(), {
      width: 400,
      height: 400,
      data,
      xField: 'country',
      yField: 'value',
      seriesField: 'type',
    });
    bidirectional.render();

    expect(bidirectional.type).toEqual('bidirectional-bar');

    const leftView = bidirectional.chart.views[0];
    const rightView = bidirectional.chart.views[1];
    const leftG = bidirectional.chart.views[0].geometries[0];
    const rightG = bidirectional.chart.views[1].geometries[0];
    //@ts-ignore
    expect(leftView.options.axes.country.position).toEqual('top');
    //@ts-ignore
    expect(rightView.options.axes.country).toEqual(false);
    expect(bidirectional.chart.getOptions().scales.type.sync).toEqual(true);

    // 类型
    expect(leftG.type).toBe('interval');
    expect(rightG.type).toBe('interval');

    // x & y
    const LpositionFields = leftG.getAttribute('position').getFields();
    const RpositionFields = rightG.getAttribute('position').getFields();
    expect(LpositionFields).toHaveLength(2);
    expect(LpositionFields[0]).toBe('country');
    expect(LpositionFields[1]).toBe('value');

    expect(RpositionFields).toHaveLength(2);
    expect(RpositionFields[0]).toBe('country');
    expect(RpositionFields[1]).toBe('value');

    const LcolorAttribute = leftG.getAttribute('color');
    const LseriesFields = LcolorAttribute.getFields();

    expect(LseriesFields).toHaveLength(1);
    expect(LseriesFields[0]).toBe('type');

    const RcolorAttribute = rightG.getAttribute('color');
    const RseriesFields = RcolorAttribute.getFields();

    expect(RseriesFields).toHaveLength(1);
    expect(RseriesFields[0]).toBe('type');

    expect(bidirectional.chart.getController('legend').visible).toEqual(true);

    expect(bidirectional.chart.getController('legend').getComponents()[0].direction).toEqual('bottom');

    expect(bidirectional.chart.getController('legend').getComponents()[0].extra.scale.field).toEqual('type');
  });
  it('x*y*color', () => {
    const bidirectional = new BidirectionalBar(createDiv(), {
      width: 400,
      height: 400,
      data,
      xField: 'country',
      yField: 'value',
      seriesField: 'type',
    });
    bidirectional.render();

    const leftG = bidirectional.chart.views[0].geometries[0];
    const rightG = bidirectional.chart.views[1].geometries[0];
    const LseriesFields = leftG.getAttribute('color').getFields();
    const RseriesFields = rightG.getAttribute('color').getFields();

    expect(LseriesFields).toHaveLength(1);
    expect(LseriesFields[0]).toBe('type');
    expect(RseriesFields).toHaveLength(1);
    expect(RseriesFields[0]).toBe('type');
  });

  it('x*y*color with color', () => {
    const palette = ['red', 'green'];
    const bidirectional = new BidirectionalBar(createDiv(), {
      width: 400,
      height: 400,
      data,
      xField: 'country',
      yField: 'value',
      seriesField: 'type',
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
  });

  it('barWidthRatio', () => {
    const bidirectional = new BidirectionalBar(createDiv(), {
      width: 400,
      height: 400,
      data,
      xField: 'country',
      yField: 'value',
      seriesField: 'type',
      barWidthRatio: 0.7,
    });
    bidirectional.render();

    const leftG = bidirectional.chart.views[0].geometries[0];
    const rightG = bidirectional.chart.views[1].geometries[0];
    expect(leftG.theme.columnWidthRatio).toBe(0.7);
    expect(rightG.theme.columnWidthRatio).toBe(0.7);
  });
});
