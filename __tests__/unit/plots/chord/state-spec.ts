import { Chord } from '../../../../src';
import { populationMovementData as DATA } from '../../../data/chord-population';
import { createDiv } from '../../../utils/dom';
import { simulateMouseEvent } from '../../../utils/event';

describe('chord: state', () => {
  const plot = new Chord(createDiv(), {
    height: 500,
    data: DATA,
    sourceField: 'source',
    targetField: 'target',
    weightField: 'value',
  });

  plot.render();

  it('set state', async () => {
    plot.render();

    plot.setState('selected', (data) => (data as any).name === DATA[0].source);
    const selected = DATA.filter((d) => d.source === DATA[0].source).length + 1; /** 节点名称 */
    expect(plot.getStates().length).toBe(selected);

    plot.chart.views[1].geometries[0].elements[0].setState('selected', false);
    expect(plot.getStates().length).toBe(selected - 1);

    plot.chart.views[1].geometries[0].elements[0].setState('selected', true);
    expect(plot.getStates().length).toBe(selected);

    // 取消 selected
    plot.setState('selected', (data) => (data as any).name === DATA[0].source, false);
    expect(plot.getStates().length).toBe(0);
  });

  it('interactions + getState', () => {
    plot.update({ interactions: [{ type: 'element-active' }] });

    expect(plot.getStates().length).toBe(0);
    // edge view
    const element = plot.chart.views[0].geometries[0].elements[0];
    simulateMouseEvent(element.shape, 'mouseenter');
    expect(plot.getStates().length).toBe(1);
    expect(plot.getStates()[0].data).toMatchObject({ source: DATA[0].source });
    expect(plot.getStates()[0].state).toBe('active');
  });

  afterAll(() => {
    plot.destroy();
  });
});
