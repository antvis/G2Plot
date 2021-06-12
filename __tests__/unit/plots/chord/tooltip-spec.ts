import { Datum, Chord } from '../../../../src';
import { createDiv } from '../../../utils/dom';
import { populationMovementData } from '../../../data/chord-population';

describe('chord tooltips', () => {
  it('chord', () => {
    const div = createDiv();
    const chord = new Chord(div, {
      height: 500,
      autoFit: false,
      data: populationMovementData,
      sourceField: 'source',
      targetField: 'target',
      weightField: 'value',
    });

    chord.render();
    // tooltip
    const edgeView = chord.chart.views[0];
    const edgeElementIdx = edgeView.getData().findIndex((d) => d.source === '北京' && d.target === '天津');
    const element = edgeView.geometries[0].elements[edgeElementIdx];
    const path = element.shape.attr('path');
    chord.chart.showTooltip({ x: path[0][1] - 2, y: path[0][2] - 4 });

    expect(div.querySelector('.g2-tooltip-name').textContent).toBe('北京 -> 天津');
    expect(div.querySelector('.g2-tooltip-value').textContent).toBe('30');
  });

  afterAll(() => {
    // chord.destroy();
  });
});
