import { Venn } from '../../../../src';
import { LEGEND_SPACE } from '../../../../src/plots/venn/adaptor';
import { createDiv } from '../../../utils/dom';

describe('venn padding', () => {
  const plot = new Venn(createDiv(), {
    data: [
      { sets: ['A'], size: 12, label: 'A' },
      { sets: ['B'], size: 12, label: 'B' },
      { sets: ['C'], size: 12, label: 'C' },
      { sets: ['A', 'B'], size: 2, label: 'A&B' },
      { sets: ['A', 'C'], size: 2, label: 'A&C' },
      { sets: ['B', 'C'], size: 2, label: 'B&C' },
    ],
    width: 400,
    height: 500,
    setsField: 'sets',
    sizeField: 'size',
  });
  plot.render();

  it('appendPadding', () => {
    plot.update({
      legend: false,
      padding: 0,
      appendPadding: [40, 0, 0, 0],
    });
    expect(plot.chart.appendPadding).toEqual([40, 0, 0, 0]);
    plot.chart.geometries[0].elements.forEach((element) => {
      expect(element.shape.attr('matrix')[7]).toBe(40);
    });

    plot.update({
      legend: { position: 'left' },
      padding: 0,
      appendPadding: [40, 0, 0, 0],
    });
    expect(plot.chart.appendPadding).toEqual([40, 0, 0, LEGEND_SPACE]);
    plot.chart.geometries[0].elements.forEach((element) => {
      // 所有元素的都进行了偏移 [1, 0, 0, 0, 1, 0, 40, 0, 1]
      expect(element.shape.attr('matrix')[6]).toBe(LEGEND_SPACE);
      expect(element.shape.attr('matrix')[7]).toBe(40);
    });

    plot.update({
      legend: false,
      padding: 0,
      appendPadding: [10, 10, 10, 10],
    });
    expect(plot.chart.appendPadding).toEqual([10, 10, 10, 10]);
    plot.chart.geometries[0].elements.forEach((element) => {
      expect(element.shape.attr('matrix')[6]).toBe(10);
    });
  });

  it('padding', () => {
    plot.update({
      legend: false,
      appendPadding: 0,
      padding: [50, 0, 0, 0],
    });
    expect(plot.chart.appendPadding).toEqual([50, 0, 0, 0]);
    plot.chart.geometries[0].elements.forEach((element) => {
      expect(element.shape.attr('matrix')[7]).toBe(50);
    });

    plot.update({
      legend: false,
      appendPadding: 0,
      padding: 100,
    });
    expect(plot.chart.appendPadding).toEqual([100, 100, 100, 100]);
    plot.chart.geometries[0].elements.forEach((element) => {
      expect(element.shape.attr('matrix')[6]).toBe(100);
      expect(element.shape.attr('matrix')[7]).toBe(100);
    });

    plot.update({
      legend: { position: 'left' },
      appendPadding: 0,
      padding: [50, 0, 0, 0],
    });
    expect(plot.chart.appendPadding).toEqual([50, 0, 0, LEGEND_SPACE]);
    plot.chart.geometries[0].elements.forEach((element) => {
      // 所有元素的都进行了偏移 [1, 0, 0, 0, 1, 0, 40, 50, 1]
      expect(element.shape.attr('matrix')[6]).toBe(LEGEND_SPACE);
      expect(element.shape.attr('matrix')[7]).toBe(50);
    });
  });

  it('padding & appendPadding', () => {
    plot.update({
      legend: false,
      appendPadding: 10,
      padding: [50, 0, 0, 0],
    });
    expect(plot.chart.appendPadding).toEqual([60, 10, 10, 10]);
    expect(plot.chart.padding).toEqual([50, 0, 0, 0]);
    plot.chart.geometries[0].elements.forEach((element) => {
      // 所有元素的都进行了偏移 [1, 0, 0, 0, 1, 0, 0, 60, 1]
      expect(element.shape.attr('matrix')[7]).toBe(60);
    });

    plot.update({
      legend: { position: 'top' },
      appendPadding: 10,
      padding: 50,
    });
    expect(plot.chart.appendPadding).toEqual([60 + LEGEND_SPACE, 60, 60, 60]);
    expect(plot.chart.padding).toEqual(50);
    plot.chart.geometries[0].elements.forEach((element) => {
      expect(element.shape.attr('matrix')[6]).toBe(60);
      expect(element.shape.attr('matrix')[7]).toBe(60 + LEGEND_SPACE);
    });
  });

  it('changesize', () => {
    plot.changeSize(800, 500);
    // @ts-ignore
    plot.triggerResize();
    // 确认resize后，元素依然偏移
    plot.chart.geometries[0].elements.forEach((element) => {
      expect(element.shape.attr('matrix')[6]).toBe(60);
      expect(element.shape.attr('matrix')[7]).toBe(60 + LEGEND_SPACE);
    });
  });

  it('兼容非法 padding', () => {
    plot.changeSize(400, 400);
    plot.update({
      legend: false,
      appendPadding: 0,
      padding: 250,
    });
    plot.chart.geometries[0].data.forEach((datum) => {
      expect(datum.x).toBe(0);
      expect(datum.y).toBe(0);
    });

    plot.changeSize(800, 400);
    plot.update({
      legend: false,
      appendPadding: 0,
      padding: 200,
    });
    plot.chart.geometries[0].data.forEach((datum) => {
      expect(datum.x).toBe(200);
      expect(datum.y).toBe(0);
    });
  });

  afterAll(() => {
    plot.destroy();
  });
});
