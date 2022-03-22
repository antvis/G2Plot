import { Gauge } from '../../../../src';
import { createDiv } from '../../../utils/dom';

describe('gauge', () => {
  it('default tooltip', () => {
    const gauge = new Gauge(createDiv(), {
      width: 400,
      height: 300,
      percent: 0.75,
    });

    gauge.render();
    // @ts-ignore
    expect(gauge.chart.options.tooltip).toBe(false);
    expect(gauge.chart.getComponents().find((co) => co.type === 'tooltip')).toBe(undefined);

    gauge.update({
      tooltip: {},
    });
    // @ts-ignore
    expect(gauge.chart.options.tooltip).toMatchObject({
      showMarkers: false,
      showTitle: false,
      containerTpl: '<div class="g2-tooltip"><div class="g2-tooltip-list"></div></div>',
      domStyles: {
        'g2-tooltip': {
          padding: '4px 8px',
          fontSize: '10px',
        },
      },
    });

    gauge.destroy();
  });

  it('custom tooltip', () => {
    const customContent = (x, data) => {
      return `${(Number(data?.[0]?.value || 0) * 100).toFixed(2)}%`;
    };

    const gauge = new Gauge(createDiv(), {
      width: 400,
      height: 300,
      percent: 0.75,
      tooltip: {
        containerTpl: '<div class="g2-tooltip"><div class="g2-tooltip-list">2131231</div></div>',
        domStyles: {
          'g2-tooltip': {
            padding: '40px',
            fontSize: '40px',
          },
        },
        customContent,
      },
    });

    gauge.render();

    // @ts-ignore
    expect(gauge.chart.options.tooltip).toMatchObject({
      showMarkers: false,
      showTitle: false,
      containerTpl: '<div class="g2-tooltip"><div class="g2-tooltip-list">2131231</div></div>',
      domStyles: {
        'g2-tooltip': {
          padding: '40px',
          fontSize: '40px',
        },
      },
      customContent,
    });

    gauge.destroy();
  });
});
