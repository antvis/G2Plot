import { Column } from '../../../../src';
import { createDiv } from '../../../utils/dom';
import sales from '../../../../examples/data/sales.json';
import ScrollbarInteraction from '../../../../src/interaction/scrollbar';

describe('Bar scrollbar', () => {
  const bar = new Column(createDiv(), {
    data: sales.slice(0, 30),
    forceFit: false,
    width: 600,
    height: 500,
    yField: '销售额',
    xField: '城市',
    label: {
      visible: false,
    },
    interactions: [
      {
        type: 'scrollbar',
        cfg: {
          type: 'horizontal',
        },
      },
    ],
  });

  bar.render();

  it('scrollbar added', () => {
    expect(bar).toBeDefined();
    const view = bar.getView();
    const interaction = bar.getLayer().getInteractions()[0];
    // @ts-ignore
    const scrollbar = interaction.scrollbar;
    expect(interaction).toBeInstanceOf(ScrollbarInteraction);
    expect(scrollbar.get('thumbLen')).toBeGreaterThanOrEqual(20);
    expect(scrollbar.get('trackLen')).toBe(view.coordinateBBox.width);

    // make sure default interactions (tooltip etc) are added
    // @ts-ignore
    expect(view.options.interactions).toHaveLength(5);
  });
});
