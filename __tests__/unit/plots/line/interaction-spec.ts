import Context from '@antv/g2/lib/interaction/context';
import { Line } from '../../../../src';
import { MarkerActiveAction } from '../../../../src/plots/line/interactions/marker-active';
import { partySupport } from '../../../data/party-support';
import { createDiv } from '../../../utils/dom';

describe('line', () => {
  it('marker-active: tooltip:change 激活 point', () => {
    const data = partySupport.filter((o) => o.type === 'FF');
    const line = new Line(createDiv(), {
      width: 400,
      height: 300,
      appendPadding: 10,
      data,
      xField: 'date',
      yField: 'value',
      point: {},
    });

    line.render();
    const view = line.chart;
    expect(view.geometries[1].elements[1].getStates()).not.toEqual(['active']);

    const context = new Context(view);
    context.event = {
      data: { items: [{ data: data[0] }] },
    };
    const action = new MarkerActiveAction(context);
    action.active();
    expect(view.geometries[1].elements[0].getStates()).toEqual(['active']);
    expect(view.geometries[1].elements[1].getStates()).toEqual([]);
  });
});
