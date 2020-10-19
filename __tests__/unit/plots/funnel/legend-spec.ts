import { Funnel } from '../../../../src';
import { PV_DATA } from '../../../data/conversion';
import { createDiv } from '../../../utils/dom';

describe('funnel legend', () => {
  test('legend default', () => {
    const funnelOption = {
      width: 400,
      height: 400,
      data: PV_DATA,
      xField: 'action',
      yField: 'pv',
    };

    const funnel = new Funnel(createDiv('basic funnel'), funnelOption);
    funnel.render();

    const legendComponent = funnel.chart.getController('legend').getComponents()[0];

    expect(legendComponent.direction).toBe('bottom');
    expect(legendComponent.component.cfg.items.length).toBe(PV_DATA.length);

    funnel.update({
      ...funnelOption,
      legend: {
        position: 'top',
        itemName: {
          formatter: (text) => `*${text}`,
        },
      },
    });

    expect(funnel.chart.getController('legend').getComponents()[0].direction).toBe('top');

    funnel.update({
      ...funnelOption,
      legend: false,
    });

    expect(funnel.chart.getController('legend').getComponents().length).toBe(0);
  });
});
