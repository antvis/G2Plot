import { Scatter } from '../../../../src';
import { getInteraction } from '@antv/g2';
import { createDiv } from '../../../utils/dom';
import { data } from '../../../data/gender';

describe('scatter: register interaction', () => {
  const scatter = new Scatter(createDiv(), {
    width: 400,
    height: 300,
    appendPadding: 10,
    data,
    xField: 'weight',
    yField: 'height',
    sizeField: 'weight',
    size: [5, 10],
    colorField: 'gender',
    xAxis: {
      nice: true,
    },
    interactions: [
      {
        name: 'drag-move',
      },
    ],
  });

  scatter.render();

  it('define:  drag-move', () => {
    const statisticInteraction = getInteraction('drag-move');
    expect(statisticInteraction).toBeDefined();
  });
});
