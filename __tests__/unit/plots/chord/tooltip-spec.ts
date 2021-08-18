import { Chord } from '../../../../src';
import { createDiv } from '../../../utils/dom';
import { populationMovementData } from '../../../data/chord-population';

describe('chord tooltips', () => {
  const div = createDiv();
  const plot = new Chord(div, {
    height: 500,
    autoFit: false,
    data: populationMovementData,
    sourceField: 'source',
    targetField: 'target',
    weightField: 'value',
  });

  plot.render();

  it('chord', () => {
    // tooltip
    const edgeView = plot.chart.views[0];
    const edgeElementIdx = edgeView.getData().findIndex((d) => d.source === '北京' && d.target === '天津');
    const element = edgeView.geometries[0].elements[edgeElementIdx];
    const path = element.shape.attr('path');
    plot.chart.showTooltip({ x: path[0][1] - 2, y: path[0][2] - 4 });

    expect(div.querySelector('.g2-tooltip-name').textContent).toBe('北京 -> 天津');
    expect(div.querySelector('.g2-tooltip-value').textContent).toBe('30');
    // @ts-ignore
    expect(plot.chart.views[1].options.tooltip).not.toBe(false);
  });

  afterAll(() => {
    plot.destroy();
  });
});
