import { G2Plot } from '../../../src';
import { createDiv } from '../../utils/dom';
import { partySupport } from '../../data/party-support';
import { StepLineAdaptor, StepLineOption } from './step-line';

describe('plugin - G2Plot', () => {
  it('StepLine', () => {
    const plot = new G2Plot<StepLineOption>(
      createDiv(),
      {
        width: 400,
        height: 300,
        appendPadding: 10,
        data: partySupport.filter((o) => o.type === 'FF'),
        xField: 'date',
        yField: 'value',
        stepType: 'hv',
      },
      StepLineAdaptor
    );

    plot.render();

    expect(plot.type).toBe('g2-plot');
    expect(plot.chart.geometries[0].type).toBe('line');
  });
});
