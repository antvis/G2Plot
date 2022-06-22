import { Datum, Sankey } from '../../../../src';
import { createDiv, removeDom } from '../../../utils/dom';
import { delay } from '../../../utils/delay';
import { ENERGY_RELATIONS } from '../../../data/sankey-energy';
import { PARALLEL_SET } from '../../../data/parallel-set';

describe('sankey', () => {
  it('sankey', async () => {
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

    expect(sankey.options.animation).toEqual({
      appear: {
        animation: 'wave-in',
      },
      enter: {
        animation: 'wave-in',
      },
    });

    // node
    expect(sankey.chart.views[1].geometries[0].type).toBe('polygon');
    expect(sankey.chart.views[1].geometries[0].data.length).toBe(48);
    expect(sankey.chart.views[1].geometries[0].data[0]).toEqual({
      isNode: true,
      name: "Agricultural 'waste'",
      x: [0, 0.008, 0.008, 0],
      y: [0.26075939300940637, 0.26075939300940637, 0.2963247055394385, 0.2963247055394385],
    });

    // edge
    expect(sankey.chart.views[0].geometries[0].type).toBe('edge');
    expect(sankey.chart.views[0].geometries[0].data.length).toBe(68);
    expect(sankey.chart.views[0].geometries[0].data[0]).toEqual({
      isNode: false,
      name: "Agricultural 'waste'",
      source: "Agricultural 'waste'",
      target: 'Bio-conversion',
      value: 124.729,
      x: [0.008, 0.008, 0.1417142857142857, 0.1417142857142857],
      y: [0.2963247055394385, 0.26075939300940637, 0.3018199231660282, 0.26625461063599604],
    });
    sankey.update({ animation: false });
    // label
    await delay(200);
    // expect(sankey.chart.views[1].geometries[0].labelsContainer.getChildren().length).toBe(48);
    expect(sankey.chart.views[1].geometries[0].labelsContainer.getChildByIndex(0).cfg.children[0].attr('text')).toBe(
      "Agricultural 'waste'"
    );
    expect(sankey.chart.views[0].geometries[0].labelsContainer.getChildren().length).toBe(0);

    // tooltip
    sankey.chart.showTooltip({ x: 100, y: 100 });
    expect(sankey.chart.ele.querySelector('.g2-tooltip-name').textContent).toBe('Nuclear -> Thermal generation');
    expect(sankey.chart.ele.querySelector('.g2-tooltip-value').textContent).toBe('839.978');

    // sankey.destroy();
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
    expect(sankey.chart.views[0].geometries[0].styleOption.cfg).toEqual({
      fill: '#ccc',
      fillOpacity: 0.5,
      lineWidth: 0,
      opacity: 0.3,
    });

    // @ts-ignore
    expect(sankey.chart.views[1].geometries[0].styleOption.fields).toEqual(['x', 'y', 'name']);

    expect(d).toEqual({
      name: '其他流向',
      x: [0.992, 1, 1, 0.992],
      y: [0.8358823529411765, 0.8358823529411765, 1, 1],
    });

    sankey.destroy();
  });

  it('sankey circle', () => {
    const DATA = [
      { source: 'a', target: 'b', value: 160 },
      { source: 'b', target: 'c', value: 40 },
      { source: 'c', target: 'd', value: 10 },
      { source: 'd', target: 'a', value: 10 },
    ];

    const sankey = new Sankey(createDiv(), {
      data: DATA,
      sourceField: 'source',
      targetField: 'target',
      weightField: 'value',
    });

    sankey.render();

    // 被去掉环
    expect(sankey.chart.views[0].getOptions().data.length).toBe(3);

    sankey.destroy();
  });

  it('sankey rawFields', () => {
    const data = [];
    const keys = ['Survived', 'Sex', 'Age', 'Class'];
    PARALLEL_SET.forEach((d) => {
      keys.reduce((a, b) => {
        if (a && b) {
          data.push({
            source: d[a],
            target: d[b],
            value: d.value,
            path: `${d[keys[0]]} -> ${d[keys[1]]} -> ${d[keys[2]]} -> ${d[keys[3]]}`,
          });
        }
        return b;
      });
    });

    const dom = createDiv();
    const sankey = new Sankey(dom, {
      data: data,
      sourceField: 'source',
      targetField: 'target',
      weightField: 'value',
      nodeWidthRatio: 0.01,
      nodePaddingRatio: 0.03,
      nodeDraggable: true,
    });

    sankey.render();
    expect(sankey.chart.views[0].getData()[0].path).not.toBeDefined();
    expect(sankey.chart.views[1].getData()[0].path).not.toBeDefined();

    sankey.update({ rawFields: ['path'] });
    expect(sankey.chart.views[0].getData()[0].path).toBeDefined();
    expect(sankey.chart.views[1].getData()[0].path).toBeDefined();
    expect(sankey.chart.views[0].getData()[0].path).toBe('Perished -> Male -> Adult -> Crew');
    expect(sankey.chart.views[1].getData()[0].path).toBe('Perished -> Male -> Adult -> Crew');

    sankey.destroy();
    removeDom(dom);
  });

  it('new Sankey({...}) supports not to display null.', () => {
    const DATA = [
      { source: 'a', target: null, value: 9 },
      { source: 'a', target: 'b', value: 40 },
    ];

    const sankey = new Sankey(createDiv(), {
      data: DATA,
      sourceField: 'source',
      targetField: 'target',
      weightField: 'value',
    });

    sankey.render();

    expect(sankey.chart.views[0].geometries[0].elements.length).toBe(1);
    expect(sankey.chart.views[1].geometries[0].elements.length).toBe(2);

    sankey.destroy();
  });
});
