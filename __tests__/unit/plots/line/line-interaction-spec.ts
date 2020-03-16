import { Line } from '../../../../src';
import { LineActive, LineSelect } from '../../../../src/plots/line/interaction';
import { createDiv } from '../../../utils/dom';

const data = [
  {
    x: 'A',
    y: 10,
    z: 's1',
  },
  {
    x: 'B',
    y: 11,
    z: 's1',
  },
  {
    x: 'C',
    y: 21,
    z: 's1',
  },
  {
    x: 'A',
    y: 30,
    z: 's2',
  },
  {
    x: 'B',
    y: 41,
    z: 's2',
  },
  {
    x: 'C',
    y: 61,
    z: 's2',
  },
];

describe('line interaction', () => {
  const line = new Line(createDiv(), {
    data,
    width: 600,
    height: 500,
    xField: 'x',
    yField: 'y',
    seriesField: 'z',
  });

  line.render();

  it('interaction init', () => {
    const interactions = line.getLayer().getInteractions();
    expect(interactions).toHaveLength(2);
    expect(interactions[0]).toBeInstanceOf(LineActive);
    expect(interactions[1]).toBeInstanceOf(LineSelect);
  });

  it('update', () => {
    line.updateConfig({
      width: 500,
      height: 500,
    });
    line.render();
    const interactions = line.getLayer().getInteractions();
    expect(interactions).toHaveLength(2);
    expect(interactions[0]).toBeInstanceOf(LineActive);
    expect(interactions[1]).toBeInstanceOf(LineSelect);
  });

  it('destroy', () => {
    const layer = line.getLayer();
    line.destroy();
    const interactions = layer.getInteractions();
    expect(interactions).toHaveLength(0);
  });
});
