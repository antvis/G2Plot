import { Chord, Datum } from '../../../../src';
import { DEFAULT_OPTIONS } from '../../../../src/plots/chord/constant';
import { populationMovementData } from '../../../data/chord-population';
import { delay } from '../../../utils/delay';
import { createDiv } from '../../../utils/dom';

describe('chord', () => {
  it('chord', async () => {
    const chord = new Chord(createDiv(), {
      height: 500,
      data: populationMovementData,
      sourceField: 'source',
      targetField: 'target',
      weightField: 'value',
    });

    chord.render();

    expect(chord.type).toBe('chord');
    // @ts-ignore
    expect(chord.getDefaultOptions()).toEqual(DEFAULT_OPTIONS);

    // nodeStyle 默认值
    expect(chord.options.nodeStyle).toEqual({
      opacity: 1,
      fillOpacity: 1,
      lineWidth: 1,
    });

    // edgeStyle 默认值
    expect(chord.options.edgeStyle).toEqual({
      opacity: 0.5,
      lineWidth: 2,
    });

    // nodePaddingRatio 默认值
    expect(chord.options.nodePaddingRatio).toBe(0.1);

    // nodeWidthRatio 默认值
    expect(chord.options.nodeWidthRatio).toEqual(0.05);

    // edge
    expect(chord.chart.views[0].geometries[0].type).toBe('edge');
    expect(chord.chart.views[0].geometries[0].data.length).toBe(13);
    expect(chord.chart.views[0].geometries[0].data[0]).toMatchObject({
      source: '北京',
      target: '天津',
      value: 30,
      x: [0.00625, 0.028712562396006655, 0.2620944259567387, 0.28455698835274534],
      y: [0, 0, 0, 0],
    });

    // node
    expect(chord.chart.views[1].geometries[0].type).toBe('polygon');
    expect(chord.chart.views[1].geometries[0].data.length).toBe(8);
    expect(chord.chart.views[1].geometries[0].data[0]).toMatchObject({
      id: 0,
      name: '北京',
      x: [0.00625, 0.24959442595673875, 0.24959442595673875, 0.00625],
      y: [-0.025, -0.025, 0.025, 0.025],
    });
    await delay(0);
    // edge label
    expect(chord.chart.views[0].geometries[0].labelsContainer.getChildren().length).toBe(0);

    // node label
    expect(chord.chart.views[1].geometries[0].labelsContainer.getChildren().length).toBe(8);
    expect(chord.chart.views[1].geometries[0].labelsContainer.getChildByIndex(0).cfg.children[0].attr('text')).toBe(
      '北京'
    );

    chord.destroy();
  });

  it('chord style', () => {
    let d = null;
    const chord = new Chord(createDiv(), {
      data: populationMovementData,
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

    chord.render();

    // edge
    // @ts-ignore
    expect(chord.chart.views[0].geometries[0].styleOption.cfg).toEqual({
      fill: '#ccc',
      fillOpacity: 0.5,
      opacity: 0.5,
      lineWidth: 2,
    });
    // @ts-ignore
    expect(chord.chart.views[1].geometries[0].styleOption.fields).toEqual(['x', 'y', 'name']);
    expect(d).toEqual({
      name: '内蒙古',
      x: [0.9518198835274543, 0.99375, 0.99375, 0.9518198835274543],
      y: [-0.025, -0.025, 0.025, 0.025],
    });

    chord.destroy();
  });

  it('defaultOptions 保持从 constant 中获取', () => {
    expect(Chord.getDefaultOptions()).toEqual(DEFAULT_OPTIONS);
  });
});
