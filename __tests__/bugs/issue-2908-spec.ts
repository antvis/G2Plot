import { Venn } from '../../src';
import { createDiv } from '../utils/dom';

describe('#2908, venn', () => {
  const plot = new Venn(createDiv(), {
    width: 400,
    height: 500,
    setsField: 'sets',
    sizeField: 'size',
    data: [
      { sets: ['A'], size: 10, label: 'A' },
      { sets: ['B'], size: 10, label: 'B' },
    ],
    interactions: [{ type: 'legend-active', enable: true }],
  });
  plot.render();

  it('legend interaction', () => {
    let labels = plot.chart.geometries[0].elements[0].shape
      .getParent()
      .getChildren()
      .map((c) => c.get('origin').data.label);

    expect(labels[0]).toBe('A');
    expect(labels[1]).toBe('B');

    const legendComponent = plot.chart.getController('legend').getComponents()[0];
    const legendContainer = legendComponent.component.get('container');

    const legendTarget = legendContainer.findById('-legend-item-A');
    const box = legendTarget.getBBox();
    plot.chart.emit('legend-item:mouseenter', {
      x: (box.x + box.maxX) / 2,
      y: (box.y + box.maxY) / 2,
      target: legendTarget,
    });

    // 图例交互，还是保持原序
    labels = plot.chart.geometries[0].elements[0].shape
      .getParent()
      .getChildren()
      .map((c) => c.get('origin').data.label);

    expect(labels[0]).toBe('A');
    expect(labels[1]).toBe('B');
  });

  afterAll(() => {
    plot.destroy();
  });
});
