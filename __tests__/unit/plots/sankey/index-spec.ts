import { Sankey } from '../../../../src';
import { createDiv } from '../../../utils/dom';
import { ENERGY_RELATIONS } from '../../../data/sankey-energy';

describe('sankey', () => {
  it('Sankey', () => {
    const sankey = new Sankey(createDiv(), {
      height: 500,
      data: ENERGY_RELATIONS,
      sourceField: 'source',
      targetField: 'target',
      weightField: 'value',
    });

    sankey.render();

    // 默认值
    expect(sankey.options.nodeStyle).toEqual({
      opacity: 1,
      fillOpacity: 1,
      lineWidth: 1,
    });
    expect(sankey.options.edgeStyle).toEqual({
      opacity: 0.3,
      lineWidth: 0,
    });

    expect(sankey.options.nodeWidthRatio).toBe(0.008);
    expect(sankey.options.nodePaddingRatio).toBe(0.01);

    expect(sankey.options.appendPadding).toEqual(8);

    // node
    expect(sankey.chart.views[0].geometries[0].type).toBe('polygon');
    expect(sankey.chart.views[0].geometries[0].data.length).toBe(48);
    expect(sankey.chart.views[0].geometries[0].data[0]).toEqual({
      name: "Agricultural 'waste'",
      x: [0, 0.008, 0.008, 0],
      y: [0.26075939300940637, 0.26075939300940637, 0.2963247055394385, 0.2963247055394385],
    });

    // edge
    expect(sankey.chart.views[1].geometries[0].type).toBe('edge');
    expect(sankey.chart.views[1].geometries[0].data.length).toBe(68);
    expect(sankey.chart.views[1].geometries[0].data[0]).toEqual({
      name: "Agricultural 'waste'",
      source: "Agricultural 'waste'",
      target: 'Bio-conversion',
      value: 124.729,
      x: [0.008, 0.008, 0.1417142857142857, 0.1417142857142857],
      y: [0.2963247055394385, 0.26075939300940637, 0.3018199231660282, 0.26625461063599604],
    });

    // label
    expect(sankey.chart.views[0].geometries[0].labelsContainer.getChildren().length).toBe(48);
    expect(sankey.chart.views[0].geometries[0].labelsContainer.getChildByIndex(0).cfg.children[0].attr('text')).toBe(
      "Agricultural 'waste'"
    );
    expect(sankey.chart.views[1].geometries[0].labelsContainer.getChildren().length).toBe(0);

    // tooltip
    sankey.chart.showTooltip({ x: 100, y: 100 });
    expect(document.querySelector('.g2-tooltip-name').textContent).toBe('Oil imports -> Oil');
    expect(document.querySelector('.g2-tooltip-value').textContent).toBe('504.287');
  });
});
