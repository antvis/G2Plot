import { Datum, Chord } from '../../../../src';
import { createDiv } from '../../../utils/dom';
import { populationMovementData } from '../../../data/chord-population';

describe('chord', () => {
  it('chord', () => {
    const chord = new Chord(createDiv(), {
      height: 500,
      data: populationMovementData,
      sourceField: 'source',
      targetField: 'target',
      sourceWeightField: 'sourceWeight',
      targetWeightField: 'targetWeight',
    });

    chord.render();

    // 默认值
    expect(chord.options.nodeStyle).toEqual({
      opacity: 1,
      fillOpacity: 1,
      lineWidth: 1,
    });
    expect(chord.options.edgeStyle).toEqual({
      opacity: 0.5,
      lineWidth: 0,
    });

    expect(chord.options.weight).toBe(true);
    expect(chord.options.marginRatio).toBe(0.1);

    expect(chord.options.thickness).toEqual(0.05);

    // edge
    expect(chord.chart.views[0].geometries[0].type).toBe('edge');
    expect(chord.chart.views[0].geometries[0].data.length).toBe(11);
    expect(chord.chart.views[0].geometries[0].data[0]).toEqual({
      sourceName: '北京',
      targetName: '天津',
      source: 0,
      target: 1,
      sourceWeight: 30,
      targetWeight: 30,
      x: [0.0071428571428571435, 0.031913499344692, 0.2633551769331585, 0.28812581913499336],
      y: [0, 0, 0, 0],
    });
    // node
    expect(chord.chart.views[1].geometries[0].type).toBe('polygon');
    expect(chord.chart.views[1].geometries[0].data.length).toBe(7);
    expect(chord.chart.views[1].geometries[0].data[0]).toEqual({
      id: 0,
      name: '北京',
      x: [0.0071428571428571435, 0.24906946264744428, 0.24906946264744428, 0.0071428571428571435],
      y: [-0.025, -0.025, 0.025, 0.025],
    });

    // label
    expect(chord.chart.views[1].geometries[0].labelsContainer.getChildren().length).toBe(7);
    expect(chord.chart.views[1].geometries[0].labelsContainer.getChildByIndex(0).cfg.children[0].attr('text')).toBe(
      '北京'
    );
    expect(chord.chart.views[0].geometries[0].labelsContainer.getChildren().length).toBe(0);

    // // tooltip
    // chord.chart.showTooltip({ x: 100, y: 100 });
    // expect(document.querySelector('.g2-tooltip-name').textContent).toBe('Oil imports -> Oil');
    // expect(document.querySelector('.g2-tooltip-value').textContent).toBe('504.287');

    chord.destroy();
  });

  it('chord style', () => {
    let d = null;
    const chord = new Chord(createDiv(), {
      data: populationMovementData,
      sourceField: 'source',
      targetField: 'target',
      sourceWeightField: 'sourceWeight',
      targetWeightField: 'targetWeight',
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

    chord.render();
    // edge
    // @ts-ignore
    expect(chord.chart.views[0].geometries[0].styleOption.cfg).toEqual({
      fill: '#ccc',
      fillOpacity: 0.5,
      opacity: 0.5,
      lineWidth: 0,
    });
    // @ts-ignore
    expect(chord.chart.views[1].geometries[0].styleOption.fields).toEqual(['x', 'y', 'id']);
    expect(d).toEqual({
      id: 6,
      x: [0.9771690694626474, 0.9928571428571428, 0.9928571428571428, 0.9771690694626474],
      y: [-0.025, -0.025, 0.025, 0.025],
    });

    chord.destroy();
  });
});
