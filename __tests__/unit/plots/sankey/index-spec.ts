import { Datum, Sankey } from '../../../../src';
import { createDiv } from '../../../utils/dom';
import { ENERGY_RELATIONS } from '../../../data/sankey-energy';

describe('sankey', () => {
  it('sankey', () => {
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

    sankey.destroy();
  });

  it('sankey style', () => {
    const DATA = [
      { source: '首次打开', target: '首页 UV', value: 160 },
      { source: '结果页', target: '首页 UV', value: 40 },
      { source: '验证页', target: '首页 UV', value: 10 },
      { source: '我的', target: '首页 UV', value: 10 },
      { source: '朋友', target: '首页 UV', value: 8 },
      { source: '其他来源', target: '首页 UV', value: 27 },
      { source: '首页 UV', target: '理财', value: 30 },
      { source: '首页 UV', target: '扫一扫', value: 40 },
      { source: '首页 UV', target: '服务', value: 35 },
      { source: '首页 UV', target: '蚂蚁森林', value: 25 },
      { source: '首页 UV', target: '跳失', value: 10 },
      { source: '首页 UV', target: '借呗', value: 30 },
      { source: '首页 UV', target: '花呗', value: 40 },
      { source: '首页 UV', target: '其他流向', value: 45 },
    ];

    let d = null;
    const sankey = new Sankey(createDiv(), {
      data: DATA,
      sourceField: 'source',
      targetField: 'target',
      weightField: 'value',
      nodeStyle: (datum: Datum) => {
        d = datum;
        return {
          fill: 'red',
        };
      },
      edgeStyle: {
        fill: '#ccc',
        fillOpacity: 0.5,
      },
    });

    sankey.render();

    // @ts-ignore
    expect(sankey.chart.views[1].geometries[0].styleOption.cfg).toEqual({
      fill: '#ccc',
      fillOpacity: 0.5,
      lineWidth: 0,
      opacity: 0.3,
    });

    // @ts-ignore
    expect(sankey.chart.views[0].geometries[0].styleOption.fields).toEqual(['x', 'y', 'name']);

    expect(d).toEqual({
      name: '其他流向',
      x: [0.992, 1, 1, 0.992],
      y: [0.8358823529411765, 0.8358823529411765, 1, 1],
    });

    sankey.destroy();
  });
});
