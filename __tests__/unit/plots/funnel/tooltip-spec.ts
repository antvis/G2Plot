import { Funnel } from '../../../../src';
import { PV_DATA } from '../../../data/conversion';
import { createDiv } from '../../../utils/dom';

describe('funnel tooltip', () => {
  test('tooltip', () => {
    const funnelOption = {
      width: 400,
      height: 400,
      data: PV_DATA,
      autoFit: true,
      xField: 'action',
      yField: 'pv',
      tooltip: {
        title: 'funnel',
      },
    };

    const funnel = new Funnel(createDiv('tooltip funnel'), funnelOption);

    funnel.render();

    // @ts-ignore
    expect(funnel.chart.options.tooltip.title).toBe('funnel');

    funnel.update({
      ...funnelOption,
      tooltip: false,
    });

    // @ts-ignore
    expect(funnel.chart.options.tooltip).toBe(false);
    expect(funnel.chart.getComponents().find((co) => co.type === 'tooltip')).toBe(undefined);

    funnel.destroy();
  });
});
